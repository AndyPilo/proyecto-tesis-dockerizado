// https://kafka.js.org/docs/2.0.0/admin#docsNav
import kafkaClient from "./service/kafkaClient.js";

const adminInit = async () => {
  const admin = kafkaClient.admin();
  await admin.connect();
  await admin.createTopics({
    topics: [
      {
        topic: "sensor_data",
        numPartitions: 1,
      },
    ],
  });
  console.log("---------Topic created----------");
  await admin.disconnect();
  console.log("--------Admin Disconnected--------");
};

export default adminInit
