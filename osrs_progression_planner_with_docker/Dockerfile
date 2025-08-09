
# Build frontend
FROM node:18-alpine AS frontend
WORKDIR /app/frontend
COPY frontend/package.json ./
RUN npm i
COPY frontend/ ./
RUN npm run build

# Backend stage
FROM node:18-alpine
WORKDIR /app/backend
COPY backend/package.json ./
RUN npm i
COPY backend/ ./

# Copy built frontend into backend/public
RUN mkdir -p /app/backend/public && rm -rf /app/backend/public/*
COPY --from=frontend /app/frontend/dist/ /app/backend/public/

EXPOSE 5000
CMD ["npm", "start"]
