import {  formAction$, valiForm$ } from "@modular-forms/qwik";


import { createClient } from "../utils/server";
import { RegisterForm, RegisterSchema } from "../types/types";

type ResponseData = {
  userId: any;
};
export const useSignUp = formAction$<RegisterForm, ResponseData>(
  async (values,headers) => {
      const origin = headers.headers.get("origin");
      const email = values.email;
      const password = values.password;
      const name = values.name;
      const phone =   values.phone;   
      const company_name = values.companyName;   
      
      const supabase = createClient(headers.cookie, headers.env);
    
      const { error ,data} = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/callback`,
      data: {
        name,
        phone,
        company_name
      },
    },
  });

  if(error){
    return {
      status: 'error',
      message: error?.message || 'An error has occurred.',
      data: { userId: ''}
    };
  }

  if(data.user?.identities?.length === 0){ 
    return {
      status: 'error',
      message: `The provided email address is already registered. Please use a different email or proceed to login`,
      data: { userId: data.user?.id}
    };
  }

    
  if(data.user){ 
    return {
      status: 'success',
      message: `Congratulations! You have successfully registered. Please check your ${values.email} for a confirmation link.`,
      data: { userId: values}
    };
  }


 
  
  },
  valiForm$(RegisterSchema)
);


