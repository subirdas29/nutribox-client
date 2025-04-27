import VerifyOrder from "@/components/modules/Order/VerifyOrder/VerifyOrder";
import { verifyOrder } from "@/services/Order";

interface VerifyOrderPageProps {
  searchParams: Promise<{
    order_id?: string;
  }>;
}

export default async function VerifyOrderPage({ searchParams }: VerifyOrderPageProps) {
  const params = await searchParams;
  const orderId = params?.order_id;

  if (!orderId) {
    return <div className="text-center my-32 text-red-600 font-bold">Order ID missing!</div>;
  }

  const result = await verifyOrder(orderId);


  return <VerifyOrder orderData={result?.data?.[0]} />;
}
