# Use the official Node.js image as a base
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend application code into the container
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port the app will run on (3000)
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "run", "start"]
