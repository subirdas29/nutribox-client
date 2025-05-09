import { NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "./services/AuthService"

type Role = keyof typeof roleBasedPrivateRoutes

const authRoutes = ["/login","/register"] 

const roleBasedPrivateRoutes = {
    customer:[/^\/customer/,/^\/orderdetails/,/^\/ordermeal/],
    mealprovider:[/^\/mealprovider/,/^\/orderdetails/,/^\/ordermeal/]
}

export const middleware = async(request:NextRequest)=>{
    const {pathname}= request.nextUrl;
    const userInfo = await getCurrentUser()
    if(!userInfo){
        if(authRoutes.includes(pathname)){
            return NextResponse.next()
        }
        else{
            return NextResponse.redirect(new URL(`https://nutribox-client.vercel.app/login?redirectPath=${pathname}`,request.url))
        }
    }
    if(userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as Role]){
        const routes = roleBasedPrivateRoutes[userInfo?.role as Role]
        if(routes.some(route => pathname.match(route))){
            return NextResponse.next()
        }
    }

    return NextResponse.redirect(new URL('/',request.url))

}

export const config = {
    matcher:[
        "/login",
        "/mealprovider",
        "/mealprovider/:page",
        "/customer",
        "/customer/:page",
        "/orderdetails",
        "/orderdetails/:page",
        "/ordermeal",
        "/ordermeal/:page"
    ] 
}
