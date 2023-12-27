# How to install the project on your local system
1. Clone the repository 
    Most of you have already done the setup required for this (Configuring your SSH keys, connecting them to github, etc.).
2. Navigate to './src/client' and './src/admin' and run 'npm install' in each directory this will use your package.json file to install the dependencies needed for your project on your local system.
3. Note that the 'node_modules' folder created by 'npm install' will not be shared on the repo. There is a .git_ignore file at the root of the project which specifies that.

The reason for all of this is to prevent errors that might pop up when we share and try to run our project without excluding the 'node_modules' folder. 

# Connecting to supabase and configuring your database
1. Create a supbase account and create a project.
2. Copy your supabase url and your anon key from the project dashboard.
3. In both './src/client' and './src/admin' create a file called .env.local
4. Paste the following into .env.local
    NEXT_PUBLIC_SUPABASE_ANON_KEY="replace with your supabase anon key"
    NEXT_PUBLIC_SUPABASE_URL="replace with your supabase url"
5. Go to './db' and find the folder with 'latest' next to it.
6. Copy every query in schema.sql, policies.sql, functions.sql, triggers.sql in this order and execute it in the supabase query tool.

