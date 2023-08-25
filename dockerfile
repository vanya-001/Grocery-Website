FROM node:14 AS frontend
FROM node:14 AS backend

WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json ./
RUN npm install
COPY backend/ ./

FROM node:14

WORKDIR /app
COPY --from=frontend /app/frontend/build ./frontend
COPY --from=backend /app/backend ./
EXPOSE 5000
CMD ["npm", "start"]
