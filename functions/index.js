/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");
const express = require('express')
const cors =require('cors')
const dotenv = require('dotenv')

 dotenv.config()
const stripe=require('stripe')(process.env.STRIPE_KEY)

// // Start writing functions
const app = express()
app.use(cors({origin:true}))
app.use(express.json())
app.get('/',(req,res)=>{
    res.status(200).json(' SUCCESS ')

})
app.post("/payment/create", async (req, res) => {
    const total =parseInt( req.query.total)
    if (total > 0) {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency:'usd'
        })
        console.log(paymentIntent);
        res.status(200).json({ clientSecret: paymentIntent.client_secret, });
    } else {
         res.status(403).json('total must be greater than 0');
    }
    
})
exports.api = onRequest(app)





