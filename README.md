# 💊 MedVerify

[![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Gemini](https://img.shields.io/badge/AI%20Engine-Google%20Gemini-121011?style=for-the-badge&logo=googlegemini)](https://ai.google.dev/)
[![PWA](https://img.shields.io/badge/PWA-Ready-9B51E0?style=for-the-badge&logo=progressive-web-apps)](https://web.dev/progressive-web-apps/)

> An AI-powered, hackathon-ready medicine verification ecosystem built for the **SWASTHYA** theme. Scan any drug strip to instantly check authenticity, uncover cost-effective generic alternatives, receive localized Hindi voice guidance, and track counterfeit distribution trends on a live geo-tagged heatmap.

---

## 📺 Live Demo & Walkthrough
### 🚀 [Launch Live App (DawaCheck)](https://dawacheck-gamma.vercel.app/)
### 🔗 [Watch Demo Video](https://youtu.be/CwKlz3iYRG8)

[![MedVerify Video Walkthrough](https://img.shields.io/badge/YouTube-Watch%20Video%20Walkthrough-red?style=for-the-badge&logo=youtube)](https://youtu.be/CwKlz3iYRG8)

> **💡 Hackathon Quick Pitch:** *"This data did not exist before MedVerify."* Keep a 60-second backup demo video cached on Google Drive to safeguard against stage connectivity issues.

---

## ✨ Key Features

* 📷 **OCR Strip Scanning** – High-speed text extraction from a live camera stream or photo upload using `Tesseract.js`.
* 🛡️ **Authenticity Verification** – Instant validation checks against a centralized database flagging expired, recalled, or unverified batches.
* 💸 **Generic Substitutes** – Automated cross-referencing with PMBJP registries to surface cheaper equivalents and estimate total user savings.
* 🗣️ **Localized Voice Guidance** – Accessible, one-tap Hindi audio summaries for rural and low-literacy accessibility.
* 🗺️ **Counterfeit Threat Mapping** – An analytical, interactive leaflet heatmap tracking and visualizing geolocated counterfeit anomalies.
* 📱 **Offline-First PWA** – Fully installable web application configured for standalone operation and localized caching.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology Stack |
| :--- | :--- |
| **Frontend** | React (Vite), Tesseract.js, Leaflet Maps, Tailwind CSS, `vite-plugin-pwa` |
| **Backend** | Node.js, Express.js, MongoDB (Mongoose) |
| **AI Layer** | Google Gemini API (`gemini-2.0-flash`) |

---

## 📸 Interface Preview
| Home Screen | Scanner Interface | Interaction Check | Counterfeit Heatmap |
| :---: | :---: | :---: | :---: |
| <img width="2844" alt="Home Screen" src="https://github.com/user-attachments/assets/024f0a82-46a6-466c-8ca3-019a368c49a5" /> | <img width="2876" alt="Scanner Interface" src="https://github.com/user-attachments/assets/9474ed70-40cb-44e5-9964-10ebe3b13c90" /> | <img width="2878" alt="Interaction Check" src="https://github.com/user-attachments/assets/3bd607e0-0d52-4bdc-8a72-a5fcefef3cd6" /> | <img width="2876" alt="Counterfeit Heatmap" src="https://github.com/user-attachments/assets/eda2b4bc-0413-4101-bef0-6aea43692538" /> |


---

## 📁 Project Structure

```text
medverify/
├── frontend/     # React PWA client application
└── backend/      # Node.js API engine, Mongoose models, & CSV data pipeline

## 🚀 Getting Started

### Prerequisites
* Node.js 18+
* MongoDB Instance (Local or Atlas)
* Google Gemini API Key

---

### 1️⃣ Backend Setup

1. **Navigate & Install Dependencies:**
   ```bash
   cd backend
   npm install
### 2️⃣ Frontend Setup
   Navigate & Install Dependencies:

    Bash
    cd ../frontend
    npm install
    Configure Environment Variables:

Bash
cp .env.example .env
Ensure it points to your local backend server instance:

🌐 Production Cloud Deployment
Backend (Render Deployment)
Root Directory: backend

Build Command: npm install

Start Command: node server.js

Required Variables: MONGO_URI, GEMINI_API_KEY, GEMINI_MODEL=gemini-2.0-flash, PORT=5000
