import kafkaClient from "./service/kafkaClient.js";

const consumerRun = async (groupId, topics, io) => {
  const consumer = kafkaClient.consumer({ groupId: groupId });
  await consumer.connect();
  await consumer.subscribe({ topics: topics });

  const handleMessage = ({ topic, partition, message }) => {
    // Emitir el mensaje a través de socket.io a todos los clientes
    io.emit("message", message.value.toString());

    console.log(
      `Topic - ${topic}, Partition - ${partition}, Key - ${message.key?.toString()}, Message - ${message.value.toString()}`
    );
  };

  try {
    await consumer.run({
      eachMessage: handleMessage,
    });
  } catch (error) {
    console.error(error);
  }
};

export default consumerRun;
