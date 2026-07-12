import { NextResponse } from "next/server";

export function proxy() {
  const response = NextResponse.next();

  response.headers.set(
    "Accept-CH",
    "Sec-CH-UA-Mobile, Sec-CH-UA-Platform, Sec-CH-UA",
  );
  response.headers.set("Critical-CH", "Sec-CH-UA-Mobile");

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
