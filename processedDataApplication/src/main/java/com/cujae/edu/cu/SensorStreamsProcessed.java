package com.cujae.edu.cu;

import com.cujae.edu.cu.data.AlertData;
import com.cujae.edu.cu.data.SensorData;
import com.cujae.edu.cu.data.SensorStats;
import com.cujae.edu.cu.serde.CustomSerdes;
import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.common.utils.Bytes;
import org.apache.kafka.streams.KafkaStreams;
import org.apache.kafka.streams.KeyValue;
import org.apache.kafka.streams.StreamsBuilder;
import org.apache.kafka.streams.StreamsConfig;
import org.apache.kafka.streams.kstream.*;
import org.apache.kafka.streams.state.WindowStore;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.FileInputStream;
import java.io.IOException;
import java.time.Duration;
import java.time.Instant;
import java.util.Properties;

public class SensorStreamsProcessed {

    private static final Logger logger = LoggerFactory.getLogger(SensorStreamsProcessed.class);

    public static void main(String[] args) {

        Properties properties = new Properties();
        try (FileInputStream file = new FileInputStream("src/main/resources/streams.properties")) {
            properties.load(file);
        } catch (IOException error) {
            System.out.println("Error al cargar el archivo de configuracion: " + error.getMessage());
        }
        properties.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        properties.put(StreamsConfig.APPLICATION_ID_CONFIG, "processed-application");
        final String inputTopic = properties.getProperty("basic.input.topic");
        final String outputTopic = properties.getProperty("basic.output.topic");

        Duration windowSize = Duration.ofSeconds(20L);
        Duration windowGracie = Duration.ofSeconds(5L);
        TimeWindows window = TimeWindows.ofSizeAndGrace(windowSize, windowGracie);
        //Duration retentionPeriod = Duration.ofSeconds(650L);

        final Materialized<String, SensorStats, WindowStore<Bytes, byte[]>> store1 = Materialized.<String, SensorStats, WindowStore<Bytes, byte[]>>as("eventStore")
                .withKeySerde(Serdes.String())
                .withValueSerde(CustomSerdes.sensorStatsSerde());
                //.withRetention(retentionPeriod);
        StreamsBuilder builder = new StreamsBuilder();

        KStream<String, SensorData> stream = builder.stream(inputTopic, Consumed.with(Serdes.String(), CustomSerdes.sensorDataSerde()));

        // Alert of temperature
        stream.groupByKey()
                .windowedBy(window)
                .aggregate(
                        () -> new SensorStats(0.0, 0.0, 0),
                        (key, value, aggregate) -> {
                            aggregate.setTotalTemperature(aggregate.getTotalTemperature() + value.getTemperature());
                            aggregate.setTotalHumidity(aggregate.getTotalHumidity() + value.getHumidity());
                            aggregate.setCount(aggregate.getCount() + 1);
                            logger.info("HOLAAAAAAAAAAAAAAAAAAAAAAA");
                            return aggregate;
                        }, store1)
                .suppress(Suppressed.untilWindowCloses(Suppressed.BufferConfig.unbounded())) // Emite solo al cierre de la ventana
                .toStream()
                .map((wk, stats) -> {
                    AlertData alert = new AlertData();
                    StringBuilder alertMessage = new StringBuilder();
                    StringBuilder alertType = new StringBuilder();
                    //temperature
                    if (stats.getAverageTemperature() < 16) {
                        alertMessage.append("Alerta: Temperatura del suelo demasiado baja (")
                                .append(stats.getAverageTemperature())
                                .append("°C). ");
                        alertType.append("Temperatura crítica");
                    } else if (stats.getAverageTemperature() > 33) {
                        alertMessage.append("Alerta: Temperatura del suelo demasiado alta (")
                                .append(stats.getAverageTemperature())
                                .append("°C). ");
                        alertType.append("Temperatura crítica");
                    }
                    //Humedity
                    if (stats.getAverageHumidity() < 30) {
                        alertMessage.append("Alerta: Humedad del suelo demasiado baja (")
                                .append(stats.getAverageHumidity())
                                .append("%). ");
                        if (alertType.length() > 0) {
                            alertType.append(" y ");
                        }
                        alertType.append("Humedad crítica");
                    } else if (stats.getAverageHumidity() > 70) {
                        alertMessage.append("Alerta: Humedad del suelo demasiado alta (")
                                .append(stats.getAverageHumidity())
                                .append("%). ");
                        if (alertType.length() > 0) {
                            alertType.append(" y ");
                        }
                        alertType.append("Humedad crítica");
                    }

                    if (alertMessage.length() > 0) {
                        alert.setMessage(alertMessage.toString());
                        alert.setType(alertType.toString());
                        alert.setTimestamp(Instant.now().toString());
                    }
                    System.out.println(alert.getMessage());
                    return KeyValue.pair(wk.key(), alert);
                })
                .filter((key, value) -> value.getMessage() != null)
                .to(outputTopic, Produced.with(Serdes.String(), CustomSerdes.alertDataSerde()));

        KafkaStreams kafkaStreams = new KafkaStreams(builder.build(), properties);
        kafkaStreams.cleanUp();
        // Agregar el listener para escuchar cambios de estado
        kafkaStreams.setStateListener((newState, oldState) -> {
            if (newState == KafkaStreams.State.RUNNING) {
                System.out.println("Conectado a Kafka, la aplicación está en ejecución.");
            } else if (newState == KafkaStreams.State.ERROR) {
                System.out.println("Se ha producido un error en la aplicación Kafka Streams.");
            } else {
                System.out.println("Estado cambiado de " + oldState + " a " + newState);
            }
        });

        // Iniciar Kafka Streams
        try {
            kafkaStreams.start();
        } catch (Throwable error) {
            System.out.println("Error al iniciar Kafka Streams: " + error.getMessage());
            kafkaStreams.close();
        }

    }

}
