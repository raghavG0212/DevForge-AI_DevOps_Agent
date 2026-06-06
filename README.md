# 🚀 DevOpsAgent

<div align="center">

### AI-Powered DevOps Automation Platform

Analyze repositories, detect technology stacks, generate production-ready DevOps configurations, explain generated files, and troubleshoot deployment errors — all powered by AI.

![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-Backend-success)
![React](https://img.shields.io/badge/React-Frontend-blue)
![Gemini](https://img.shields.io/badge/Gemini-AI_Model-purple)
![License](https://img.shields.io/badge/License-MIT-green)

</div>

---

# 📌 Overview

DevOpsAgent is an AI-powered DevOps assistant that helps developers automate deployment preparation for software projects.

Instead of manually creating deployment configurations, users can upload a GitHub repository or ZIP file and instantly receive:

- Project Analysis
- Technology Stack Detection
- Production-Ready DevOps Files
- File Explanations
- Deployment Error Analysis
- Deployment Recommendations

The platform significantly reduces the time required to move a project from development to deployment.

---

# 🎯 Problem Statement

Modern software projects require multiple DevOps configurations before deployment:

- Dockerfiles
- Docker Compose
- Environment Variables
- CI/CD Pipelines
- Deployment Configurations

Creating these files manually:

❌ Requires DevOps expertise

❌ Consumes development time

❌ Increases chances of configuration mistakes

❌ Creates onboarding challenges for new developers

DevOpsAgent automates this process using AI and intelligent project analysis.

---

# ✨ Features

## 🔍 Project Analysis

Upload a repository and receive:

- Project Overview
- Architecture Summary
- Backend Analysis
- Frontend Analysis
- Deployment Insights

---

## ⚙️ Automatic Stack Detection

The system scans project files and identifies technologies automatically.

### Backend

- Spring Boot
- Java
- Python

### Frontend

- React
- Node.js

### DevOps

- Docker
- Docker Compose
- GitHub Actions
- Kubernetes

---

## 🐳 DevOps File Generation

Generate production-ready:

- Dockerfile
- docker-compose.yml
- .env
- CI/CD Pipelines
- Deployment Configurations

---

## 📖 AI File Explanation

Every generated file can be explained.

The AI provides:

- Purpose of the file
- Why it is required
- Important sections
- Deployment significance

---

## 🛠 Deployment Error Analyzer

Analyze deployment and DevOps errors.

Returns:

- Error Meaning
- Possible Causes
- Step-by-Step Fixes
- Additional Recommendations

---

## 📦 ZIP Upload Support

Users can:

- Upload GitHub Repository URL
- Upload Project ZIP File
- Drag & Drop ZIP Files

Professional upload workflow with modern UI.

---

## 💾 Intelligent Caching

Projects are hashed and cached.

Benefits:

- Faster repeat analysis
- Reduced API calls
- Improved consistency

---

## ✅ Validation Layer

Generated files are validated before being returned.

Examples:

### Dockerfile

- Must contain FROM
- Must contain CMD or ENTRYPOINT

### Docker Compose

- Must contain services section

### CI/CD

- Must contain jobs configuration

---

## 🎯 Deterministic Generation

AI generation settings are optimized for consistency.

```text
Temperature = 0
TopP = 0.1
TopK = 1
```

Benefits:

- Reduced randomness
- Consistent outputs
- Lower hallucination rate

---

# 🏗 System Architecture

```text
User Input
    │
    ▼
Repository / ZIP Upload
    │
    ▼
Project Scanner
    │
    ▼
Stack Detection Engine
    │
    ▼
Project Analysis
    │
    ▼
Gemini AI
    │
    ▼
Validation Layer
    │
    ▼
Generated DevOps Files
    │
    ▼
Frontend Dashboard
```

---

# 🔄 Workflow

## Step 1

Upload:

- GitHub Repository URL

OR

- ZIP File

---

## Step 2

Project Processing

- Clone Repository
- Extract ZIP
- Scan Project Structure

---

## Step 3

Technology Detection

The scanner identifies:

- Backend Framework
- Frontend Framework
- Build Tools
- Deployment Technologies

---

## Step 4

AI Analysis

Project context is sent to Gemini AI.

The AI generates:

- Architecture Analysis
- Deployment Recommendations
- Required DevOps Assets

---

## Step 5

DevOps File Generation

Generated files include:

```text
Dockerfile
docker-compose.yml
.env
CI/CD Pipeline
```

---

## Step 6

Validation

Generated files pass validation checks.

Invalid configurations are rejected.

---

## Step 7

User Actions

Users can:

- View Files
- Download Files
- Explain Files
- Analyze Errors

---

# 🧠 Newly Added Enhancements

## Enhanced Project Scanner

Previous:

```text
Top-level files only
```

Current:

```text
Deep project structure analysis
```

Benefits:

- Better context
- Better recommendations
- Reduced hallucinations

---

## Intelligent File Selection

A rule-based engine determines required DevOps files.

Benefits:

- Consistent outputs
- Predictable recommendations
- Reduced AI dependency

---

## Repository Hashing

Projects generate unique SHA-256 hashes.

Used for:

- Caching
- Project Identification
- Consistency Improvements

---

## Cache Layer

Workflow:

```text
Project
   ↓
Hash
   ↓
Cache Lookup
   ↓
Return Cached Result
```

Benefits:

- Faster responses
- Reduced AI cost
- Better UX

---

# 💻 Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Redux Toolkit
- Axios
- React Icons
- React Hot Toast

---

## Backend

- Java 17
- Spring Boot
- Spring MVC
- Spring WebFlux
- Jackson

---

## AI Layer

- Gemini 2.5 Flash

---

## Build Tools

- Maven
- Git

---

# 📂 Project Structure

```text
DevOpsAgent
│
├── frontend
│   ├── components
│   ├── pages
│   ├── api
│   ├── redux
│   └── utils
│
├── backend
│   ├── controller
│   ├── service
│   ├── model
│   ├── util
│   └── configuration
│
└── docs
```

---

# 🚀 Running the Project

## Backend

```bash
cd backend

mvn clean install

mvn spring-boot:run
```

Backend runs on:

```text
http://localhost:9090
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# 📈 Benefits

### Faster Deployment Preparation

Traditional Setup:

```text
2–6 Hours
```

DevOpsAgent:

```text
1–3 Minutes
```

---

### Improved Productivity

Developers focus on development rather than infrastructure setup.

---

### Lower Learning Curve

Useful for:

- Students
- Startups
- Junior Developers
- Hackathon Teams

---

### Consistency

Projects receive standardized deployment assets following best practices.

---

# 🔮 Future Scope

## Vector Database Integration (Qdrant)

Store:

- Project Files
- Generated Configurations
- Historical Analysis

Benefits:

- Project memory
- Semantic search
- Better recommendations

---

## Embeddings

Convert project files into vector representations.

Benefits:

- Similarity search
- Context retrieval
- Better AI understanding

---

## RAG (Retrieval Augmented Generation)

Future Flow:

```text
Repository
    ↓
Embeddings
    ↓
Qdrant
    ↓
Relevant Context Retrieval
    ↓
AI Generation
```

Benefits:

- Lower hallucination
- Context-aware generation
- Better explanations

---

## Multi-Agent Architecture

Planned Agents:

### Analyzer Agent

Project understanding.

### DevOps Agent

File generation.

### Validation Agent

Configuration validation.

### Error Resolution Agent

Troubleshooting.

---

## Multi-LLM Support

Future support for:

- Gemini
- Claude
- OpenAI Models

Benefits:

- Reliability
- Model comparison
- Failover support

---

## Automated Deployment Validation

Future workflow:

```text
Generate Files
      ↓
Validate
      ↓
Auto Fix
      ↓
Return Final Output
```

---

## Persistent Caching

Upgrade from:

```text
In-Memory Cache
```

to:

```text
Redis
PostgreSQL
```

Benefits:

- Survives restarts
- Better scalability
- Enterprise readiness

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Open a Pull Request

---

# 📜 License

This project is licensed under the MIT License.

---

<div align="center">

### Built with ❤️ using React, Spring Boot and Gemini AI

**DevOpsAgent — Automating DevOps Through AI**

</div>
