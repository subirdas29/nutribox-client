


const UpdateMealPage = async({params}:{params:Promise<{mealId:string}>}) => {
    

    const {productId} = await params

    console.log(productId)

    // const {data:product} = await getSingleProduct(productId)
   
  return (
    <div className="flex justify-center items-center">
      <UpdateMealForm product={product}/>
    </div>
  )
}

export default UpdateMealPage
