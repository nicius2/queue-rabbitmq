import "dotenv/config";
import amqp from "amqplib";

export const EXCHANGE = "orders";
export const QUEUE = "orders.email";
export const ROUTING_KEY = "order.created";

export interface OrderCreated {
  orderId: string;
  customer: string;
  total: number;
}

export async function connect() {
  const conn = await amqp.connect(process.env.RABBIT_URL!);
  const channel = await conn.createChannel();

  // Declarar é idempotente: se já existe igual, não faz nada.
  await channel.assertExchange(EXCHANGE, "topic", { durable: true });
  await channel.assertQueue(QUEUE, { durable: true });
  await channel.bindQueue(QUEUE, EXCHANGE, ROUTING_KEY);

  return { conn, channel };
}