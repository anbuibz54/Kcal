import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://zxvkcwhbfegzvmybpmwc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4dmtjd2hiZmVnenZteWJwbXdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc0Nzk0NDEsImV4cCI6MjAzMzA1NTQ0MX0.S5ICBGpp1j91E-6uG31juMhJDKnG0vcEvEvpXFIiWjE';
export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});
