'use server'

import { revalidatePath } from 'next/cache'

import { createClient } from '@/utils/supabase/server'



export async function login(values: { email: string; password: string; }) {
    const supabase = await createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: values.email as string,
        password: values.password as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        return error.message;
    }

    revalidatePath('/', 'layout')
    return "success";
}