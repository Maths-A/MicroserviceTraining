const http = require('http');

// Création du serveur HTTP
const server = http.createServer((req, res) => {
  // Envoi d'une réponse HTTP avec le code 200 (OK) et le contenu "Hello World!"
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World! Compte\n');
});

// Écoute du serveur sur le port 9000
const port = 9000;
server.listen(port, () => {
  console.log(`Server running at http://localhost/compte:${port}/`);
});