# Stage 1: Build the frontend
FROM node:14 AS frontend

# Set the working directory for the frontend
WORKDIR /app/frontend

# Copy the frontend package.json and package-lock.json
COPY frontend/package.json frontend/package-lock.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend code
COPY frontend/ ./

# Build the frontend
RUN npm run build

# Stage 2: Build the backend
FROM node:14 AS backend

# Set the working directory for the backend
WORKDIR /app/backend

# Copy the backend package.json and package-lock.json
COPY backend/package.json backend/package-lock.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend code
COPY backend/ ./

# Stage 3: Combine frontend and backend
FROM node:14

# Create app directory
WORKDIR /app

# Copy the built frontend from the frontend stage
COPY --from=frontend /app/frontend/build ./frontend

# Copy the backend code from the backend stage
COPY --from=backend /app/backend ./

# Expose backend port
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]
