/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TMealsForm } from "@/types/meals";
import NBImageUploader from "@/components/ui/core/NBImageUploader";
import ImagePreviewer from "@/components/ui/core/NBImageUploader/ImagePreviewer";
import { Checkbox } from "@/components/ui/checkbox";
import { createMeals } from "@/services/Meals";


export default function AddMealForm() {
    const [imageFiles, setImageFiles] = useState<File[] | []>([]);
    const [imagePreview, setImagePreview] = useState<string[] | []>([]);

    console.log(imageFiles)

    const router = useRouter();

    const form = useForm<TMealsForm>();

    const {
        formState: { isSubmitting },
    } = form;

    const onSubmit: SubmitHandler<TMealsForm> = async (data) => {
     

        try {
            // Ensure ingredients and dietaryPreferences are strings before splitting
            const ingredientsArray = typeof data.ingredients === "string"
            ? data.ingredients.split(",").map((ingredient: string) => ingredient.trim()) // Explicit type
            : [];
        
        const dietaryPreferencesArray = typeof data.dietaryPreferences === "string"
            ? data.dietaryPreferences.split(",").map((preference: string) => preference.trim()) //  Explicit type
            : [];
        
            const uploadedImageUrls = imageFiles
                .map((file) => (typeof file === "string" ? file : ""))
                .filter((url) => url !== "");
        
            const mealData: TMealsForm = {
                ...data,
                ingredients: ingredientsArray,
                dietaryPreferences: dietaryPreferencesArray,
                imageUrls: uploadedImageUrls,
            };
        
            const res = await createMeals(mealData);
        
            if (res.success) {
                toast.success(res.message);
                router.push("/mealprovider/meals/allmeals");
            } else {
                toast.error(res.message);
            }
        } catch (err: any) {
            console.error(err);
            toast.error("An error occurred while adding the product.");
        }
        
    };

    return (
        <div className="border-2 border-gray-300 rounded-xl p-5 max-w-2xl mx-auto">
            <h1 className="text-xl font-bold mb-5">Add New Meals</h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Meal Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="price" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input {...field} type="number" step="0.01" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="category" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="portionSize" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Portion Size</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField
                            control={form.control}
                            name="available"
                            render={({ field }) => (
                                <FormItem className="flex items-center gap-4">
                                    <FormLabel>Available</FormLabel>
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            className="w-6 h-6 border-green-500 rounded-md border-2 transition-all"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>

                    <div className="my-5">
                        <FormField control={form.control} name="description" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea {...field} className="resize-none h-36" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>

                    <div className="my-5">
                        <FormField control={form.control} name="ingredients" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ingredients</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Enter ingredients, separated by commas" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>

                    <div className="my-5">
                        <FormField control={form.control} name="dietaryPreferences" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Dietary Preferences</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Enter dietary preferences, separated by commas" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>

                    <div className="my-5">
                        <div>
                            <div className="flex justify-between items-center border-t border-b py-3 my-5">
                                <p className="text-primary font-bold text-xl">Images</p>
                            </div>
                            <div className="flex gap-4 ">
                                <NBImageUploader
                                    setImageFiles={setImageFiles}
                                    setImagePreview={setImagePreview}
                                    label="Upload Image"
                                    className="w-1/3 mt-0"
                                />
                                <ImagePreviewer
                                    className="flex flex-wrap gap-4"
                                    setImageFiles={setImageFiles}
                                    imagePreview={imagePreview}
                                    setImagePreview={setImagePreview}
                                />
                            </div>
                        </div>
                    </div>

                    <Button type="submit" className="mt-5 w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Adding Meal....." : "Add Meal"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
