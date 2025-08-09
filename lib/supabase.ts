import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type SubscriptionData = {
  full_name: string
  email: string
  phone: string
}

export async function saveSubscription(data: SubscriptionData) {
  const { data: result, error } = await supabase
    .from('subscriptions')
    .insert([
      {
        full_name: data.full_name,
        email: data.email,
        phone: data.phone
      }
    ])
    .select()

  if (error) {
    throw error
  }

  return result
}
