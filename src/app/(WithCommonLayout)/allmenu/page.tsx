import AllMenu from '@/components/modules/Menu/AllMenu'
import { getAllMeals } from '@/services/Meals'
import React from 'react'

const AllMenuPage = async() => {
  const {data} = await getAllMeals()
  console.log("Fetched Meals:", data);

  return (
    <div>
      <AllMenu menu = {data}/>
    </div>
  )
}

export default AllMenuPage
