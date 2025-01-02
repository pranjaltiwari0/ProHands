import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lipvuimbxsxcavprfvit.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpcHZ1aW1ieHN4Y2F2cHJmdml0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUwMjQxOTMsImV4cCI6MjA1MDYwMDE5M30.YrTrqXThjKz3qHXcs5XhWW9uwD6RyRKS0y4s4y8D5gg'

export const supabase = createClient(supabaseUrl, supabaseKey) 