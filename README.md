# 🎯 IA Tracker — Full Stack (React + Spring Boot + MySQL)

Interview Assessment Tracker — store every interview, round, question and failure in MySQL.

---

## 📁 Project Structure
```
iatracker-fullstack/
├── backend/       ← Spring Boot + JWT + MySQL
└── frontend/      ← React + Vite
```

---

## 🗄️ MySQL Setup
```sql
CREATE DATABASE weather;
```

---

## ⚙️ Backend Setup
```bash
cd backend
# Update src/main/resources/application.properties:
#   spring.datasource.password=YOUR_PASSWORD

mvn spring-boot:run
# Runs on http://localhost:9090
```

### Tables auto-created by JPA:
| Table | Description |
|-------|-------------|
| `users` | Registered users |
| `interviews` | Company + Role + Date |
| `rounds` | Round name + Difficulty |
| `questions` | Question text + Topic + Difficulty |
| `failures` | Description + Difficulty + Lesson |

---

## 💻 Frontend Setup
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:3000
```

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login → JWT token |
| GET | /api/interviews | Get all interviews |
| POST | /api/interviews | Add interview |
| DELETE | /api/interviews/:id | Delete interview |
| GET | /api/interviews/:id/rounds | Get rounds |
| POST | /api/interviews/:id/rounds | Add round |
| GET | /api/rounds/:id/questions | Get questions |
| POST | /api/rounds/:id/questions | Add question |
| GET | /api/rounds/:id/failures | Get failures |
| POST | /api/rounds/:id/failures | Add failure |

---

## 🔐 Auth Flow
1. Register → password BCrypt hashed → saved to MySQL
2. Login → JWT token returned → stored in localStorage
3. All API calls send `Authorization: Bearer <token>`
