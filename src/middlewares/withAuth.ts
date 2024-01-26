import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextRequest,
  NextResponse,
  NextMiddleware,
} from "next/server";

const onlyAdmin = ["admin"];
const authPage = ["auth"];

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = []
) {
  return async (req: NextRequest, event: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname.split("/")[1];

    if (requireAuth.includes(pathname)) {
      const token = await getToken({
        req,
        secret: process.env.NEXT_AUTH_SECRET,
      });
      console.log(token);

      // if user not yet login, and user not on auth page, it will redirect to login page
      if (!token && !authPage.includes(pathname)) {
        // if user not yet login, it will redirect to login page
        const url = new URL("/auth/login", req.url);

        // if user do login, it will call callbackUrl, redirect to page before it
        url.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(url);
      }

      if (token) {
        // if user have the token (logged), auth page will not accessable
        if (authPage.includes(pathname)) {
          return NextResponse.redirect(new URL("/", req.url));
        }

        // if user have the token (logged), but the role is not admin and user use write admin pages, admin pages will not accessable, and it will redirect to / path
        if (token.role !== "admin" && onlyAdmin.includes(pathname)) {
          return NextResponse.redirect(new URL("/", req.url));
        }
      }
    }
    return middleware(req, event);
  };
}
