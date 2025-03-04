
"use client"
import NBImageUploader from '@/components/ui/core/NBImageUploader';
import ImagePreviewer from '@/components/ui/core/NBImageUploader/ImagePreviewer';
import React, { useState } from 'react';

const ImageData = () => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);

console.log(imageFiles)
  return (
    <div className="flex items-center justify-center">
      {imagePreview.length > 0 ? (
        <ImagePreviewer
          setImageFiles={setImageFiles}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
        />
      ) : null}
      <NBImageUploader
        setImageFiles={setImageFiles}
        setImagePreview={setImagePreview}
        label="Upload Logo"
      />
    </div>
  );
};

export default ImageData;
