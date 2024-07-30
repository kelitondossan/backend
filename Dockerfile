# Etapa de build
FROM node:14 as build

WORKDIR /app

# Copia os arquivos package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código
COPY . .

# Compila o TypeScript
RUN npm run build

# Etapa de produção
FROM node:14

WORKDIR /app

# Copia as dependências instaladas e os arquivos compilados
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Define as variáveis de ambiente
ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000

# Inicia a aplicação
CMD ["node", "dist/app.js"]
