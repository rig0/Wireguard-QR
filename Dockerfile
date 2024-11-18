# Use an official Node.js runtime as a base image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/wireguard-qr

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Node.js dependencies#
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port on which the app will run
EXPOSE 5182

# Install pm2
RUN npm install pm2 -g && pm2 install pm2-logrotate

# Command to run application
CMD ["pm2-runtime", "start", "index.js", "--name", "wireguard-qr"]