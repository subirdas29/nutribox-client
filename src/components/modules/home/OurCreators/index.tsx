import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

const creators = [
  {
    name: "Anthony Serrano",
    specialty: "Mexican and Italian cuisine, grilling & BBQ",
    image: "https://res.cloudinary.com/dsgnwjmlv/image/upload/v1741850824/austin-distel-7uoMmzPd2JA-unsplash_a3knhf.jpg",
    tagline: "Upscale Made Easy",
  },
  {
    name: "Meiko and the Dish",
    specialty: "Classic comfort foods like fried chicken and midwestern cobblers",
    image: "https://res.cloudinary.com/dsgnwjmlv/image/upload/v1741850907/christina-wocintechchat-com-0Zx1bDv5BNY-unsplash_xqilod.jpg",
    tagline: "Tasty Easy Recipes",
  },
  {
    name: "Lauren Holdcroft at SideChef",
    specialty: "Breakfast for any meal, eye-watering comfort food",
    image: "https://res.cloudinary.com/dsgnwjmlv/image/upload/v1741851041/mohamed-nohassi-DdglEoIC2y4-unsplash_zwhi8i.jpg",
    tagline: "Happy Comfort Food",
  },
  {
    name: "Lady and Pups",
    specialty: "Asian Fusion, an angry food blog and misery outlet",
    image: "https://res.cloudinary.com/dsgnwjmlv/image/upload/v1741851131/amy-hirschi-b3AYk8HKCl0-unsplash_e4ffw9.jpg",
    tagline: "Asian Fusion",
  },
  {
    name: "The Edgy Veg",
    specialty: "Revolutionizing the food we define as 'vegan'",
    image: "https://res.cloudinary.com/dsgnwjmlv/image/upload/v1741851544/michael-dam-mEZ3PoFGs_k-unsplash_m1j3xg.jpg",
    tagline: "The New 'Vegan'",
  },
  {
    name: "Chef Ramirez",
    specialty: "Gourmet Latin American cuisine with a modern twist",
    image: "https://res.cloudinary.com/dsgnwjmlv/image/upload/v1741851363/rc-cf-FMh5o5m5N9E-unsplash_gsa59d.jpg",
    tagline: "Modern Latin Flavors",
  }
];

export default function MeetOurCreators() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "center", loop: false });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;
    const updateScrollButtons = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };
    emblaApi.on("select", updateScrollButtons);
    updateScrollButtons();
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi && canScrollPrev) emblaApi.scrollPrev();
  }, [emblaApi, canScrollPrev]);

  const scrollNext = useCallback(() => {
    if (emblaApi && canScrollNext) emblaApi.scrollNext();
  }, [emblaApi, canScrollNext]);

  return (
    <section className=" py-12 px-6 text-center my-12 lg:my-20 ">
      <h2 className="text-4xl font-bold text-green-900">Meet Our Creators</h2>
      <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
        Meet our community of culinary experts, food bloggers to masterchefs from across the globe.
      </p>
      <div className="relative mx-4 md:mx-12 lg:mx-20 ">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
          {creators.map((creator, index) => (
  <Card
    key={index}
    className="min-w-[300px] bg-white shadow-lg rounded-2xl overflow-hidden transition transform hover:scale-105 hover:shadow-xl"
  >
    <CardContent className="p-6 flex flex-col items-center text-center">
      <Avatar className="w-28 h-28 mb-4 rounded-full border-4 border-green-500 shadow-md">
        <AvatarImage src={creator.image} alt={creator.name} />
      </Avatar>
      <h3 className="text-2xl font-semibold text-black">{creator.name}</h3>
      <p className="italic text-gray-600 text-sm">{creator.tagline}</p>
      <p className="text-gray-800 text-sm mt-3">{creator.specialty}</p>
    </CardContent>
  </Card>
))}

          </div>
        </div>
        <button
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 px-4 py-2 rounded-full shadow-md ${canScrollPrev ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
        >
          ◀
        </button>
        <button
          onClick={scrollNext}
          disabled={!canScrollNext}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 px-4 py-2 rounded-full shadow-md ${canScrollNext ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
        >
          ▶
        </button>
      </div>
    </section>
  );
}