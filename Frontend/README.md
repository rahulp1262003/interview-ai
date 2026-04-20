# 🤖 Interview AI — AI-Powered Interview Preparation

> A full-stack web application that uses Generative AI to create personalized interview preparation plans based on your resume and target job description.

---

## ✨ Features

- 📄 **Resume Upload** — Upload your PDF resume for AI analysis
- 🧠 **AI Report Generation** — Powered by Google Gemini / Groq to generate a tailored interview prep plan
- 📊 **Match Score** — See how well your profile matches the job description
- 📁 **Recent Reports** — View, revisit, and manage all your past reports
- 🗑️ **Delete Reports** — Permanently delete reports with confirmation modal
- 🔐 **Authentication** — Secure JWT-based login/register with cookie sessions
- 🌑 **Dark Mode UI** — Premium dark-themed interface built with Ant Design

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI Framework |
| [Vite 8](https://vitejs.dev/) | Build tool & Dev server |
| [Ant Design 6](https://ant.design/) | Component library |
| [React Router 7](https://reactrouter.com/) | Client-side routing |
| [Axios](https://axios-http.com/) | HTTP client |
| [SASS](https://sass-lang.com/) | CSS preprocessor |

### Backend
| Technology | Purpose |
|---|---|
| [Express 5](https://expressjs.com/) | Node.js web framework |
| [MongoDB + Mongoose](https://mongoosejs.com/) | Database & ODM |
| [@google/genai](https://ai.google.dev/) | Google Gemini AI SDK |
| [Groq SDK](https://groq.com/) | Groq AI inference |
| [Multer](https://github.com/expressjs/multer) | File (resume) upload |
| [pdf-parse](https://www.npmjs.com/package/pdf-parse) | PDF text extraction |
| [JWT](https://jwt.io/) | Authentication tokens |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | Password hashing |
| [Zod](https://zod.dev/) | Schema validation |

---

## 📁 Project Structure

```
Gen-ai/
├── Frontend/                   # React + Vite frontend
│   └── src/
│       ├── features/
│       │   ├── auth/           # Login, Register, Protected route
│       │   │   ├── pages/
│       │   │   ├── hooks/
│       │   │   ├── services/
│       │   │   └── components/
│       │   └── interview/      # Core interview prep feature
│       │       ├── pages/      # Home.jsx, Interview.jsx
│       │       ├── hooks/      # useInterview.js
│       │       ├── services/   # interview.ai.js (API calls)
│       │       ├── components/
│       │       ├── interview.context.jsx
│       │       └── interview.model.js
│       ├── app.routes.jsx      # App routing
│       └── main.jsx
│
└── Backend/                    # Express.js backend
    └── src/
        ├── controllers/        # Route handlers
        ├── routes/             # API route definitions
        ├── models/             # Mongoose models
        ├── services/           # Business logic & AI calls
        ├── middlewares/        # Auth & file middlewares
        ├── config/             # DB & app config
        └── utils/              # Helper utilities
```

---

## 🔌 API Endpoints

### Auth (`/api/auth`)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `POST` | `/register` | Register a new user | Public |
| `POST` | `/login` | Login and receive JWT cookie | Public |
| `GET` | `/logout` | Logout and blacklist token | Public |
| `GET` | `/get-me` | Get current user info | Private |

### Interview (`/api/interview`)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `POST` | `/` | Generate AI interview report (with resume upload) | Private |
| `GET` | `/all` | Get all reports for logged-in user | Private |
| `GET` | `/reports/:interviewId` | Get a specific report by ID | Private |
| `DELETE` | `/delete/:interviewId` | Delete a report by ID | Private |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)
- A running MongoDB instance
- Google Gemini or Groq API key

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Gen-ai.git
cd Gen-ai
```

### 2. Backend Setup

```bash
cd Backend
pnpm install
```

Create a `.env` file in `Backend/`:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
GROQ_API_KEY=your_groq_api_key
```

Start the backend dev server:

```bash
pnpm run dev
```

### 3. Frontend Setup

```bash
cd ../Frontend
pnpm install
pnpm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🗺️ Application Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `Home` | Dashboard — generate new report, view recent reports |
| `/login` | `Login` | User login page |
| `/register` | `Register` | User registration page |
| `/interview/reports/:id` | `Interview` | View a specific AI-generated report |

---

## 📸 Key Screens

- **Home Page** — Upload resume, paste job description, generate AI plan, view recent reports with delete option
- **Interview Report** — Detailed AI-generated preparation plan with match score, skills analysis, and study tips
- **Auth Pages** — Clean login/register forms with JWT session management

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

[MIT](https://choosealicense.com/licenses/mit/)
