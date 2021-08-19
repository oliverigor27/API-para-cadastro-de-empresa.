![Apresentação do jogo](https://github.com/Igoroliveira98/Igoroliveira98/blob/master/backgrounds/Captura%20de%20tela%20de%202021-04-12%2022-05-20.png)

# Users API 
 
**Download do Projeto:** 
```
https://github.com/Igoroliveira98/users-api.git
```

**Comando NPM para as dependências:**

```
npm install
```

**Script do servidor:**

```
npm run dev
```

**Comandos Knex.JS:**

```
Migrates: npx knex migrate:latest
Seeds: npx knex seed:run
```

## 🧔🏻👩🏾 Resumo: 

API contruída para o desafio backend da player2. O objetivo é que um usuário cadastre, empresas em uma aplicação. 

## 🖥 Linguagem, pacotes e ferramentas utilizadas:

- JavaScript
- PostgreSQL
- Docker
- NodeJS
- ExpressJS
- KnexJS
- Dotenv
- BcryptJS
- Axios
- JSON Web Token


## 📋 Especificações:

**Backend**

- Arquivo de configuração do Knex.js
- Pasta controller contendo os controllers do usuário e da empresa. 
- Pasta database contentdo as migrations e seeders.
- Pasta config com as credenciais para acesso ao banco de dados.
- Um arquivo de rotas.
- Um arquivo server com as configurações do express e cors.
- Pasta de middleware com tratamento de erro e função JWT para autenticação.


## ⚙️Configurações do projeto:

É necessário criar na pasta raiz um arquivo .env para passar as credenciais de acesso ao Banco de Dados com seguites informações:

```
DB_HOST= caso esteja usando docker, passar o host para acesso ao container
DB_NAME= nome dado ao baco de dados. Ex: admin
DB_USER= nome de usuário para acessar o banco de dados
DB_PASS= senha de acesso ao banco de dados
```

Obs: caso desejar utilizar outro banco de dados, alterar no Knexfile o "client" para o DB desejado.


