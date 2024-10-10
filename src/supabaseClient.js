import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yredppkwapkumzqxyywj.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyZWRwcGt3YXBrdW16cXh5eXdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc4MTk5MTYsImV4cCI6MjA0MzM5NTkxNn0.lVHGxx8z8Btge9D5LiPzYBKjYh1ajQJKcoa5q9YeB54";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
