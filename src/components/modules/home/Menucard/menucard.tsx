'use client'
import { useState, useCallback } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';

import img1 from '../../../../assets/banner/providerimage/img1.jpg';
import img2 from '../../../../assets/banner/providerimage/img2.jpg';
import img3 from '../../../../assets/banner/allimage/joseph-gonzalez-zcUgjyqEwe8-unsplash.jpg';
import img4 from '../../../../assets/banner/allimage/lily-banse--YHSwy6uqvk-unsplash.jpg';
import img5 from '../../../../assets/banner/allimage/rachel-park-hrlvr2ZlUNk-unsplash.jpg';


import Link from 'next/link';

export function MenuCards() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, dragFree: true });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const updateScrollButtons = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  const scrollNext = () => {
    if (emblaApi && canScrollNext) {
      emblaApi.scrollNext();
      updateScrollButtons();
    }
  };

  const scrollPrev = () => {
    if (emblaApi && canScrollPrev) {
      emblaApi.scrollPrev();
      updateScrollButtons();
    }
  };

  const menuItems = [
    { title: "Lemon Yogurt Bundt Cake", ingredients: "ADD 10 INGREDIENTS", image: img1 },
    { title: "Loaded Nachos", ingredients: "ADD 8 INGREDIENTS", image: img2 },
    { title: "Rum & Raisin Ice Cream", ingredients: "ADD 8 INGREDIENTS", image: img3 },
    { title: "Vanilla Choco Delight", ingredients: "ADD 8 INGREDIENTS", image: img4 },
    { title: "Berry Blast Smoothie", ingredients: "ADD 8 INGREDIENTS", image: img5 },
  ];

  return (
    <div className="mx-4 md:mx-12 lg:mx-20 my-12 lg:my-20 py-12 relative ">
      <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-12 text-center">
        Our Menu
      </h2>

      <div className="embla overflow-hidden relative" ref={emblaRef}>
        <div className="embla__container flex">
          {menuItems.map((item, index) => (
            <div key={index} className="embla__slide flex-[0_0_90%] md:flex-[0_0_45%] lg:flex-[0_0_30%] px-4">
              <Card className="relative w-full h-[350px] md:h-[400px] overflow-hidden shadow-lg rounded-lg bg-transparent group">
                {/* Container to make sure the image scales correctly */}
               
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    layout="fill" 
                    objectFit="cover" 
                    className="transition-transform duration-300 group-hover:scale-110 relative"
                  />
                

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4">
                  <h3 className="text-lg md:text-xl font-bold">{item.title}</h3>
                  <p className="text-sm">{item.ingredients}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-between items-center absolute top-1/2 -translate-y-1/2 w-full left-1 px-2 md:px-4">
          <button 
            onClick={scrollPrev} 
            disabled={!canScrollPrev}
            className={`bg-primary text-white hover:bg-green-600 p-3 rounded-full shadow-lg cursor-pointer font-bold ${!canScrollPrev ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            ←
          </button>
          <button 
            onClick={scrollNext} 
            disabled={!canScrollNext}
            className={`bg-primary text-white font-bold hover:bg-green-600 cursor-pointer p-3 rounded-full shadow-lg ${!canScrollNext ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            →
          </button>
        </div>
      </div>

      {/* View Menu Button */}
      <div className="mt-12 flex justify-center">
        <Link href='/allmenu'><Button className="px-12 py-6 text-lg md:text-xl bg-primary cursor-pointer">Explore Full Menu →</Button></Link>
      </div>
    </div>
  );
}
