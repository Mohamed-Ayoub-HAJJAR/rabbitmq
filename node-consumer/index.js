const amqp = require('amqplib');

async function consume() {
  try {
    const connection = await amqp.connect('amqp://rabbitmq');
    const channel = await connection.createChannel();
    const queue = 'test-queue';

    await channel.assertQueue(queue, { durable: true });

    console.log(`[*] Waiting for messages in ${queue}. To exit press CTRL+C`);

    channel.consume(queue, msg => {
      if (msg !== null) {
        console.log(`[x] Received: ${msg.content.toString()}`);
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

consume();

