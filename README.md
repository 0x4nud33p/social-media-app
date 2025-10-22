# 🕸️ Social Media App

A modern **full-stack social media web application** built with **Next.js 14**, **TypeScript**, and **Prisma ORM**, featuring user authentication, post creation, likes, comments, and an interactive UI.

---

## 🚀 Features

- **User Authentication** (Clerk / OAuth)
- **Create, Delete & Like Posts**
- **Add & View Comments**
- **Search Users**
- **Responsive Feed and Sidebar**
- **Real-time UI Updates**
- **Context-based User State Management**
- **Popup Modals** (Create Post, Profile, Search, Notifications, etc.)
- **Prisma ORM** with PostgreSQL

---

## 🧠 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | **Next.js 14**, **React**, **TypeScript**, **TailwindCSS** |
| Backend | **Next.js App Router**, **Prisma ORM** |
| Database | **PostgreSQL** |
| Auth | **Clerk** |
| Styling | **Tailwind CSS + Custom UI Components** |

---

## 📁 Directory Overview

```
social-media-app/
├── app/                     # Next.js App Router pages & APIs
│   ├── api/                 # Route handlers (server-side)
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main feed page
│
├── components/              # Reusable UI components
│   ├── post/                # Post-related components (create, comment)
│   ├── popup/               # Popup modals (CreatePost, Profile, etc.)
│   └── ui/                  # Common UI elements
│
├── config/                  # Static configurations (e.g., sidebar links)
├── context/                 # React Context providers
├── hooks/                   # Custom hooks
├── lib/                     # Client/server utilities
│   ├── client_data_fetching/ # Frontend API helpers
│   └── prisma/              # Prisma setup & migrations
├── types/                   # TypeScript types
├── utils/                   # Helper functions (e.g., date formatting)
├── middleware.ts            # Middleware for routing/auth
└── next.config.ts           # Next.js configuration
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repo
```bash
git clone https://github.com/0x4nud33p/social-media-app.git
cd social-media-app
```

### 2️⃣ Install dependencies
```bash
npm install
# or
yarn install
```

### 3️⃣ Setup environment variables  
Create a `.env` file in the root directory:
```
DATABASE_URL="postgresql://user:password@localhost:5432/yourdb"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_key"
CLERK_SECRET_KEY="your_clerk_secret"
```

### 4️⃣ Run Prisma migrations
```bash
npx prisma migrate deploy
```

### 5️⃣ Start the development server
```bash
npm run dev
```

---

## 🧩 Key Modules

- **API Routes (`app/api/`)**
  - `/post/create` → Create a post
  - `/post/addlike` → Like/unlike a post
  - `/post/addcomment` → Add comments
  - `/post/getcomments` → Fetch comments
  - `/posts` → Fetch all posts
  - `/user/(search)` → Search users
  - `/users/[id]` → Fetch user profile
  - `/auth/callback` → Auth callback

- **UI Components**
  - `Feed.tsx` – Renders posts feed
  - `Sidebar.tsx` – Navigation menu
  - `Trends.tsx` – Trending section
  - `PostCard.tsx` – Post creation card
  - `CommentSection.tsx` – Comment list and input

- **Utilities**
  - `utils/formatdate.ts` – Formats timestamps into readable date/time strings

---

## 🧱 Database Schema

Defined in:
```
lib/prisma/schema.prisma
```

Includes models for:
- **User**
- **Post**
- **Comment**
- **Like**

---

## 🧰 Scripts

| Command | Description |
|----------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build production version |
| `npm start` | Run production build |
| `npx prisma studio` | Open Prisma Studio GUI |

---

## 🧑‍💻 Author

**Anudeep (0x4nud33p)**  
🌐 [GitHub](https://github.com/0x4nud33p)

---

## 📜 License

This project is licensed under the **MIT License**.
