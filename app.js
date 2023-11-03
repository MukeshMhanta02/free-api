const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log("Server Listening on PORT:", 3000);
});

app.get('/status', async (request, response) => {
    let result;
    const uri = 'mongodb+srv://mukesh:dell%40123@cluster0.tnohwgw.mongodb.net/'
    //const uri = 'mongodb://localhost:27017';

    const client = new MongoClient(uri);
    try {
        await client.connect();
        collection = await client.db('sample_analytics').collection('accounts');
        result = await collection.find().toArray();

    } catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
    }
    let products = [];
    result.forEach(element => {
        products.push(element.products);
    });
    console.log(products.length);
    response.send(products);
});