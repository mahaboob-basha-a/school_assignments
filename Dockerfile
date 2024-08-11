# Use the official Node.js 14 image as a parent image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or npm-shrinkwrap.json) files
COPY package*.json ./

# Install dependencies inside the container
RUN npm install

# Copy the rest of your application's source code from your host to your image filesystem.
COPY . .

# Rebuild sqlite3 module to ensure compatibility with the container's environment
RUN npm rebuild sqlite3 --build-from-source

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define the command to run your app using CMD which defines your runtime
CMD ["node", "app.js"]
