import AllMenu from '@/components/modules/AllMenu'
import { getAllMeals } from '@/services/Meals'
import React from 'react'

type TSearchParams = 
  Promise<{
    page:string, [key:string]:string | string[] | undefined}>
  


const AllMenuPage = async({searchParams}:{searchParams:TSearchParams}) => {
  const query = await searchParams
  const {data, meta } = await getAllMeals(query.page,'6',query)



  return (
    <div>
      <AllMenu menu = {data} meta={meta}/>
    </div>
  )
}

export default AllMenuPage
