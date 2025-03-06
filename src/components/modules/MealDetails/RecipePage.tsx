

"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import { Clock, Utensils, Flame, ChefHat, Star, Leaf, Droplet, Wheat, Beef, Salad } from "lucide-react";
import { TMealsForm } from "@/types/meals";
import { currencyFormatter } from "@/lib/currencyFormatter";
import Link from "next/link";


interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export default function RecipePage({meal}:{meal:TMealsForm }) {


  const {category,description,dietaryPreferences,imageUrls,ingredients,mealProvider,name,price,_id,portionSize} = meal
 


  const chef = mealProvider?.userId
 

  const [selectedImage, setSelectedImage] = useState(0);
 
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });


 
  const handleReviewSubmit = () => {
    if (newReview.rating > 0 && newReview.comment) {
      setReviews([...reviews, {
        id: Math.random().toString(),
        author: "You",
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toLocaleDateString()
      }]);
      setNewReview({ rating: 0, comment: "" });
    }
  };

  return (
    <div className="min-h-screen bg-background mx-24">
      <main className="container py-8">
        {/* Image Gallery */}
        <div className="mb-8 space-y-4">
          <div className="relative aspect-[3/1] rounded-xl overflow-hidden shadow-lg">
            <Image
              src={imageUrls[selectedImage]}
              alt="Main recipe image"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute bottom-4 left-4 bg-background/90 px-4 py-2 rounded-full flex items-center gap-2 text-sm">
              <span>📸</span>
              <span>Click thumbnails to view</span>
            </div>
          </div>

          <div className="flex gap-4 pb-4 overflow-x-auto">
            {imageUrls.map((url, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square w-24 shrink-0 rounded-lg cursor-pointer transition-all border-2 ${
                  selectedImage === index 
                    ? "border-primary shadow-lg" 
                    : "border-muted opacity-75 hover:opacity-100"
                }`}
              >
                <Image
                  src={url}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover rounded"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Recipe Header */}
        <div className="mb-8 space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">{name}</h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <ChefHat className="w-4 h-4" />
            <span>Signature Recipe by {chef?.name}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-semibold text-primary">
              {currencyFormatter(Number(price.toFixed(2)))}
            </span>
     





          </div>
          
          <div className="flex items-center gap-4 text-muted-foreground">
           <div className="flex items-center gap-2">
           <ChefHat className="w-4 h-4" />
           <span>Category: {category}</span>
           </div>
           <div className="flex items-center gap-2">
           <ChefHat className="w-4 h-4" />
           <span>Portionsize: {portionSize}</span>
           </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {dietaryPreferences.map((pref) => (
              <span key={pref} className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary">
                {pref}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
          {/* Main Content */}
          <div className="space-y-8">
            {/* //description */}
          <Card className="border-primary/20">
              <CardHeader className="bg-primary/5">
                <div className="flex items-center gap-2">
                  <ChefHat className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-semibold">About the Dish</h2>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
            {/* Ingredients Card */}
            <Card className="border-primary/20">
              <CardHeader className="bg-primary/5">
                <div className="flex items-center gap-2">
                  <Utensils className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-semibold">Ingredients</h2>
                </div>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                {ingredients.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/10">
                    <div className="p-2 rounded-md bg-primary/10">
                      <Salad className="w-5 h-5 text-primary" />
                    </div>
                    <p className="font-medium">{item}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="border-primary/20">
              <CardHeader className="bg-primary/5">
                <div className="flex items-center gap-2">
                  <Flame className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-semibold">Cooking Instructions</h2>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {[1,2,3,4,5,6,7].map((step) => (
                  <div key={step} className="flex gap-4 group">
                    <div className="relative flex flex-col items-center">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-background font-medium">
                        {step}
                      </div>
                      {step < 7 && (
                        <div className="absolute top-8 left-1/2 w-0.5 h-[calc(100%-2rem)] bg-muted -translate-x-1/2" />
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <h4 className="font-medium text-lg mb-2">Step {step}</h4>
                      <p className="text-muted-foreground">
                        {step === 1 && "Combine coconut milk, garlic, and spices in a saucepan. Bring to a gentle simmer."}
                        {step === 2 && "Marinate chicken strips for 30 minutes to absorb flavors."}
                        {step === 3 && "Skewer marinated chicken pieces for perfect grilling."}
                        {step === 4 && "Sauté in olive oil until golden brown and crispy."}
                        {step === 5 && "Whip up creamy peanut sauce with coconut milk."}
                        {step === 6 && "Finish with fresh lime juice and soy sauce."}
                        {step === 7 && "Serve sizzling skewers over crushed Doritos®."}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <Card className="border-primary/20 hidden lg:block">
              <CardHeader className="bg-primary/5">
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-semibold">Reviews</h2>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Review Form */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-8 h-8 cursor-pointer ${
                          newReview.rating >= star 
                            ? "fill-yellow-400 text-yellow-400" 
                            : "text-muted-foreground"
                        }`}
                        onClick={() => setNewReview({...newReview, rating: star})}
                      />
                    ))}
                  </div>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Write your review..."
                    rows={3}
                  />
                  <Button onClick={handleReviewSubmit} className="cursor-pointer">Submit Review</Button>
                </div>

                {/* Existing Reviews */}
                {reviews.map((review) => (
                  <div key={review.id} className="border-t pt-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              review.rating > i 
                                ? "fill-yellow-400 text-yellow-400" 
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-medium">{review.author}</span>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="mt-2 text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">

                  {/* Chef Profile */}
                  <Card className="border-primary/20">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                      <Image 
                        src={chef?.profileImage?.[0] || 'https://res.cloudinary.com/dsgnwjmlv/image/upload/v1741199867/male-avatar-maker-2a7919_1_ifuzwo.webp'}
                        alt="Chef Maria"
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-background p-1 rounded-full">
                      <ChefHat className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{chef?.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-sm text-muted-foreground">4.9/5</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{mealProvider?.experience}+ Years Experience</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full gap-2 cursor-pointer">
                  <span>👩🍳 Follow Chef</span>
                </Button>
              </CardContent>
            </Card>

            {/* Nutrition Card */}
            <Card className="border-primary/20">
              <CardHeader className="bg-primary/5">
                <div className="flex items-center gap-2">
                  <Leaf className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-semibold">Nutrition</h2>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
              <CardContent className="pt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <span>Calories</span>
                  </div>
                  <span className="font-medium">586 kcal</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Beef className="w-5 h-5 text-amber-600" />
                      <span>Protein</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>12.5g</span>
                      <div className="w-20 h-2 bg-muted rounded-full">
                        <div className="w-3/4 h-full bg-primary rounded-full" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Wheat className="w-5 h-5 text-yellow-600" />
                      <span>Carbs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>49.7g</span>
                      <div className="w-20 h-2 bg-muted rounded-full">
                        <div className="w-2/3 h-full bg-primary rounded-full" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Droplet className="w-5 h-5 text-sky-500" />
                      <span>Fat</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>39.3g</span>
                      <div className="w-20 h-2 bg-muted rounded-full">
                        <div className="w-1/2 h-full bg-primary rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              </CardContent>
            </Card>

            {/* Order Button */}
            <Button className="w-full h-14 text-lg font-bold gap-2 hover:shadow-lg transition-shadow cursor-pointer">
              <Utensils className="w-5 h-5" />
              <Link href={`/ordermeal/${_id}`}>Customize & Order Now</Link>
            </Button>

            <Card className="border-primary/20 block lg:hidden">
              <CardHeader className="bg-primary/5">
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-semibold">Reviews</h2>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Review Form */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-8 h-8 cursor-pointer ${
                          newReview.rating >= star 
                            ? "fill-yellow-400 text-yellow-400" 
                            : "text-muted-foreground"
                        }`}
                        onClick={() => setNewReview({...newReview, rating: star})}
                      />
                    ))}
                  </div>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Write your review..."
                    rows={3}
                  />
                  <Button onClick={handleReviewSubmit} className="cursor-pointer">Submit Review</Button>
                </div>

                {/* Existing Reviews */}
                {reviews.map((review) => (
                  <div key={review.id} className="border-t pt-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              review.rating > i 
                                ? "fill-yellow-400 text-yellow-400" 
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-medium">{review.author}</span>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="mt-2 text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </CardContent>
            </Card>


          </div>
        </div>
      </main>
    </div>
  );
}