"use client"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Edit, Eye, Star } from "lucide-react";
import Image from "next/image";


import Link from "next/link";
import CreateProfileModal from "./CreateProfileModal";



interface TMeal {
  _id: string;
  name: string;
  category: string;
  price: number;
  imageUrls: string[];
}

export interface IUserUpdate  {
          name: string,
          email?:string,
          phone: string,
          address:string,
          city: string,
          profileImage: string[]
};

export interface TProviderProfile {
  _id: string;
  userId: IUserUpdate;
  cuisineSpecialties: string[];
  availableMeals: TMeal[];
  experience: number;
}

const MealProviderProfile = ({
  mealProviderDetails,
}: {
  mealProviderDetails: TProviderProfile[];
}) => {
  const provider = mealProviderDetails?.[0]; 

  if (!provider) return <p className="text-center text-gray-500">No provider data available</p>;

  const displayedMeals = provider.availableMeals.slice(0, 4);

  

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Profile Card */}
      <Card className="p-6 flex items-center  gap-6">
        <Avatar className="w-20 h-20">
          <Image
              src={provider?.userId?.profileImage?.[0] || 'https://res.cloudinary.com/dsgnwjmlv/image/upload/v1741199867/male-avatar-maker-2a7919_1_ifuzwo.webp'}
            alt="Please add profile_img"
            width={100}
            height={100}
            className="rounded-full"
          />
          
           
        </Avatar>
        <div className="text-center">
          <CardTitle className="text-2xl font-bold">{provider?.userId?.name}</CardTitle>
          <p className="text-gray-500">{provider?.userId?.email}</p>
          <p className="text-gray-500">Phone: {provider?.userId?.phone}</p>
          <p className="text-gray-500">Address: {provider?.userId?.address}</p>
          <p className="text-gray-500">City: {provider?.userId?.city}</p>
          <p className="text-gray-700">Experience: {provider?.experience} years</p>
          <div className="flex gap-2 mt-2 justify-center">
            {provider?.cuisineSpecialties?.map((cuisine) => (
              <Badge key={cuisine}>{cuisine}</Badge>
            ))}
          </div>
        </div>
        <CreateProfileModal provider ={provider}/>
      </Card>

      {/* Meals Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Available Meals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayedMeals?.map((meal) => (
            <Card key={meal._id} className="p-4">
              <CardHeader className="flex">
                <CardTitle>{meal.name}</CardTitle>
                <div className=" flex gap-2">
                <Eye className="cursor-pointer text-blue-500" />
                <Link href={`/mealprovider/meals/updatemeals/${meal._id}`}><Edit className="cursor-pointer text-green-500" /></Link>
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
        </div>
        
          <div className="text-center mt-5">
            <button
              className="px-5 py-2 bg-primary text-white rounded-md"
            >
              <Link href='/mealprovider/meals/allmeals'>View All</Link>
            </button>
          </div>
        
      </div>

      {/* Reviews Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Reviews</h2>
        <div className="flex gap-1">
          {[...Array(5)].map((_, index) => (
            <Star key={index} className="text-yellow-500 w-5 h-5" />
          ))}
        </div>
      </div> 
    </div>
  );
};

export default MealProviderProfile;
