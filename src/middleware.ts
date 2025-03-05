import { NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "./services/AuthService"

type Role = keyof typeof roleBasedPrivateRoutes

const authRoutes = ["/login","/register"] //egula private route na

const roleBasedPrivateRoutes = {
    customer:[/^\/customer/],
    mealprovider:[/^\/mealprovider/]
}

export const middleware = async(request:NextRequest)=>{
    const {pathname}= request.nextUrl;
    const userInfo = await getCurrentUser()
    if(!userInfo){
        if(authRoutes.includes(pathname)){
            return NextResponse.next()
        }
        else{
            return NextResponse.redirect(new URL(`http://localhost:3000/login?redirectPath=${pathname}`,request.url))
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
        "/customer/:page"
    ] // jei route e ae middleware ta tigger krbe ta diya hyse. egula private route
}
