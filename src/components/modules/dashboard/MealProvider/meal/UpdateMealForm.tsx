/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
// import ImageUploader from "@/components/ui/ImageUploader";
// import { updateMeal } from "@/services/Meal";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import NBImageUploader from "@/components/ui/core/NBImageUploader";
import { TMealsForm } from "@/types/meals";
import ImagePreviewer from "@/components/ui/core/NBImageUploader/ImagePreviewer";
import { updateMeal } from "@/services/Meals";

export default function UpdateMealForm({ meal }:{meal:TMealsForm}) {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>(meal?.imageUrls || []);
  const router = useRouter();

    console.log(imageFiles)

  const form = useForm({
    defaultValues: {
      name: meal?.name || "",
      category: meal?.category || "",
      price: meal?.price || "",
      ingredients: meal?.ingredients.join(", ") || "",
      portionSize: meal?.portionSize || "",
      available: meal?.available || false,
      description: meal?.description || "",
      dietaryPreferences: meal?.dietaryPreferences?.join(", ") || "",
     
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<any> = async (data) => {
    const modifiedData = {
      ...data,
      imageUrls: [...imagePreview],
      price: parseFloat(data.price),
      ingredients: data.ingredients.split(",").map((item:string) => item.trim()),
      dietaryPreferences: data.dietaryPreferences.split(",").map((item:string) => item.trim()),
    };

    console.log(modifiedData,'amoajfo')
    console.log(meal?._id,meal?.name)
   

    try {
      const res = await updateMeal(modifiedData, meal?._id);
      if (res.success) {
        toast.success("Meal updated successfully!");
        router.push("/mealprovider/meals/allmeals");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="border-2 border-gray-300 rounded-xl p-8 mx-auto container w-2xl">
      <h1 className="text-xl font-bold mb-5">Update Meal</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mt-4 text-primary text-md">Meal Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mt-4 text-primary text-md">Price</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mt-4 text-primary text-md">Category</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

<FormField
            control={form.control}
            name="dietaryPreferences"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mt-4 text-primary text-md">DietaryPreferences</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ingredients"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mt-4 text-primary text-md">Ingredients (comma separated)</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="portionSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mt-4 text-primary text-md">Portion Size</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

<FormField 
  control={form.control} 
  name="available" 
  render={({ field }) => (
    <FormItem className="flex items-center gap-4 mt-4">
      <FormLabel className=" text-primary text-md">Available</FormLabel>
      <FormControl>
        <Checkbox 
          checked={field.value} 
          onCheckedChange={field.onChange} 
          className="w-5 h-5 border-green-500 rounded-md border-2 transition-all"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )} 
/>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mt-4 text-primary text-md">Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

    <div className="flex justify-between items-center border-t border-b py-3 my-5">
              <p className="text-primary font-semibold text-lg">Images</p>
            </div>
            <div className="flex gap-4 ">
              <NBImageUploader
                setImageFiles={setImageFiles}
                setImagePreview={setImagePreview}
                label="Upload Image"
                className="w-1/4  mt-0"
              />
              <ImagePreviewer
                className="flex flex-wrap gap-4"
                setImageFiles={setImageFiles}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
              />
            </div>
            <Button type="submit" className="mt-5 w-full" disabled={isSubmitting}>
            {isSubmitting ? "Updating Product....." : "Update Product"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
