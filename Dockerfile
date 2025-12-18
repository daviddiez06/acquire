# Imagen base con Node 22
FROM node:22-slim

# Directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar manifiestos primero para cachear dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci --omit=dev

# Copiar el resto del código
COPY . .

# El servicio Acquire escucha en 3001
EXPOSE 3001

# Comando de arranque
CMD ["node", "server.js"]
