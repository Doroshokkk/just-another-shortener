# Use an official Node.js runtime as a base image
FROM node:18

# Set the working directory within the container
WORKDIR /usr/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy all application files to the container
COPY . ./

# Expose the port that the application runs on
EXPOSE 3000

# Command to start the application
CMD ["npm", "run", "dev"]
