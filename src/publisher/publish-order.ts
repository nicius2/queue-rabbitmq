import { connect, EXCHANGE, ROUTING_KEY, OrderCreated } from "../config/rabbit.ts";

async function main() {
  const { conn, channel } = await connect();

  const order: OrderCreated = {
    orderId: crypto.randomUUID(),
    customer: "Maria",
    total: 149.9,
  };

  channel.publish(
    EXCHANGE,
    ROUTING_KEY,
    Buffer.from(JSON.stringify(order)),
    { persistent: true, contentType: "application/json" }
  );

  console.log("Publicado:", order);

  await channel.close();
  await conn.close();
}

main().catch(console.error);