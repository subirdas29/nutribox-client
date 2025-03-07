
import Image from "next/image";

import breakfast from '../../../../assets/menu/img1.jpg'
import brunch from '../../../../assets/menu/img2.jpg'
import lunch from '../../../../assets/menu/img3.jpg'
import snack from '../../../../assets/menu/img4.jpg'
import dinner from '../../../../assets/menu/img5.jpg'
import dessert from '../../../../assets/menu/img6.jpg'

export default function MealPicker() {

  return (
    <div className=" bg-green-100 py-20 my-20 px-4 sm:px-6 lg:px-8 ">
      <div className="mx-4 md:mx-12 lg:mx-20">
        <h1 className="text-3xl font-bold text-center mb-8">
          Pick Your Meal
        </h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 transition-colors cursor-pointer ">
          {/* Image with Hover Effect */}
          <div className="relative group">
            <Image
              src={breakfast}
              width={500}
              height={500}
              alt="Picture of the breakfast"
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg rounded-lg"
            />
          </div>

          <div className="relative group">
            <Image
              src={brunch}
              width={500}
              height={500}
              alt="Picture of the brunch"
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg rounded-lg"
            />
          </div>

          <div className="relative group">
            <Image
              src={lunch}
              width={500}
              height={500}
              alt="Picture of the lunch"
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg rounded-lg"
            />
          </div>

          <div className="relative group">
            <Image
              src={snack}
              width={500}
              height={500}
              alt="Picture of the snack"
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg rounded-lg"
            />
          </div>

          <div className="relative group">
            <Image
              src={dinner}
              width={500}
              height={500}
              alt="Picture of the dinner"
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg rounded-lg"
            />
          </div>

          <div className="relative group">
            <Image
              src={dessert}
              width={500}
              height={500}
              alt="Picture of the dessert"
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
