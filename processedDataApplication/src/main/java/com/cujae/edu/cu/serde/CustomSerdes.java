package com.cujae.edu.cu.serde;

import com.cujae.edu.cu.data.AlertData;
import com.cujae.edu.cu.data.SensorData;
import com.cujae.edu.cu.data.SensorStats;
import com.cujae.edu.cu.serialization.JsonDeserializer;
import com.cujae.edu.cu.serialization.JsonSerializer;
import org.apache.kafka.common.serialization.Serde;
import org.apache.kafka.common.serialization.Serdes;

public final class CustomSerdes {

    private CustomSerdes() {}

    public static Serde<SensorData> sensorDataSerde() {
        JsonSerializer<SensorData> serializer = new JsonSerializer<>();
        JsonDeserializer<SensorData> deserializer = new JsonDeserializer<>(SensorData.class);
        return Serdes.serdeFrom(serializer, deserializer);
    }
    public static Serde<SensorStats> sensorStatsSerde() {
        JsonSerializer<SensorStats> serializer = new JsonSerializer<>();
        JsonDeserializer<SensorStats> deserializer = new JsonDeserializer<>(SensorStats.class);
        return Serdes.serdeFrom(serializer, deserializer);
    }
    public static Serde<AlertData> alertDataSerde() {
        JsonSerializer<AlertData> serializer = new JsonSerializer<>();
        JsonDeserializer<AlertData> deserializer = new JsonDeserializer<>(AlertData.class);
        return Serdes.serdeFrom(serializer, deserializer);
    }
}