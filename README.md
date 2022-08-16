# newsletter-api
Api simples para cadastro de usuários em uma newsletter

### Stack utilizada:

![Nodejs](https://img.shields.io/badge/-Nodejs-black?style=flat-square&logo=Node.js)
![Typescript](https://img.shields.io/badge/-TypeScript-black?style=flat-square&logo=typescript)
![MongoDB](https://img.shields.io/badge/-MongoDB-black?style=flat-square&logo=mongodb)

User
```{
		name: String,
		email: {
			type: String,
			required: true,
		},
		subscribed: {
			type: Boolean,
			default: true,
		},
	},
  ```
Unsub
```{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		reason: String,
	},
  ```

Rotas:
<br><br>
`POST: /user` Adiciona um novo usuário para a collection de usuários
<br><br>
`POST: /user/unsubscribe` Altera o valor de subscribed para false e cria um novo registro na collection de unsubs, com o _id do usuário e um possível motivo para o descadastramento da newsletter.
<br><br>
`GET: /user` Lista todos os usuários cadastrados
