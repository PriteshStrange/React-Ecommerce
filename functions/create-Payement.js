require("dotenv").config();

const stripe = require("stripe")(process.env.APP_STRIPE_SECREAT_KEY);
exports.handler = async function (event, context) {
  if (event.body) {
    const { total_amount, shipping_fee } = JSON.parse(event.body);

    const CalculatingAmount = () => {
      return shipping_fee + total_amount;
    };
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: CalculatingAmount(),
        currency: "inr",
      });
      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      };
    } catch (err) {
      return {
          statusCode:500,
          body:JSON.stringify({msg:err.message})
      }
    }
  }
  return {
    statusCode: 200,
    body: "Hello now......",
  };
};
