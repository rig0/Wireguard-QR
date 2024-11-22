# Use an official Node.js runtime as a base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Node.js dependencies#
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port on which the app will run
EXPOSE 5182

# Command to run application
CMD ["node", "app.js"]