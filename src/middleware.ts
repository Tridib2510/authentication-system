import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request:NextRequest){
    // We have couple of path that are public paths
    // like login and signup. If somebody as token
    // we should not be able to access those paths
    // and there are something like protected paths
    // which can not be accessed by people that are not
    // logged in
   
    const path=request.nextUrl.pathname
    const isPublicPath=path==='/login' || path==='signup'//This path should not be visible to people that has the token

   const token= request.cookies.get('token')?.value||''

   if(isPublicPath && token){
    // 	Performs a server-side HTTP redirect 
    // (e.g., 302 or 301 status code) that 
    // instructs the browser to navigate 
    // immediately to a new URL, 
    // before rendering page content.
    //unlike router.push() which
    	// Performs a server-side HTTP redirect 
        // (e.g., 302 or 301 status code) that 
        // instructs the browser to navigate 
        // immediately to a new URL, before 
        // rendering page content.
      return NextResponse.redirect(new URL('/',request.nextUrl))
  

  
    }
    
//  If the url is not public and the token is not there
// then we should login first
    if(!isPublicPath && !token){
    return NextResponse.redirect(new URL('/login',request.nextUrl))
}


}

// See 'Matching Paths' below to learn more
export const config={
    matcher:[
        '/',
        '/profile',
        '/login',
        '/signup'
    ]
}