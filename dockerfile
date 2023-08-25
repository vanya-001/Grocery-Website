# Use the official Node.js image as the base image for both frontend and backend
FROM node:14 AS frontend
FROM node:14 AS backend

# Set the working directory for frontend and copy the frontend package.json and package-lock.json
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./

# Install frontend dependencies
RUN npm install

# Set the working directory for backend and copy the backend package.json and package-lock.json
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the frontend and backend code
WORKDIR /app
COPY . .

# Build the frontend
RUN cd frontend && npm run build

# Combine frontend and backend images
FROM node:14

# Create app directory
WORKDIR /app

# Copy the built frontend from the previous stage
COPY --from=frontend /app/frontend/build ./frontend

# Copy the backend code from the previous stage
COPY --from=backend /app/backend ./

# Expose backend port
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]
