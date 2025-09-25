# [Giro - Sistema de Gerenciamento Ágil de Processos](https://giro.jenn-ms.site)


**Giro** é um sistema de gerenciamento visual de processos ágeis, projetado para equipes que precisam se organizar forma eficiente.  
A aplicação combina um **frontend moderno em Angular 20**, **backend em Express**, **banco PostgreSQL** com **Prisma ORM**, tudo rodando de forma integrada em **Docker**.

---

## 🚀 Tecnologias

- **Frontend:** Angular 20
- **Backend:** Node.js + Express
- **Banco de Dados:** PostgreSQL
- **ORM:** Prisma
- **Containerização:** Docker + Docker Compose

---

## 📂 Estrutura do Projeto

giro/

├── backend/ # API Express + Prisma

├── frontend/ # Aplicação Angular

├── docker-compose.yml

└── README.md

---

## ⚙️ Pré-requisitos

Antes de começar, você precisa ter instalado:

- [Node.js >= 18](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/) ou [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) + [Docker Compose](https://docs.docker.com/compose/)

---

## 🔧 Instalação com Docker

### 1. Clonar o repositório

```bash
git clone https://github.com/jensilva/giro.git
cd giro

docker-compose up --build

```
O sistema ficará disponível em:

- Frontend: http://localhost:8080
- Backend: http://localhost:3000


## 🛠️ Instalação sem Docker

### Banco de dados
**1. Instalar qualquer banco de dados SQL**
ex: [Postgree](https://www.postgresql.org/download/)

**2. Configurar variáveis de ambiente**

No diretório `backend/`, crie um arquivo `.env` baseado: 

```bash
DATABASE_URL="" #exemplo: postgresql://user:password@db:5432/giro (Importante manter o giro pois é o nome da DB)
PORT= #exemplo: 3000 
```

### Backend

```bash
yarn

yarn prisma generate

yarn prisma deploy

yarn dev ## inicia servidor Express em modo desenvolvimento

## OU 

npm install

npm run prisma generate

npm run prisma deploy

npm run dev

```

### Frontend

```bash

yarn

yarn start ## inicia o Angular em modo dev 

## OU 

npm install

npm start
```

## 📌 Roadmap

- Autenticação de usuários com JWT
- Gerenciamento de pessoas, equipes e projetos
- Quadros visuais (Kanban)


## 📜 Licença
Este projeto é distribuído sob a licença MIT.
