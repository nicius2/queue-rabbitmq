# Queue Node Redir

Base mínima para praticar filas com Node.js, RabbitMQ, PostgreSQL e Redis.

A principal ideia é entender como funciona a fila e o desaclopamento entre pastes da aplicação.

rabbit-study/
├── docker-compose.yml
├── package.json
├── tsconfig.json
├── .env
└── src/
    ├── config/
    │   └── rabbit.ts        # conexão e constantes (nomes de fila/exchange)
    ├── publisher/
    │   └── publish-order.ts # producer
    └── consumer/
        └── order-consumer.ts

A regra de ouro: `config` é compartilhada, `publisher/` e `consumer/` não se conhecem. Os dois só concordam sobre o contrato: o nome da exchange, da fila e o formato da mensagem. Na vida real, publisher e consumer costumam ser serviços separados, e a pasta config/ vira um pacote ou contrato compartilhado.