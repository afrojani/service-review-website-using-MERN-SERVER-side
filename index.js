const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

// ---middleware----
app.use(cors());
app.use(express.json());

// ---mongodb-----

// console.log(process.env.DB_USER);
// console.log(process.env.DB_PASSWORD);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.7mc1um4.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const serviceCollection = client.db('foodApp').collection('services');

        app.get('/limitservices', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query).limit(3);
            const services = await cursor.toArray();
            res.send(services);
        });

        app.get('/services', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });
    }
    finally {

    }
}

run().catch(err => console.log(err));


app.get('/', (req, res) => {
    res.send('service api running');
});

app.listen(port, () => {
    console.log('server running on port', port);
})