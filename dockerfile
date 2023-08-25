# Build frontend stage
FROM node:14 AS frontend
WORKDIR /home/ubuntu/Grocery-Website/frontend
# Copy necessary files and build the frontend
COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm install
COPY ./frontend ./
RUN npm run build

# Build backend stage
FROM node:14 AS backend
WORKDIR /home/ubuntu/Grocery-Website/backend
# Copy necessary files and build the backend
COPY ./backend/package.json ./backend/package-lock.json ./
RUN npm install
COPY ./backend ./

# Main image
FROM node:14
WORKDIR /app
# Copy built artifacts from frontend and backend stages
COPY --from=frontend ./build ./frontend
COPY --from=backend ./backend ./backend
EXPOSE 5000
