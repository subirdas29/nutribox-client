/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { clearCart } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hook";
import Link from "next/link";
import { useEffect } from "react";

interface VerifyOrderProps {
  orderData: any; 
}

export default function VerifyOrder({orderData}: VerifyOrderProps) {

  console.log(orderData.customer_order_id
    ,'dataaa')

  const dispatch = useAppDispatch();

  console.log(orderData,'verifyorder')
  useEffect(() => {
    if (orderData?.bank_status === "Success") {
      dispatch(clearCart());
    }
  }, [orderData, dispatch]);

  if (!orderData) return <p className="my-32 text-center text-red-500 font-bold">No order found!</p>;


  
  return (
   <>
    <div className="mx-8 md:mx-12 lg:mx-24 p-6 my-28">
      <h1 className="text-3xl font-bold mb-6">Order Verification</h1>
      <div className="grid grid-cols-1 md:grid-cols-3  gap-6">
        {/* Order Details */}
        <div className="border-1 border-gray-200 shadow-lg rounded-md p-6">
          <h2 className="text-xl font-bold mb-3">Order Details</h2>
          <p><strong>Order ID:</strong> {orderData?.order_id}</p>
          <p><strong>Amount:</strong> {orderData?.currency} {orderData?.amount?.toFixed(2)}</p>
          <p><strong>Status:</strong> <span className={`px-2 py-1 rounded-md text-white ${orderData?.bank_status === "Success" ? "bg-[#1890ff]" : "bg-red-500"}`}>{orderData?.bank_status}</span></p>
          <p><strong>Date:</strong> {new Date(orderData?.date_time)?.toLocaleString()}</p>
        </div>
        
        {/* Payment Information */}
        <div className="border-1 border-gray-200 shadow-lg rounded-md p-6">
          <h2 className="text-xl font-bold mb-3">Payment Information</h2>
          <p><strong>Method:</strong> {orderData?.method}</p>
          <p><strong>Transaction ID:</strong> {orderData?.bank_trx_id}</p>
          <p><strong>Invoice No:</strong> {orderData?.invoice_no}</p>
          <p><strong>SP Code:</strong> {orderData?.sp_code}</p>
          <p><strong>SP Message:</strong> {orderData?.sp_message}</p>
        </div>

        {/* Customer Information */}
        <div className="border-1 border-gray-200 shadow-lg rounded-md p-6">
          <h2 className="text-xl font-bold mb-3">Customer Information</h2>
          <p><strong>Name:</strong> {orderData?.name}</p>
          <p><strong>Email:</strong> {orderData?.email}</p>
          <p><strong>Phone:</strong> {orderData?.phone_no}</p>
          <p><strong>Address:</strong> {orderData?.address}</p>
          <p><strong>City:</strong> {orderData?.city}</p>
        </div>

 
      
      </div>
     <div className="flex justify-center mt-12">
     <Link href={`/orderdetails/${orderData.customer_order_id}`} >
      <button className="px-6  py-2  cursor-pointer bg-primary border  text-white font-semibold rounded-md  ">View Orders</button>
      </Link>
    
     </div>
    </div>
   </>
  );
}
