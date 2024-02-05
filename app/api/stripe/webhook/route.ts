import { stripe } from "@/lib/stripe";
import { subscriptionCreated } from "@/lib/stripe/stripe-actions";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
const stripeWebhookEvents = new Set([
  "product.created",
  "product.updated",
  "price.created",
  "price.updated",
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

export async function POST(req: NextRequest) {
  let stripeEvent: Stripe.Event;
  const body = await req.text();
  const sig = headers().get("Stripe-Signature");
  const webhookSecret =
    process.env.STRIPE_WEBHOOK_SECRET_LIVE ?? process.env.STRIPE_WEBHOOK_SECRET;
  try {
    if (!sig || !webhookSecret) {
      throw new Error("Not sig o webhok secret");
    }
    stripeEvent = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (error: any) {
    console.log("[ERROR_STRIPE_WEB_HOOK]", error);
    return new NextResponse(`Webhook Error:${error.message}`, { status: 500 });
  }

  try {
    if (stripeWebhookEvents.has(stripeEvent.type)) {
      const subscription = stripeEvent.data.object as Stripe.Subscription;
      if (
        !subscription.metadata.connectAccountPayments &&
        !subscription.metadata.connectAccountSubscriptions
      ) {
        switch (stripeEvent.type) {
          case "customer.subscription.created":
          case "customer.subscription.updated": {
            if (subscription.status == "active") {
              await subscriptionCreated(
                subscription,
                subscription.customer as string
              );
              console.log("CREATED FROM WEBHOOK", subscription);
            } else {
              console.log(
                "SKIPPED AT CREATED FROM WEBHOOK because subscription status is not active",
                subscription
              );
            }

            break;
          }
          default:
            console.log("Unhadled relevant event!", stripeEvent.type);
            break;
        }
      } else {
        console.log(
          "SKIPPED FROM WEBHOOK because subscription was from a connected accountm not for the application",
          subscription
        );
      }
    }
  } catch (error) {
    console.log("[ERROR_STRIPE_WEB_HOOK_STEP_2]", error);
    return new NextResponse("Webhook error", { status: 500 });
  }

  return NextResponse.json(
    {
      webhookActionReceived: true,
    },
    {
      status: 200,
    }
  );
}
