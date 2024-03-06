# Use the official Node.js image as the base  
FROM node:20

# Set the working directory inside the container  
WORKDIR /app  

# Copy package.json and package-lock.json to the container  
COPY package*.json ./  

# Install dependencies  
RUN npm ci  

# Copy the app source code to the container  
COPY . .  

# Build the Next.js app  
RUN npx prisma generate
RUN npx prisma migrate deploy
RUN npm run build  


# Start the app  
CMD ["npm", "start"]  