const amqp = require('amqplib');

async function consume() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://rabbitmq');
    const channel = await connection.createChannel();
    const queue = 'test-queue';

    await channel.assertQueue(queue, { durable: true });
    console.log(`[*] Waiting for messages in ${queue}. To exit press CTRL+C`);

    channel.consume(queue, async (msg) => {
      const content = msg.content.toString();
      console.log(`[x] Received: ${content}`);

      // Simule un traitement de 5 secondes
      await new Promise(resolve => setTimeout(resolve, 5000));

      // Accuse réception du message
      channel.ack(msg);
    }, { noAck: false });
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

consume();

