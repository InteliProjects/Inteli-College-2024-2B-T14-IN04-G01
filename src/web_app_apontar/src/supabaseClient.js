import { createClient } from "@supabase/supabase-js";


export const supabase= createClient(
    "https://gywdcrrdbjpqccnqrjkn.supabase.co",
   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5d2RjcnJkYmpwcWNjbnFyamtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3MzI5NzksImV4cCI6MjA0ODMwODk3OX0.OCD_5Lx0Gzj_reMJySi3rSWt_G5M2AaA2ervq83aTK8"
    )