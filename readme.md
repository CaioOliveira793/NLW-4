# NLW-4

Aplicação desenvolvida na trilha Node durante a Next Level Week.

## Desafios

Desenvolver um servidor node para criação de pesquisas, envio de email para usuário e cálculo de NPS (Net Promoter Score).


## Desafios extras

Como desafio extra, decidi aplicar princípios SOLID, como teste dos conceitos e para consolidar meus estudos.
Por estes motivos, desenvolvi utilizando o framework [Nest.js](https://nestjs.com/) por ser mais opinado e trazer uma arquitetura modular.

## Como testar

### Pré-requisitos

Antes de começar, você vai precisar ter instalado as seguintes ferramentas:

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)
- [docker-compose](https://docs.docker.com/compose/)

### Testando

Com estas ferramentas instaladas, basta executar o seguinte comando.

```bash
docker-compose up -d
```

O docker irá criar imagens do node e postgres, criar seus containers e rodar o banco de dados e a aplicação em modo de desenvolvimento na porta 3000.

### Documentação

Confira a documentação [aqui](./docs/documentation.md)

## Tecnologias utilizadas

As tecnologias utilizadas foram:

- Node.js
- Typescript
- Nest.js
- Typeorm
- Nodemailer
- Yup
- Jest

# Licença

O projeto está sob licença [MIT](./LICENSE)
