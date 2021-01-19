# My Patrimony

Desenvolver um software para o controle de patrimônio da **Secretária de Saúde**

Layout da aplicação disponível [aqui](https://www.figma.com/file/UZH4KDbmpU3hNEVzKm2WRA/My-Patrimony-web)

---

### Sobre

<p align="justify">
Na secretaria de saúde percebe-se que o controle de patrimônio é um grande incomodo para muitos, exigindo tempo e dedicação para realizar verificação sobre os mesmos,
além de ser extremamente complicado manter o seu controle, já que mudanças ocorrem o tempo todo.
Com este intuito este software tem como principal objetivo tornar o controle do patrimônio eficiente e simples.
</p>

---

### FronteEnd

```shell
// Abra a pasta web
$ cd web

// Baixe as dependências
$ yarn

// Inicia o servidor
$ yarn start
```

---

### Backend

```shell
// Abra a pasta server
$ cd server

// Baixe as dependências
$ yarn

// Crie o arquivo .env
$ touch .env

// Configure seu arquivo .env e depois monte as tabelas
$ yarn prisma:migrate

// Inicie o servidor
$ yarn start
```

---

### Env

Preencha com as informações do seu banco de dados no arquivo .env

```bash
DATABASE_URL = 'postgresql://youruser:yourpassword@localhost:yourport/yourdb?schema=yourschema'

# # Exemplo

DATABASE_URL = 'postgresql://vineboneto:randompassword@localhost:5432/test?schema=public'
```
