import type { Cookie } from "@builder.io/qwik-city";
import type { EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";
import { createServerClient, type CookieOptions } from "@supabase/ssr";


export const createClient = (cookie: Cookie,env: EnvGetter) => {
 

  return createServerClient(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    env.get('PUBLIC_SUPABASE_URL')!,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    env.get('PUBLIC_SUPABASE_ANON_KEY')!,
    {
      cookies: {
        get(name: string) {
          return cookie.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookie.set(name, value, { ...options });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookie.set(name,  "", {...options });
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
};
