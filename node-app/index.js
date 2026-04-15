const amqp = require("amqplib");

async function produce() {
  try {
    const connection = await amqp.connect(
      process.env.RABBITMQ_URL || "amqp://rabbitmq",
    );
    const channel = await connection.createChannel();
    const queue = "test-queue";

    await channel.assertQueue(queue, { durable: true });

    setInterval(() => {
      const msg = "Hello " + new Date().toISOString();
      channel.sendToQueue(queue, Buffer.from(msg), { persistent: true });
      console.log("sent:", msg);
    }, 2000);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

produce();
