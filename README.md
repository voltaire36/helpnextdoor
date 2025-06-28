# HelpNextDoor

**A full-stack, community-driven web platform** designed to connect neighbors who need help with those willing to provide it. Built using a modern microservices and microfrontend architecture, it supports user-driven posts, AI-assisted recommendations, and secure role-based access.

---

## What It Is

HelpNextDoor is a modular web application that enables local residents, business owners, and community organizers to:

- Post and respond to help requests  
- Join public discussions  
- Share community news  
- Interact with an integrated AI assistant  

The system consists of three major components:

| Service                 | Purpose                                        |
|-------------------------|------------------------------------------------|
| `helpnextdoor-frontend` | Microfrontend SPA using React + Bootstrap      |
| `auth-service`          | Handles user authentication & role management |
| `community-service`     | Manages posts, help requests, comments & AI    |

---

## Accomplishments & Key Features

### Platform-Wide Features

- Role-based user system: `resident`, `business_owner`, `community_organizer`
- JWT-based authentication and persistent login state
- Modular layout with sidebar navigation and context-aware routing
- Mobile-responsive UI using Bootstrap
- Microfrontend-ready and scalable structure

---

### 👤 Auth Service (`auth-service`)
- Secure user registration with password hashing (`bcryptjs`)
- Login with JWT token issuance (1 hour expiry)
- User roles: `resident`, `business_owner`, `community_organizer`
- GraphQL schema with `signup`, `login`, and role-aware queries
- Clean separation of schema, resolvers, models, and config
- Ready for use in Apollo Gateway or standalone

---

### Community Service (`community-service`)
- Create, modify, delete:
  - Discussions  
  - Help Requests  
  - News Posts (by organizers only)
- Commenting system on all post types
- AI chatbot: LangChain + Gemini for semantic Q&A + post suggestions
- Mongoose models for Posts, Help Requests, Comments, Past Interactions, and Users
- VectorStore for similarity search on past content
- In-memory vector search with LangChain MemoryVectorStore
- Apollo GraphQL with query/mutation resolvers for all actions

---

### Frontend (`helpnextdoor-frontend`)
- React SPA with dynamic routing and state management
- Apollo Client for communicating with both microservices
- Context API + JWT decode for user session state
- Views:
  - Public posts + filters + pagination
  - Sidebar for "Your Posts"
  - AI Assistant chatbot in right sidebar
  - Account management (placeholder for update form)
- Responsive layout with reusable components and clean separation

---

## 🛠 Technologies Used

| Layer        | Stack                                                                 |
|--------------|-----------------------------------------------------------------------|
| Frontend     | React, React Router, Bootstrap, CSS Modules                          |
| Auth         | Node.js, Express, Apollo Server, MongoDB, JWT, bcryptjs              |
| Community    | Node.js, Express, GraphQL, MongoDB (Mongoose), LangChain, Gemini API |
| State/Auth   | React Context API, LocalStorage, jwt-decode                          |
| Dev Tools    | dotenv, nodemon, ESModules, modular GraphQL schemas/resolvers        |

---

## 🚀 How to Start (Local Development)

### 🔧 Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- Gemini API key ([Google AI Studio](https://makersuite.google.com/app/apikey))

---

### ▶Start Each Service

#### 1. `auth-service`

```bash
cd auth-service
npm install



Create .env:

ini
Copy
Edit
PORT=4000
MONGODB_URI=mongodb://localhost:27017/EmergingTechnology_Assignment3
JWT_SECRET=your_secret_here
Start server:

bash
Copy
Edit
node src/index.js
# or
npx nodemon src/index.js
2. community-service
bash
Copy
Edit
cd community-service
npm install
Create .env:

ini
Copy
Edit
PORT=4001
MONGODB_URI=mongodb://localhost:27017/EmergingTechnology_Assignment3
JWT_SECRET=your_secret_here
GEMINI_API_KEY=your_google_gemini_api_key
Start server:

bash
Copy
Edit
npm start
3. helpnextdoor-frontend
bash
Copy
Edit
cd helpnextdoor-frontend
npm install
npm run dev
App will launch at:
http://localhost:5173

Example GraphQL Queries
Get All Posts
graphql
Copy
Edit
query {
  getAllPosts {
    id
    title
    category
    author { username }
  }
}

AI Summary + Post Suggestions
graphql
Copy
Edit
query {
  communityAIQuery(input: "How can I help people in my area?") {
    text
    suggestedQuestions
    retrievedPosts { title }
  }
}

Ideal Use Cases
Mutual aid and neighborhood platforms

Local news and support boards

Volunteer or nonprofit coordination tools

AI-enhanced social engagement systems

System Architecture
Microfrontends per domain (auth-mfe, community-mfe, shell)

Apollo GraphQL backends for both services

All microservices use environment-based configuration and can scale independently

JWT authentication shared securely between frontend and backends

License
MIT License — free to use, adapt, or extend for community or educational projects.

About the Developer
Voltaire Roño
Full-stack Software Engineer
🌐 https://voltairerono.com

markdown
Copy
Edit

---
