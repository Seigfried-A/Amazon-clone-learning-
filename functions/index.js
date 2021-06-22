const functions = require('firebase-functions');
const express = require("express");
const cors = require("cors");
const { request, response } = require('express');
const stripe = require("stripe")('sk_test_51HsxAWDPuGjEr58rCFsgItpC9hCPw7keSQGE6Yiu2zHzzDeBHMkV9QSiTLEwXis0ajC8Hl6AeWS31H0QWNfgIKHF00VertcVgt')

//-API creation steps below

//-App Config 
const app = express();

//-Middlewares 
app.use(cors({origin: true}));
app.use(express.json())

//-Api routes
app.get('/', (request, response) => response.status(200).send('hello world'))

app.post('/payment/create', async (request, response) => {

    const total = request.query.total;

    console.log('payment request recieved BADOOSH!! for this amount >>>', total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // subunits of the currency
        currency: "usd",
    })
    response.status(201).send({
        clientSecrets: paymentIntent.client_secret,
    });
})

//-Listen Command
exports.api = functions.https.onRequest(app)

//http://localhost:4000/functions
//http://localhost:5001/clone-e319b/us-central1/api