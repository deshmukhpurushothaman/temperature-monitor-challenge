# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package.json package-lock.json ./

# Install any dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the React app for production
RUN npm run build

# Serve the app using a static server
RUN npm install -g serve

# Expose port 3000 to the outside world
EXPOSE 3000

# Set the command to run the app
# CMD ["serve", "-s", "build", "-l", "3000"]
CMD ["npm", "run", "start"]

