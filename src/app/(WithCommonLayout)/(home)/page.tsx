import OrderPage from "@/components/modules/home/ImageData"
import ImageData from "@/components/modules/home/ImageData"
import Footer from "@/components/shared/Footer"
import Navbar from "@/components/shared/Navbar"

const CommonLayout = () => {
  return (
    <>
        <Navbar/>
    <OrderPage/>
      <Footer/>
    </>
  )
}

export default CommonLayout
