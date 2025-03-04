
import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({
   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
});

export async function uploadImageToCloudinary(file: Blob) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '');

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, // ✅ Fix this line
    {
      method: 'POST',
      body: formData,
    }
  );

  const data = await res.json();

console.log("Cloudinary API Response:", data.secure_url);
  if (data.error) {
    console.error("Cloudinary Error:", data.error.message);
    throw new Error(data.error.message);
  }

  return data.secure_url; 
}
