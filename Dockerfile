# Use official Node.js Alpine image
FROM node:22-bullseye

# Install required packages for Chromium to run
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-liberation \
    ca-certificates \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Copy dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production

# Copy app code (frontend + backend)
COPY frontend ./frontend
COPY . .

# Expose the server port
EXPOSE 4000

# Run server with dumb-init (to handle signals properly in Docker)
CMD ["node", "server.js"]
