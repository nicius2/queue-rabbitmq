import express from "express"

const app = express();
const port = 8080

app.use(express.json());

app.get('/', (_request, response) => {
  response.json({
    name: 'queue-node-redir',
    message: 'API base running',
  });
});

app.get('/health', (_request, response) => {p
  response.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`HTTP server running on port ${port}`);
});
