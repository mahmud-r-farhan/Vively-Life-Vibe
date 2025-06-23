# 📘 Backend API Documentation

**Base URL:**

```
http://localhost:5000/api
```

---

## 🔐 Auth Routes

### ✅ Register User

**POST** `/auth/register`

#### Request JSON:

```json
{
   "_id": "userId",
  "username": "mahmud",
  "firstName": "Mahmud",
  "lastName": "Rahman",
  "email": "mahmud@devplus.fun",
  "contact": "+880123456789",
  "profilePicture": "https://...",
  "bio": "Learning backend and security.",
}
```

#### Success Response:

```json
{
  "message": "User registered successfully"
}
```

---

### 🔑 Login User

**POST** `/auth/login`

#### Request JSON:

```json
{
  "email": "mahmud@example.com",
  "password": "strongpass123"
}
```

#### Success Response:

```json
{
  "message": "Login successful",
  "token": "JWT_TOKEN_HERE"
}
```

---

## 👤 Profile Route

### 🔎 Get My Profile

**GET** `/profile`
**Headers:**

```
Authorization: Bearer JWT_TOKEN_HERE
```

#### Success Response:

```json
{
  "_id": "userId",
  "username": "mahmud",
  "firstName": "Mahmud",
  "lastName": "Rahman",
  "email": "mahmud@devplus.fun",
  "contact": "+880123456789",
  "profilePicture": "https://...",
  "bio": "Learning backend and security.",
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

## 👥 User Management (Admin / Full Access)

### 📥 Get All Users

**GET** `/users`

### 📤 Get User by ID

**GET** `/users/:id`

### ✏️ Update User

**PUT** `/users/:id`

#### Example JSON:

```json
{
  "bio": "Updated bio.",
  "contact": "+8801122334455"
}
```

### ❌ Delete User

**DELETE** `/users/:id`

---

## 📦 Sample .env

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/devplusfun
JWT_SECRET=your_super_secret_key
```

---

## 🛠️ Test Tools

* Use **Postman** to test all endpoints.
* Set `Content-Type: application/json` for all POST/PUT requests.
* Add `Authorization: Bearer <token>` for protected routes like `/profile`.

---