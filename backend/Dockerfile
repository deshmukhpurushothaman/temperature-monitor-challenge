FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Default environment variable (can be overridden)
ENV PORT=8000

# Expose the port that the app will use (this should match your app's `process.env.PORT`)
EXPOSE ${PORT}

# Run the application
CMD ["npm", "run", "start"]
