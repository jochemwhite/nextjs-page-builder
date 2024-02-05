import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const {
    subAccountConnectAccId,
    prices,
    subaccountId,
  }: {
    subAccountConnectAccId: string;
    prices: { recurring: boolean; productId: string }[];
    subaccountId: string;
  } = await req.json();

  const origin = req.headers.get("origin");
  if (!subAccountConnectAccId || !prices.length) {
    return NextResponse.json(
      { error: "PARAMS NOT FOUND" },
      {
        status: 500,
      }
    );
  }
  if (
    !process.env.NEXT_PUBLIC_PLATFORM_SUBSCRIPTION_PERCET ||
    !process.env.NEXT_PUBLIC_PLATFORM_ONETIME_FEE ||
    !process.env.NEXT_PUBLIC_PLATFORM_AGENCY_PERCENT
  ) {
    return NextResponse.json(
      { error: "Missing values" },
      {
        status: 500,
      }
    );
  }

  const agencyIdConnectedAccountId = await db.subAccount.findUnique({
    where: {
      id: subaccountId,
    },
    include: {
      Agency: true,
    },
  });
  const subscriptionPricesExists = prices.find((price) => price.recurring);

  if (!agencyIdConnectedAccountId?.Agency.connectAccountId) {
    return NextResponse.json(
      { error: "Not account connected with stripe" },
      {
        status: 500,
      }
    );
  }
  try {
    const session = await stripe.checkout.sessions.create(
      {
        line_items: prices.map((price) => ({
          price: price.productId,
          quantity: 1,
        })),
        ...(subscriptionPricesExists && {
          subscription_data: {
            metadata: {
              connectAccountSubscriptions: "true",
            },
            application_fee_percent:
              +process.env.NEXT_PUBLIC_PLATFORM_SUBSCRIPTION_PERCENT!,
          },
        }),
        ...(!subscriptionPricesExists && {
          payment_intent_data: {
            metadata: { connectAccountSubscriptions: "true" },
            application_fee_amount:
              +process.env.NEXT_PUBLIC_PLATFORM_ONETIME_FEE * 100,
          },
        }),
        mode: subscriptionPricesExists ? "subscription" : "payment",
        ui_mode: "embedded",
        redirect_on_completion: "never",
      },
      {
        stripeAccount: subAccountConnectAccId,
      }
    );
    return NextResponse.json(
      {
        clientSecret: session.client_secret,
      },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": origin || "*",
          "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  } catch (error: any) {
    console.log("[STRIPE_CREATE_CHECKOUT_SESSION]", error);

    return NextResponse.json(
      { error: error?.message },
      {
        status: 500,
      }
    );
  }
}
export async function OPTIONS(request: Request) {
  const allowedOrigin = request.headers.get("origin");
  const response = new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": allowedOrigin || "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
      "Access-Control-Max-Age": "86400",
    },
  });

  return response;
}
