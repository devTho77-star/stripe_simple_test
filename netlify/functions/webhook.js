import Stripe from "stripe";
const stripe = new Stripe(process.env.sk_test_51S1OAH3pBglTeA0mHwpt3XvG6p0DB1iiUmQGPUHGfWtW7eJaBwu9CnDAF4PJPp9s45fFlmK97JSF8uY3rHbsCyK9000RTOKPxE);

export async function handler(event) {
  const sig = event.headers["stripe-signature"];
  try {
    const evt = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (evt.type === "checkout.session.completed") {
      // handle subscription success
    }

    return { statusCode: 200, body: "ok" };
  } catch (err) {
    return { statusCode: 400, body: `Webhook error: ${err.message}` };
  }
}
