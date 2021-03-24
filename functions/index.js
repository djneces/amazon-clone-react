const functions = require('firebase-functions');

const express = require('express');
const cors = require('cors');
// stripe includes secret key from api stripe.com 
const stripe = require('stripe')('sk_test_51I5wX7AF4AzYfXhTQ6otfxW4J1tM4la7GGh21ddR9ELBS5vy5agHevuMx6NNDFW6C0a6lPXuZKAHsLmIM1ci4t3j00gywP7B7B')

//API

//App config
const app = express();

//Middlewares
app.use(cors( {origin: true} ));
app.use(express.json());

//API routes
app.get('/', (request, response) => response.status(200).send('Hello world!'));

app.post('/payments/create', async (request, response) => {
    //total from payment.js in the useEffect url
 const total = request.query.total;   

 console.log('Payment request received ', total);

 const paymentIntent = await stripe.paymentIntents.create({
     amount: total, //in subunits of the currency
     currency: "usd",
 });
 //Ok- created
 response.status(201).send({
    clientSecret: paymentIntent.client_secret, 
 });
});

//Listen command
exports.api = functions.https.onRequest(app);