import Stripe from "stripe";
const stripe = new Stripe(process.env.sk_test_51S1OAH3pBglTeA0mHwpt3XvG6p0DB1iiUmQGPUHGfWtW7eJaBwu9CnDAF4PJPp9s45fFlmK97JSF8uY3rHbsCyK9000RTOKPxE);

export async function handler(event) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: "prod_Sy9WIESjj94mNj", quantity: 1 }],
      mode: "subscription",
      success_url: `${process.env.URL}/success`,
      cancel_url: `${process.env.URL}/cancel`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id }),
    };
  } catch (err) {
    return { statusCode: 500, body: err.message };
  }
}
