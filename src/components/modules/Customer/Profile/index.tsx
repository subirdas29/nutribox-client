"use client"
import { Card, CardTitle} from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

import Image from "next/image";


import { IUser } from "@/types/user";
import CustomerProfileModal from "./CustomerProfileModal";



const CustomerProfile = ({
    customerDetails,
}: {
    customerDetails: IUser;
}) => {

  const customer = customerDetails; 

  if (!customer) return <p className="text-center text-gray-500">No customer data available</p>;



  

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Profile Card */}
      <Card className="p-6 flex items-center  gap-6">
        <Avatar className="w-20 h-20">
          <Image
              src={customer?.profileImage?.[0] || 'https://res.cloudinary.com/dsgnwjmlv/image/upload/v1741199867/male-avatar-maker-2a7919_1_ifuzwo.webp'}
            alt="Please add profile_img"
            width={100}
            height={100}
            className="rounded-full"
          />
          
           
        </Avatar>
        <div className="text-center">
          <CardTitle className="text-2xl font-bold">{customer?.name}</CardTitle>
          <p className="text-gray-500">{customer?.email}</p>
          <p className="text-gray-500">Phone: {customer?.phone}</p>
          <p className="text-gray-500">Address: {customer?.address}</p>
          <p className="text-gray-500">City: {customer?.city}</p>
          {/* <div className="flex gap-2 mt-2 justify-center">
            {customer?.cuisineSpecialties?.map((cuisine) => (
              <Badge key={cuisine}>{cuisine}</Badge>
            ))}
          </div> */}
        </div>
        <CustomerProfileModal customer ={customer}/>
      </Card>

      {/* Meals Section */}
      <div>
        {/* <h2 className="text-xl font-semibold mb-4">Available Meals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayedMeals?.map((meal) => (
            <Card key={meal._id} className="p-4">
              <CardHeader className="flex">
                <CardTitle>{meal.name}</CardTitle>
                <div className=" flex gap-2">
           
             <Link href={`/mealdetails/${meal._id}`}><Eye className="cursor-pointer text-blue-500" /></Link>
                <Link href={`/mealcustomer/meals/updatemeals/${meal._id}`}><Edit className="cursor-pointer text-green-500" /></Link>
              </div>
              </CardHeader>
              <CardContent>
                <Image
                  src={meal.imageUrls[0] || "https://via.placeholder.com/200"}
                  alt={meal.name}
                  width={200}
                  height={150}
                  className="w-full h-40 object-cover rounded-md"
                />
                <p className="text-gray-500 mt-2">Category: {meal.category}</p>
                <p className="text-gray-700 font-semibold">${meal.price}</p>
              </CardContent>
             
            </Card>
          ))}
        </div> */}
        
          {/* <div className="text-center mt-5">
            <button
              className="px-5 py-2 bg-primary text-white rounded-md"
            >
              <Link href='/mealcustomer/meals/allmeals'>View All</Link>
            </button>
          </div> */}
        
      </div>

      {/* Reviews Section
      <div>
        <h2 className="text-xl font-semibold mb-4">Reviews</h2>
        <div className="flex gap-1">
          {[...Array(5)].map((_, index) => (
            <Star key={index} className="text-yellow-500 w-5 h-5" />
          ))}
        </div>
      </div>  */}
    </div>
  );
};

export default CustomerProfile;
