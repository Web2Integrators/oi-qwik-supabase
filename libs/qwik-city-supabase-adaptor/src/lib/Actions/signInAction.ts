import {  formAction$, valiForm$, } from "@modular-forms/qwik";


import { createClient } from "../utils/server";
import { SignInForm, SignInSchema } from "../types/types";

type ResponseData = {
  userId: any;
};
export const useSignIn = formAction$<SignInForm,ResponseData>(
  async (values,headers) => {
      
      const email = values.email;
      const password = values.password;
      
      const supabase = createClient(headers.cookie, headers.env);
      const { error ,data} = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if(data.user){ 
    return {
      status: 'success',
      message: `You have signed in successfully`,
      data: { userId: values},
      
    };
   
  }
  if(error){
    switch (error?.message) {
      case 'Invalid login credentials':
        error.message = error?.message + ' or Please Register'
        break;
        case 'Email not confirmed':
          error.message = 'Your email address is not yet verified. Please check your email for a confirmation link or register again'
          break;
      default:
        break;
    }
    return {
      status: 'error',
      message: error?.message || 'An error has occurred.',
    };
  }
  
  // Add a return statement here
  return {
    status: 'error',
    message: 'An error has occurred.',
  };
  },
  valiForm$(SignInSchema)
);


