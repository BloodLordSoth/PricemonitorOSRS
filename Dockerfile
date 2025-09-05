FROM node:22-alpine
COPY package*.json ./
RUN npm install --only=production
COPY frontend ./
COPY . .
EXPOSE 4000
CMD ["node", "server.js"]