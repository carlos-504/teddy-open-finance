# TEDDY-OPEN-FINANCE-API

## Descrição

A API é uma aplicação RESTful desenvolvida em Node.js 17, utilizando o framework NestJS e o ORM TypeORM para interagir com um banco de dados PostgreSQL. O principal propósito da API é encurtar e gerenciar URLs, permitindo operações CRUD (Create, Read, Update, Delete) sobre elas, além de fornecer funcionalidades para criação de usuários e autenticação. 
A API segue uma arquitetura modular e escalável, baseada em conceitos de injeção de dependência e separação de preocupações. Utiliza os padrões de design RESTful para definir endpoints e manipular recursos de forma eficiente. Além disso, adota práticas de segurança recomendadas, como autenticação de usuário com tokens JWT (JSON Web Tokens) para proteger rotas sensíveis.

## Pré-requisitos para o setup:

Baixe na sua máquina as seguintes dependências:

- Docker
- Docker compose

## Instalação

1. Baixe o diretório para sua máquina

```
git clone https://github.com/carlos-504/clear-sale-challenge.git
```

2. Crie o arquivo de variáveis (.env) e copie o conteúdo dos arquivos .env.example para o mesmo

3. Para iniciar a aplicação

```
docker compose up
```

## REST API

O sistema conta com uma API para realizar os CRUDS. A API segue o protocolo Rest de comunicação,
onde é possível realizar uma comunicação com o servidor para obter, incluir ou remover.

**Obs.:** Ao utilizar a API, envie sempre os cabeçalhos obrigatórios:

    "Accept: application/json
    "Content-Type: application/json"

### API Endpoints

| Ação                                                  | Método de requisição | Endpoint        | Request Body                                  | Retorno                                            |
| ----------------------------------------------------- | -------------------- | --------------- | --------------------------------------------- | -------------------------------------------------- |
| Encurta e insere uma url na base de dados             | POST                 | /url            | url: string                                   | nova url inserida e encurtada                      |
| Lista de urls                                         | GET (Auth Bearer)    | /url            |                                               | lista de urls cadastradas pelo usuário autenticado |
| Redireciona para a url original e contabiliza o click | GET (Auth Bearer)    | /url/redirect   |                                               | null                                               |
| Atualiza url do usuário                               | PUT (Auth Bearer)    | /url/{id}       | url: string                                   | url do usuário atualizado                          |
| Exclui logicamente uma url                            | DELETE (Auth Bearer) | /url/{id}       |                                               | mensagem de sucesso                                |
| Cria um usuário                                       | POST                 | /user           | name: string, email: string, password: string | usuário inserido                                   |
| Autentica um usuário                                  | POST                 | /authentication | email: string, password: string               | token JWT                                          |

### Link da documentação Swagger

http://localhost:3000/api

### Arquivos importantes

Use o Insomnia_2024-05-03.json (raiz do diretório) em seu ambiente de testes para criar o diretórios com os endpoint
