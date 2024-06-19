import type { RequestEvent} from "@builder.io/qwik-city";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export const updateSession = async (requestEvent: RequestEvent) => {
  // This `try/catch` block is only here for the interactive tutorial.
  // Feel free to remove once you have Supabase connected.
 // console.log("updateSession", ev.request);
  try {
    
   
    const supabase = createServerClient(
      requestEvent.env.get("PUBLIC_SUPABASE_URL")!,
      requestEvent.env.get("PUBLIC_SUPABASE_ANON_KEY")!,
      {
        cookies: {
          get(name: string) {
            return requestEvent.cookie.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            // If the cookie is updated, update the cookies for the request and response
            requestEvent.cookie.set(name, value, { ...options });
          },
          remove(name: string, options: CookieOptions) {
            // If the cookie is removed, update the cookies for the request and response
            requestEvent.cookie.set(name, "", { ...options });
          },
        },
      },
    );

    // This will refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    await supabase.auth.getUser();

    return requestEvent.next();
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    // return NextResponse.next({
    //   request: {
    //     headers: request.headers,
    //   },
    // });
  }
};
