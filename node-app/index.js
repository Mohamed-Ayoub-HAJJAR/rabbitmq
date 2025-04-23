const amqp = require('amqplib');

async function produce() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://rabbitmq');
    const channel = await connection.createChannel();
    const queue = 'test-queue';

    await channel.assertQueue(queue, { durable: true });

    const message = 'Hello, RabbitMQ!';

    // Envoie un message dans la queue
    channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
    console.log(`[x] Sent: ${message}`);

    // Fermer la connexion après l'envoi
    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

produce();

