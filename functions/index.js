const functions = require('firebase-functions');

const express = require('express');
const cors = require('cors');
// stripe includes secret key from api stripe.com 
const stripe = require('stripe')('')

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
