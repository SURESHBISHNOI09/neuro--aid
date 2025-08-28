# NeuroAid – AI-Powered Neurological Health Companion

## 🚀 Overview
NeuroAid is a research-oriented AI platform that analyzes **speech patterns** to assess neurological health risks such as **Parkinson’s and Alzheimer’s**.  
It provides **personalized insights, visualization dashboards, and sharing options** for patients, clinicians, and researchers.

This repository is a **monorepo** containing:
- **Frontend (Next.js 14 + Tailwind + shadcn/ui)**  
- **Backend (FastAPI + ML stubs with librosa features)**  
- **Database (PostgreSQL + Prisma ORM)**  
- **Infra (Docker Compose, CI/CD, seeds, pre-commit hooks)**  

---

## 📂 Project Structure
```
neuroaid/
├── web/         # Next.js frontend (UI, auth, dashboard, charts, recorder)
├── api/         # FastAPI backend (ML stubs, health checks, predictions)
├── prisma/      # Prisma schema, migrations, and seed data
├── docs/        # Documentation (privacy, threat model, demo script, diagrams)
├── .github/     # GitHub Actions CI workflows
└── docker-compose.yml
```

---

## ⚡ Features
- ✅ User authentication (email/password + Google) via **NextAuth**
- ✅ Audio recording & upload for analysis
- ✅ ML risk scoring using **librosa features** (MFCC, ZCR, spectral centroid)
- ✅ Interactive **dashboard with charts & reports**
- ✅ Secure **share results with doctors/researchers**
- ✅ Admin panel for monitoring users & predictions
- ✅ **Dockerized** environment for easy setup
- ✅ **CI/CD pipeline** with linting, testing, and builds

---

## 🛠️ Tech Stack
- **Frontend:** Next.js 14, TailwindCSS, shadcn/ui, Chart.js, NextAuth  
- **Backend:** FastAPI, librosa, NumPy, Python 3.11  
- **Database:** PostgreSQL, Prisma ORM  
- **Infra:** Docker Compose, GitHub Actions, Pre-commit hooks  

---

## 🔧 Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/your-org/neuroaid.git
cd neuroaid
```

### 2. Setup Environment
Copy `.env.example` → `.env` and configure values.

### 3. Run with Docker
```bash
docker-compose up --build
```

### 4. Seed Database
```bash
docker-compose exec web npx prisma db push --force-reset
docker-compose exec web npx prisma db seed
```

---

## 🧪 Testing
Frontend (Jest/React Testing Library):
```bash
cd web
npm test
```

Backend (Pytest):
```bash
cd api
pytest
```

---

## 🔐 Security & Privacy
- Privacy-first design – data stays local unless explicitly shared.  
- Admin-only access to system metrics.  
- Threat model documented in `/docs/security.md`.  

---

## 📈 Roadmap
- [ ] Integrate real ML models (CNN/RNN on speech datasets)  
- [ ] Add doctor–patient chat interface  
- [ ] Deploy on cloud (AWS/GCP) with Kubernetes  
- [ ] Expand to multi-language support  

---

## 👥 Contributors
- **Suresh Bishnoi** – Project Lead, Frontend & Infra  
- **Team Members** – Backend, ML, Docs  

---

## 📜 License
This project is licensed under the MIT License.  
See `LICENSE` for details.
