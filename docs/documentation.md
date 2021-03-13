# Documentação da API

A api foi construida a especificação REST em mente, orientado a recursos, utilizando verbos e códigos padrões HTTP.

## Recursos

Os recursos da API são:

- Users
- Surveys
- Answers

### User

```json
{
	"id": "UUID4",
	"firstName": "string",
	"lastName": "string",
	"email": "email",
	"createdAt": "ISO 8601"
}
```

- `POST /users`

	Cria um novo `User`.

### Survey

```json
{
	"id": "UUID4",
	"title": "string",
	"description": "string",
	"createdAt": "ISO 8601"
}
```

- `POST /surveys`

	Cria uma nova `Survey`.

- `GET /surveys?title=null&des=null&page=1`

	Busca uma lista de `Surveys` por título ou descrição com paginação por 20 elementos.

- `POST /surveys/:id/send`

	Envia uma `Survey` para uma lista de `Users` previamente criados.

### Answer

```json
{
	"id": "UUID4",
	"surveyId": "UUID4",
	"userId": "UUID4",
	"answer": 10,
	"createdAt": "ISO 8601"
}
```

- `PUT /answers/:id`

	Atribui resposta a uma `Answer`.

- `GET /answers/:id/nps`

	Retorna o resultado do calculo de NPS.
