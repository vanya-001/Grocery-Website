FROM node:14 AS frontend
FROM node:14 AS backend

WORKDIR /home/ubuntu/Grocery-Website/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

WORKDIR /home/ubuntu/Grocery-Website/backend
COPY backend/package.json backend/package-lock.json ./
RUN npm install
COPY backend/ ./

FROM node:14

WORKDIR /app
COPY --from=frontend /home/ubuntu/Grocery-Website/frontend/build ./frontend
COPY --from=backend /home/ubuntu/Grocery-Website/backend ./
EXPOSE 5000
CMD ["npm", "start"]
