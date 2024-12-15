import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://lgslhvojlkmozqxwxwog.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxnc2xodm9qbGttb3pxeHd4d29nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg3MzQ0MTEsImV4cCI6MjA0NDMxMDQxMX0.ZEveNnUaVFxTaZLQ3ZkUcJeUP5GDaGfKuOpvI89dlz0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
