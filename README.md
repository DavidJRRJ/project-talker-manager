
# Talker Manager API

Projeto desenvolvido durante o módulo de back-end do curso da [Trybe](https://betrybe.com/).

Neste projeto foi desenvolvida uma API de cadastro de palestrantes, onde é possível cadastrar, visualizar, editar e excluir informações.

Os objetivos deste projeto foram:
>* Desenvolver uma API de um CRUD (Create, Read, Update e Delete) de palestrantes
>* Desenvolver alguns endpoints que irão ler e escrever em um arquivo utilizando o módulo fs


## Rodando a aplicação com o Docker

Clone o projeto:

```bash
  git clone git@github.com:DavidJRRJ/project-talker-manager.git
```

Entre no diretório do projeto:

```bash
  cd project-talker-manager
```

Na pasta app do projeto, suba o container talker_manager utilizando o comando abaixo:

```bash
    docker-compose up -d
```

Entre no terminal do container:

```bash
    docker exec -it talker_manager bash
```

Instale as dependências:

```bash
  npm install
```

Inicie o servidor:

```bash
  npm run start
```


## Documentação da API

### Retorna um `status 200` e um array com todos os palestrante cadastrados

```http
  GET /talker
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `Nenhum` |  | |

- Resposta
```json
[
  {
    "name": "Henrique Albuquerque",
    "age": 62,
    "id": 1,
    "talk": { "watchedAt": "23/10/2020", "rate": 5 }
  },
  {
    "name": "Heloísa Albuquerque",
    "age": 67,
    "id": 2,
    "talk": { "watchedAt": "23/10/2020", "rate": 5 }
  },
  {
    "name": "Ricardo Xavier Filho",
    "age": 33,
    "id": 3,
    "talk": { "watchedAt": "23/10/2020", "rate": 5 }
  },
  {
    "name": "Marcos Costa",
    "age": 24,
    "id": 4,
    "talk": { "watchedAt": "23/10/2020", "rate": 5 }
  }
]
```
- Caso não exista nenhuma pessoa palestrante cadastrada a requisição deve retornar o `status 200` e um array vazio

  ```json
  []
  ```

### Retorna um palestrante com base no `id`

```http
  GET /talker/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` | **Obrigatório**. O ID do item que você quer |

- Resposta
  ```json
  {
    "name": "Henrique Albuquerque",
    "age": 62,
    "id": 1,
    "talk": { "watchedAt": "23/10/2020", "rate": 5 }
  }
  ```
- Caso não não seja encontrado um palestrante com base no `ìd` da rota, a requisição deve retornar o `status 404` com o seguinte corpo

```json
  {
    "message": "Pessoa palestrante não encontrada"
  }
  ```

### Recebe no corpo da requisição os campos `email` e `password` e retorna um token aleatório de 16 caracteres.

```http
  POST /login
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email`      | `string` | **Obrigatório** e deve ter um email válido |
| `password`      | `string` | **Obrigatório** e deve ter pelo menos 6 caracteres |

- Resposta
```json
  {
    "token": "7mqaVRXJSp886CGr"
  }
  ```

### Adiciona um palestrante no arquivo

```http
  POST /talker
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | **Obrigatório** no mínimo 3 caracteres|
| `age`      | `number` | **Obrigatório**. Somente maiores de 18 anos |
| `talk`      | `object` | **Obrigatório** |

- O corpo da requisição deverá ter o seguinte formato
```json
  {
    "name": "Danielle Santos",
    "age": 56,
    "talk": {
      "watchedAt": "22/10/2019",
      "rate": 5
    }
  }
  ```
- A requisição deve ter o token de autenticação nos headers, no campo `authorization`.

  - Caso o token não seja encontrado retorna um código de `status 401`, com o seguinte corpo:

    ```json
    {
      "message": "Token não encontrado"
    }
    ```

  - Caso o token seja inválido retorna um código de `status 401`, com o seguinte corpo:

    ```json
    {
      "message": "Token inválido"
    }
    ```  

  - Caso o campo não seja passado ou esteja vazio retorna um código de `status 400`, com o seguinte corpo:

    ```json
    {
      "message": "O campo \"name\" é obrigatório"
    }
    ```

  - Caso o nome não tenha pelo menos 3 caracteres retorna um código de `status 400`, com o seguinte corpo:

    ```json
    {
      "message": "O \"name\" deve ter pelo menos 3 caracteres"
    }
    ```

  - Caso o campo age não seja passado ou esteja vazio retorna um código de `status 400`, com o seguinte corpo:

    ```json
    {
      "message": "O campo \"age\" é obrigatório"
    }
    ```

  - Caso a pessoa palestrante não tenha pelo menos 18 anos retorna `status 400`, com o seguinte corpo:

    ```json
    {
      "message": "A pessoa palestrante deve ser maior de idade"
    }
    ```

  - O campo `talk` deverá ser um objeto com as chaves `watchedAt` e `rate`:

  - O campo `talk` é obrigatório.

      - Caso o campo não seja informado retorna `status 400`, com o seguinte corpo:

        ```json
        {
          "message": "O campo \"talk\" é obrigatório"
        }
        ```
      
  - A chave `watchedAt` é obrigatória.  

    - Caso a chave não seja informada ou esteja vazia retorna `status 400`, com o seguinte corpo:

      ```json
      {
        "message": "O campo \"watchedAt\" é obrigatório"
      }
      ```

  - A chave `watchedAt` deve ser uma data no formato `dd/mm/aaaa`.

    - Caso a data não respeite o formato `dd/mm/aaaa` retorna `status 400`, com o seguinte corpo:

      ```json
      {
        "message": "O campo \"watchedAt\" deve ter o formato \"dd/mm/aaaa\""
      }
      ```

  - O campo `rate` é obrigatório.  

    - Caso o campo não seja informado ou esteja vazio retorna `status 400`, com o seguinte corpo:

      ```json
      {
        "message": "O campo \"rate\" é obrigatório"
      }
      ```

  - A chave `rate` deve ser um inteiro de 1 à 5.

    - Caso a nota não seja um inteiro de 1 à 5 retorna `status 400`, com o seguinte corpo:

      ```json
      {
        "message": "O campo \"rate\" deve ser um inteiro de 1 à 5"
      }
      ```  
  
- Caso esteja tudo certo, retorne o `status 201`  e a pessoa cadastrada.
  
- O endpoint deve retornar o `status 201` e a pessoa palestrante que foi cadastrada, da seguinte forma:

  ```json
  {
    "id": 1,
    "name": "Danielle Santos",
    "age": 56,
    "talk": {
      "watchedAt": "22/10/2019",
      "rate": 5
    }
  }
  ```

### Este endpoint é capaz de editar uma pessoa palestrante com base no id da rota, sem alterar o id registrado

```http
  PUT /talker
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | **Obrigatório** no mínimo 3 caracteres|
| `age`      | `number` | **Obrigatório**. Somente maiores de 18 anos |
| `talk`      | `object` | **Obrigatório** |

- O corpo da requisição deverá ter o seguinte formato:

    ```json
    {
      "name": "Danielle Santos",
      "age": 56,
      "talk": {
        "watchedAt": "22/10/2019",
        "rate": 5
      }
    }
    ```

- A requisição deve ter o token de autenticação nos headers, no campo `authorization`.

- Caso o token não seja encontrado retorna um código de `status 401`, com o seguinte corpo:

    ```json
    {
    "message": "Token não encontrado"
    }
    ```

- Caso o token seja inválido retorna um código de `status 401`, com o seguinte corpo:

    ```json
    {
    "message": "Token inválido"
    }
    ```

- Caso o campo não seja passado ou esteja vazio retorna um código de `status 400`, com o seguinte corpo:

    ```json
    {
    "message": "O campo \"name\" é obrigatório"
    }
    ```

- Caso o nome não tenha pelo menos 3 caracteres retorna um código de `status 400`, com o seguinte corpo:

    ```json
    {
    "message": "O \"name\" ter pelo menos 3 caracteres"
    }
    ```

- Caso o campo não seja passado ou esteja vazio retorna um código de `status 400`, com o seguinte corpo:

    ```json
    {
    "message": "O campo \"age\" é obrigatório"
    }
    ```

- Caso a pessoa palestrante não tenha pelo menos 18 anos retorna `status 400`, com o seguinte corpo:

    ```json
    {
    "message": "A pessoa palestrante deve ser maior de idade"
    }
    ```

- O campo `talk` deverá ser um objeto com as chaves `watchedAt` e `rate`:

- O campo `talk` é obrigatório.

    - Caso o campo não seja informado retorna `status 400`, com o seguinte corpo:

        ```json
        {
        "message": "O campo \"talk\" é obrigatório"
        }
        ```
    
- A chave `watchedAt` é obrigatória.  

    - Caso a chave não seja informada ou esteja vazia retorna `status 400`, com o seguinte corpo:

    ```json
    {
        "message": "O campo \"watchedAt\" é obrigatório"
    }
    ```

- A chave `watchedAt` deve ser uma data no formato `dd/mm/aaaa`.

    - Caso a data não respeite o formato `dd/mm/aaaa` retorna `status 400`, com o seguinte corpo:

    ```json
    {
        "message": "O campo \"watchedAt\" deve ter o formato \"dd/mm/aaaa\""
    }
    ```

- O campo `rate` é obrigatório.  

    - Caso o campo não seja informado ou esteja vazio retorna `status 400`, com o seguinte corpo:

    ```json
    {
        "message": "O campo \"rate\" é obrigatório"
    }
    ```

- A chave `rate` deve ser um inteiro de 1 à 5.

    - Caso a nota não seja um inteiro de 1 à 5 retorna `status 400`, com o seguinte corpo:

    ```json
    {
        "message": "O campo \"rate\" deve ser um inteiro de 1 à 5"
    }
    ```
    
- Caso esteja tudo certo, retorna o `status 200` e a pessoa editada.

```json
{
    "id": 1,
    "name": "Danielle Santos",
    "age": 56,
    "talk": {
    "watchedAt": "22/10/2019",
    "rate": 4
    }
}
```

### Este endpoint deleta um palestrante com base no `id`, retornando um campo vazio e um `status 404` 

```http
  DELETE /talker/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` | **Obrigatório**. O ID do item que você quer |

- A requisição deve ter o token de autenticação nos headers, no campo `authorization`.

    - Caso o token não seja encontrado retorne um código de `status 401`, com o seguinte corpo:

      ```json
      {
        "message": "Token não encontrado"
      }
      ```

    - Caso o token seja inválido retorne um código de `status 401`, com o seguinte corpo:

      ```json
      {
        "message": "Token inválido"
      }
      ```
