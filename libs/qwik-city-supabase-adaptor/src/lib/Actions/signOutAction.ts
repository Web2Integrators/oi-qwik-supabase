import { globalAction$ } from '@builder.io/qwik-city';
import { createClient } from '../utils/server';

 
export const useSignOut = globalAction$(async (_data, event) => {
    const supabase = createClient(event.cookie, event.env);
    await supabase.auth.signOut();
    throw event.redirect(302, '/');
  });