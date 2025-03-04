import { Input } from "../../input";
import { cn } from "@/lib/utils";

type TImageUploaderProps = {
  label?: string;
  className?: string;
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setImagePreview: React.Dispatch<React.SetStateAction<string[]>>;
};

const NBImageUploader = ({
  label = "Upload Images",
  className,
  setImagePreview,
  setImageFiles,
}: TImageUploaderProps) => {
    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files!;
        const fileArray = Array.from(files); 
        
        for (const file of fileArray) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '');
      
          try {
            const response = await fetch(
              `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
              {
                method: 'POST',
                body: formData,
              }
            );
            const data = await response.json();
            console.log("Cloudinary API Response:", data); // ✅ Debugging Log
      
            if (data.secure_url) {
              // Ensure the previous URLs are not cleared, and add the new one
              setImagePreview((prev) => [...prev, data.secure_url]);
              setImageFiles((prev) => [...prev, data.secure_url]); // Add the secure_url to imageFiles
            } else {
              console.error("Upload Error:", data.error?.message || "Unknown error");
            }
          } catch (error) {
            console.error("Error uploading image:", error);
          }
        }
      
        event.target.value = ''; 
      };
      
      
      
      

  return (
    <div className={cn("flex flex-col items-center w-full gap-4", className)}>
      <Input
        onChange={handleImageChange}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        id="image-uploader"
      />
      <label
        className="w-full h-36 md:h-36 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer text-center text-sm text-gray-500 hover:bg-gray-50 transition"
        htmlFor="image-uploader"
      >
        {label}
      </label>
    </div>
  );
};

export default NBImageUploader;
