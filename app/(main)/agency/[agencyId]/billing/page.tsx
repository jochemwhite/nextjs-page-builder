import { Separator } from "@/components/ui/separator";
import { addOnProducts, pricingCards } from "@/lib/constants";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import PricingCard from "./_components/pricing-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import clsx from "clsx";
import SubscriptionHelper from "./_components/subscription-helper";

type Props = {
  params: { agencyId: string };
};
export default async function BillinPage({ params }: Props) {
  //CHALLENGE: CREATE THE ADD ON PRODUDCTS
  const addOns = await stripe.products.list({
    ids: addOnProducts.map((p) => p.id),
    expand: ["data.default_price"],
  });
  const agencySubscription = await db.agency.findUnique({
    where: {
      id: params.agencyId,
    },
    select: {
      customerId: true,
      Subscription: true,
    },
  });
  const prices = await stripe.prices.list({
    product: process.env.NEXT_PLURA_PRODUCT_ID,
    active: true,
  });

  const currentPlanDetails = pricingCards.find(
    (c) => c.priceId === agencySubscription?.Subscription?.priceId
  );

  const charges = await stripe.charges.list({
    limit: 50,
    customer: agencySubscription?.customerId,
  });

  const allCharges = [
    ...charges.data.map((charge) => ({
      description: charge.description,
      id: charge.id,
      date: `${new Date(charge.created * 1000).toLocaleTimeString()} ${new Date(
        charge.created * 1000
      ).toLocaleDateString()}`,
      status: "Paid",
      amount: `$${charge.amount / 100}`,
    })),
  ];
  const isActived = agencySubscription?.Subscription?.active === true;
  const amtMsg = isActived ? "Change Plan" : "Get Started";
  const highlightDescription =
    "Want to modify your plann? You can do this here. If you have further question contact support@plura-app.com";
  const description = isActived
    ? currentPlanDetails?.description ?? "Lets get started"
    : "Lets get started! Pick a plan that works best for you.";
  const buttonCta = isActived ? "Change Plan" : "Get Started";
  return (
    <>
      <SubscriptionHelper
        prices={prices.data}
        customerId={agencySubscription?.customerId ?? ""}
        planExists={agencySubscription?.Subscription?.active === true}
      />
      <h1 className="text-4xl p-4">Billing</h1>
      <Separator className="mb-6" />
      <h2 className="text-2xl p-4">Current Plan</h2>
      <div className="flex flex-col lg:!flex-row justify-between gap-8">
        <PricingCard
          planExists={isActived}
          prices={prices.data}
          customerId={agencySubscription?.customerId ?? ""}
          amt={isActived ? currentPlanDetails?.price ?? "$0" : "$0"}
          highlightDescription={highlightDescription}
          highlightTitle="Plan Options"
          description={description}
          buttonCta={buttonCta}
          duration="/month"
          features={
            isActived
              ? currentPlanDetails?.features ??
                pricingCards.find((p) => p.title === "Starter")?.features ??
                []
              : pricingCards.find((p) => p.title === "Starter")?.features ?? []
          }
          title={isActived ? currentPlanDetails?.title ?? "Starter" : "Starter"}
        />
        {addOns.data.map((addOnd) => (
          <PricingCard
            key={addOnd.id}
            planExists={isActived}
            prices={prices.data}
            customerId={agencySubscription?.customerId ?? ""}
            amt={
              //@ts-ignore
              addOnd.default_price?.unit_amount
                ? //@ts-ignore
                  `$${addOnd.default_price?.unit_amount / 100}`
                : "$0"
            }
            highlightDescription={
              "Dedicated support line & teams channel for support"
            }
            highlightTitle="Get support now!"
            description={description}
            buttonCta={"Subscribe"}
            duration="/month"
            features={[]}
            title={"24/7 priority support"}
          />
        ))}
      </div>
      <h2 className="text-2xl p-4">Payment History</h2>
      <Table className="bg-card border-[1px] border-border rounded-md">
        <TableHeader className="rounded-md">
          <TableRow>
            <TableHead className="w-[200px]">Description</TableHead>
            <TableHead className="w-[200px]">Invoice Id</TableHead>
            <TableHead className="w-[300px]">Date</TableHead>
            <TableHead className="w-[200px]">Paid</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="font-medium truncate">
          {allCharges.map((charge) => (
            <TableRow key={charge.id}>
              <TableCell>{charge.description}</TableCell>
              <TableCell className="text-muted-foreground">
                {charge.id}
              </TableCell>
              <TableCell>{charge.date}</TableCell>
              <TableCell>
                <p
                  className={clsx("", {
                    "text-emerald-500": charge.status.toLowerCase() === "paid",
                    "text-orange-600":
                      charge.status.toLowerCase() === "pending",
                    "text-red-600": charge.status.toLowerCase() === "failed",
                  })}
                >
                  {charge.status.toUpperCase()}
                </p>
              </TableCell>
              <TableCell className="text-right">{charge.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>{" "}
    </>
  );
}
