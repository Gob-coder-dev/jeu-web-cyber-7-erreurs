import http from 'http';
import app from './app';

const PORT = 3000;

app.set('port', PORT);
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});