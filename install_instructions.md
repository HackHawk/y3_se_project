# How to install the project on your local system
1. Clone the repository 
    Most of you have already done the setup required for this (Configuring your SSH keys, connecting them to github, etc.). Also, I recommend using SSH instead of http for cloning.
2. Navigate to './src/client' and './src/admin' and run 'npm install' in each directory this will use your package.json file to install the dependencies needed for your project on your local system.
3. Note that the 'node_modules' folder created by 'npm install' will not be shared on the repo. There is a .git_ignore file at the root of the project which specifies that.

The reason for all of this is to prevent errors that might pop up when we share and try to run our project without excluding the 'node_modules' folder. 
