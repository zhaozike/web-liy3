import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 代理Supabase客户端（用于Suna AI认证）
const proxySupabaseUrl = process.env.PROXY_SUPABASE_URL || ''
const proxySupabaseAnonKey = process.env.PROXY_SUPABASE_ANON_KEY || ''

export const proxySupabase = proxySupabaseUrl && proxySupabaseAnonKey 
  ? createClient(proxySupabaseUrl, proxySupabaseAnonKey)
  : null

