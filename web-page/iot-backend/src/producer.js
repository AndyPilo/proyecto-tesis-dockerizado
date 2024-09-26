import { Partitioners } from "kafkajs";
import kafkaClient from "./kafkaClient.js";

const run = async () => {
  const producer = kafkaClient.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
  });

  await producer.connect();
  await producer.send({
    topic: "thabishs-topic",

    messages: [
      {
        partition: 0,
        key: "user 1 says ",
        value: "Hey there Viewer, how's KAFKA going, tell me your exp. on it ",
      },
      { partition: 1, key: "user 2 says ", value: "Its alrigt i guess" },
    ],
  });

  await producer.disconnect();
};

run();
