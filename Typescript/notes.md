# 1. Create a Node.js project configuration file (package.json)
npm init -y

# 2. Install TypeScript as a development dependency
npm install --save-dev typescript

# 3. Create the required tsconfig.json configuration file
npx tsc --init

# 4. keep compiling the typescript file whenever we made changes
tsc --watch

