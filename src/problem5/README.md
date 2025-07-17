# Express TypeScript Prisma SQLite API

A simple RESTful API built with Express, TypeScript, Prisma, and SQLite.

## 🚀 Features

- Create, Read, Update, Delete (CRUD) User
- Filter users by name
- SQLite for local development
- Prisma ORM for database interaction
- Postman Collection for testing

---

## 📦 Install dependencies

```bash
npm install
```

---

## 🛠️ Setup Prisma & Database

```bash
npx prisma generate
npx prisma migrate dev --name init
```

> This will:
> - Generate Prisma client
> - Create `dev.db` SQLite file
> - Apply migration with `User` model

---

## 🧪 Run development server

```bash
npm run dev
```

Server will run at: [http://localhost:3000](http://localhost:3000)

---

## 📂 API Endpoints

| Method | Endpoint       | Description           |
|--------|----------------|-----------------------|
| GET    | `/users`       | List users (supports `?name=` filter) |
| POST   | `/users`       | Create a new user     |
| GET    | `/users/:id`   | Get user by ID        |
| PUT    | `/users/:id`   | Update user by ID     |
| DELETE | `/users/:id`   | Delete user by ID     |

---

## 🔍 Sample User Payload

### `POST /users` or `PUT /users/:id`

```json
{
  "name": "Harry Nguyen",
  "email": "harry@example.com"
}
```

---

## 📬 Postman Collection

You can test the API using the provided Postman Collection:

📁 `postman/express_sqlite_crud.postman_collection.json`

### Import to Postman:

1. Open [Postman](https://www.postman.com/)
2. Click **Import**
3. Select the file from the `postman/` folder
4. Run requests 🚀

---

## 📁 Folder Structure

```
.
├── prisma/
│   └── schema.prisma
├── postman/
│   └── express_sqlite_crud.postman_collection.json
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   └── utils/
├── dev.db
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📜 License

MIT License.
