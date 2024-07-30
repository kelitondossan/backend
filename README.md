# Backend - Controle de Pontos

Este projeto é uma aplicação backend para controle de pontos de entrada e saída de usuários, incluindo intervalos de almoço. Ele foi desenvolvido utilizando TypeScript, Express, TypeORM e PostgreSQL (ou MySQL, dependendo da configuração).

## Funcionalidades

- **Autenticação de Usuários**
  - Registro e login de usuários
  - Geração de tokens JWT para autenticação

- **Controle de Pontos**
  - Início e término de turnos
  - Início e término de intervalos de almoço
  - Consulta de turnos de um usuário

## Tecnologias

- **Node.js** - Ambiente de execução JavaScript
- **Express** - Framework para construção de APIs
- **TypeScript** - Superset do JavaScript que adiciona tipagem estática
- **TypeORM** - ORM para TypeScript e JavaScript
- **bcryptjs** - Biblioteca para hashing de senhas
- **jsonwebtoken** - Biblioteca para geração e verificação de tokens JWT
- **PostgreSQL / MySQL** - Sistemas de gerenciamento de banco de dados

## Instalação

1. **Clone o Repositório**

   ```bash
 

Instale as Dependências

bash
Copiar código
npm install
Configure as Variáveis de Ambiente

Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

env
Copiar código
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=root
DB_NAME=pointdb
PORT=3000
JWT_SECRET=your_jwt_secret
Inicie o Servidor

bash
Copiar código
npm start
O servidor será iniciado na porta especificada (padrão: 3000).

Endpoints
Autenticação
POST /auth/register

Registra um novo usuário.

Corpo da Requisição:

json
Copiar código
{
  "username": "string",
  "password": "string"
}
Resposta:

json
Copiar código
{
  "token": "string",
  "userId": "number"
}


POST /points/start-shift

Inicia um turno para um usuário.

Corpo da Requisição:

json
Copiar código
{
  "userId": "number"
}
Resposta:

json
Copiar código
{
  "id": "number",
  "startTime": "timestamp",
  "lunchStartTime": "null",
  "lunchEndTime": "null",
  "endTime": "null",
  "user": {
    "id": "number",
    "username": "string",
    "password": "string",
    "points": "number"
  }
}
POST /points/end-shift

Encerra o turno de um usuário.

Corpo da Requisição:

json
Copiar código
{
  "userId": "number"
}
Resposta:

json
Copiar código
{
  "id": "number",
  "startTime": "timestamp",
  "lunchStartTime": "timestamp",
  "lunchEndTime": "timestamp",
  "endTime": "timestamp",
  "user": {
    "id": "number",
    "username": "string",
    "password": "string",
    "points": "number"
  }
}



Estrutura do Projeto
src/controllers: Controladores para manipular a lógica de negócios e responder às requisições.
src/entities: Entidades do TypeORM representando tabelas no banco de dados.
src/middleware: Middleware para autenticação e outras funcionalidades.
src/routes: Definição das rotas da API.
src/utills: Utilitários e configuração do banco de dados.
src/index.ts: Arquivo principal para inicializar o servidor.