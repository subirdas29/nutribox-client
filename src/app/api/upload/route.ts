import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

// Cloudinary কনফিগারেশন
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as Blob;

    // Blob থেকে ArrayBuffer তৈরি করা হচ্ছে
    const arrayBuffer = await file.arrayBuffer();

    // ArrayBuffer থেকে Buffer তৈরি করা হচ্ছে
    const buffer = Buffer.from(arrayBuffer);

    // Cloudinary তে ফাইল আপলোড
    const result = await cloudinary.uploader.upload(buffer, {
      resource_type: 'auto', // যেকোনো ফাইল টাইপ (ছবি, ভিডিও)
      folder: 'your_folder_name', // Optional: Cloudinary folder name
    });

    // আপলোড করা ছবির URL রিটার্ন করা হচ্ছে
    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ error: 'Error uploading image' }, { status: 500 });
  }
}
