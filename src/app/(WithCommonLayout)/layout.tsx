import Footer from '@/components/shared/Footer'
import { Navbar } from '@/components/shared/Navbar';
import { getMe } from '@/services/User';

import React from 'react'

const CommonLayoutPage = async({children}: {
    children: React.ReactNode;
  }) => {

    const {data} = await getMe()
    
  return (
    <div>
      <Navbar userData={data}/>
      {children}
      <Footer/>
    </div>
  )
}

export default CommonLayoutPage
