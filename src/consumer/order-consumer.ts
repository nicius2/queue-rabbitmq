// aqui deve criar uma maneira de conectar com a outra parte do rabbitmq
import { connect, QUEUE, OrderCreated } from "../config/rabbit.ts";

async function main() {
  const { channel } = await connect();

  await channel.prefetch(1); // 1 mensagem por vez, sem ack não vem outra

  console.log("Aguardando mensagens...");

  channel.consume(QUEUE, async (msg) => {
    if (!msg) return;

    try {
      const order: OrderCreated = JSON.parse(msg.content.toString());
      console.log("Enviando e-mail do pedido", order.orderId);

      await new Promise((r) => setTimeout(r, 2000)); // simula trabalho

      channel.ack(msg);   // sucesso: remove da fila
    } catch (err) {
      console.error("Falhou:", err);
      channel.nack(msg, false, false); // não devolve à fila (evita loop infinito)
    }
  });
}

main().catch(console.error);