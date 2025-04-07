import AllMenu from '@/components/modules/Menu/AllMenu'
import { getAllMeals } from '@/services/Meals'
import React from 'react'

const AllMenuPage = async({searchParams}:{searchParams:Promise<{page:string}>}) => {
  const {page} = await searchParams
  const {data, meta } = await getAllMeals(page,'7')



  return (
    <div>
      <AllMenu menu = {data} meta={meta}/>
    </div>
  )
}

export default AllMenuPage
