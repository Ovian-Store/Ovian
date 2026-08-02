import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qoaxfllggouxeceourlf.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvYXhmbGxnZ291eGVjZW91cmxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU2NTU3NjksImV4cCI6MjEwMTIzMTc2OX0.WPuCg4bQMhMRLIoyah0gHdDsXjsuNQPCYn5sRgc0KCM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
