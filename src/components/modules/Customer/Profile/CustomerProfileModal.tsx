/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Edit } from "lucide-react";
import ImagePreviewer from "@/components/ui/core/NBImageUploader/ImagePreviewer";
import NBImageUploader from "@/components/ui/core/NBImageUploader";

import { updateUser } from "@/services/User";
import { IUser } from "@/types/user";




const CustomerProfileModal = ({ customer }: { customer: IUser }) => {
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imagePreview, setImagePreview] = useState<string[]>([]);
    const [open, setOpen] = useState(false); 
  console.log(imageFiles)
    useEffect(() => {
      if (customer?.profileImage && customer.profileImage.length > 0) {
        setImagePreview(customer.profileImage);
      } else {
        setImagePreview([]);
      }
    }, [customer]);
  
    const form = useForm({
      defaultValues: {
        name: customer?.name || "",
        phone: customer?.phone || "",
        address: customer?.address || "",
        city: customer?.city || "",
      },
    });
  
    const {
      formState: { isSubmitting },
    } = form;
  
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    
  
      try {
        const modifiedData = {
            ...customer, 
          ...data,
          profileImage: [...imagePreview],
        };
  
  
        const res = await updateUser(modifiedData);
  
        console.log(res.message);
        if (res.success) {
          toast.success(res.message);
          setOpen(false);
        } else {
          toast.error(res.message);
        }
      } catch (err: any) {
        console.error(err);
      }
    };
  
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Edit className="cursor-pointer text-gray-600" onClick={() => setOpen(true)} />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
  
          <div className="flex items-center justify-center">
            {imagePreview?.length > 0 ? (
              <ImagePreviewer
                className="flex flex-wrap gap-4"
                setImageFiles={setImageFiles}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
              />
            ) : (
              <NBImageUploader
                setImageFiles={setImageFiles}
                setImagePreview={setImagePreview}
                label="Upload Your Profile Photo"
                className="w-xs mt-0"
              />
            )}
          </div>
  
          <Form {...form}>
            <form className="gap-2" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mt-4 text-primary text-md">Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mt-4 text-primary text-md">Phone</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mt-4 text-primary text-md">Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mt-4 text-primary text-md">City</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              <Button type="submit" className="w-full rounded-sm my-4">
                {isSubmitting ? "Updating...." : "Update"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default CustomerProfileModal;
  
