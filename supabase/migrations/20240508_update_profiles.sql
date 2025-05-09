-- Add email and bio columns to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS email VARCHAR(255) UNIQUE,
ADD COLUMN IF NOT EXISTS bio TEXT;

-- Update existing profiles with email from auth.users
UPDATE profiles p
SET email = u.email
FROM auth.users u
WHERE p.id = u.id
AND p.email IS NULL;

-- Update the handle_new_user function to include email
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.profiles (id, username, full_name, email)
    VALUES (
        new.id,
        new.email,
        new.raw_user_meta_data->>'full_name',
        new.email
    );
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 