const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

const server = https.createServer(app);  
const signal = new SignalServer({ server });
signal.connect();
server.listen(3000, () => console.log('listening on 3000'));
 ./ngrok http 3000 
npm install -g localtunnel