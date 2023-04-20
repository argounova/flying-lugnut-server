const express = require ('express');
const colors = require ('colors');
const cors = require ('cors');
const stripe = require('stripe')('sk_test_51MpidxCCfVRJgqGQudT8BqfwI4nGARE5VAyxWxKAhtOVP4KvUtGFjqFtloRSJu73cNdwrBtQ8nm7Yyk3pUW4ax8U00kJbfz8sV');
require ('dotenv').config();
const { graphqlHTTP } = require ('express-graphql');
const schema = require ('./schema/schema');
const connectDB = require ('./config/db');
const PORT = process.env.PORT || 4000;

//Connect to database
connectDB(); 

const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'production'
  })
);

app.post('/checkout', async (req, res) => {
  console.log(req.body);
  const items = req.body.items;
  let lineItems = [];
  items.forEach((item) => {
      lineItems.push(
          {
              price: item.stripeId,
              quantity: item.quantity
          }
      )
  });

  const session = await stripe.checkout.sessions.create({
     line_items: lineItems,
     mode: 'payment',
     success_url: 'http://localhost:3000/success',
     cancel_url: 'http://localhost:3000/cancel' 
  });

  res.send(JSON.stringify({
      url: session.url
  }));
});


app.listen(PORT, console.log(`Server is running on port: ${PORT}`));