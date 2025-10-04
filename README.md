<!-- PROJECT LOGO -->
<p align="center">
  <img src="assets/logo.png" alt="TaxGenie Logo" width="120" height="120">
</p>

<h1 align="center">🧮 TaxGenie</h1>

<p align="center">
  A smart tax computation and simulation web app — built with React + TypeScript + Vite.  
  Compare tax regimes, simulate “what-if” cases, upload Form 16, and generate reports instantly.
  <br />
  <a href="https://github.com/om-kumar-singh/TaxGenie"><strong>Explore the docs »</strong></a>
  <br />
  <br />
  <a href="https://github.com/om-kumar-singh/TaxGenie">View Demo</a>
  ·
  <a href="https://github.com/om-kumar-singh/TaxGenie/issues">Report Bug</a>
  ·
  <a href="https://github.com/om-kumar-singh/TaxGenie/issues">Request Feature</a>
</p>

---

## 🏷️ Badges

<p align="center">

![Node](https://img.shields.io/badge/Node.js-16%2B-green?logo=node.js)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-Build-orange?logo=vite)
![Tailwind](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css)
![License](https://img.shields.io/github/license/om-kumar-singh/TaxGenie)
![Stars](https://img.shields.io/github/stars/om-kumar-singh/TaxGenie?style=social)

</p>

---

## 📚 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Usage](#-usage)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## 🚀 Features

✅ Calculate tax based on the **Old and New Regimes**  
✅ Upload **Form 16** to auto-fill tax data  
✅ Run **What-If simulations** for income and deductions  
✅ Compare multiple tax scenarios instantly  
✅ **Export** reports as downloadable **PDFs**  
✅ Get personalized **recommendations** and insights  
✅ Clean, responsive, and fast UI built on Vite  
✅ 100% open source and beginner-friendly codebase  

---

## 🛠 Tech Stack

| Category | Technology |
|-----------|-------------|
| **Frontend** | React (TypeScript) |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS |
| **State Management** | React Hooks / Context |
| **PDF Generation** | Custom React PDF Export |
| **Linting** | ESLint |
| **Version Control** | Git + GitHub |

---

## 🖼 Screenshots

> *(Add your real screenshots here once available)*

<p align="center">
  <img src="assets/screenshots/dashboard.png" alt="Dashboard" width="75%"><br/>
  <em>Dashboard showing user tax computation and comparison</em>
</p>

---

## 🏁 Getting Started

Follow these steps to run the project locally:

### 1️⃣ Prerequisites

Install the following before you start:
- [Node.js](https://nodejs.org/) (v16+)
- npm or yarn
- Git

### 2️⃣ Clone the Repository

```bash
git clone https://github.com/om-kumar-singh/TaxGenie.git
cd TaxGenie
3️⃣ Install Dependencies
npm install
# or
yarn

4️⃣ Run the Development Server
npm run dev
# or
yarn dev


The app will be available at:
👉 http://localhost:5173

5️⃣ Build for Production
npm run build
# or
yarn build

6️⃣ Preview the Production Build
npm run preview
# or
yarn preview

📂 Project Structure
TaxGenie/
├── public/
├── src/
│   ├── components/
│   │   ├── ExportPDF.tsx
│   │   ├── FinancialInput.tsx
│   │   ├── Form16Upload.tsx
│   │   ├── GenieAssistant.tsx
│   │   ├── Header.tsx
│   │   ├── Recommendations.tsx
│   │   ├── TaxChatbot.tsx
│   │   ├── TaxComparison.tsx
│   │   └── WhatIfSimulator.tsx
│   ├── utils/
│   │   └── taxCalculator.ts
│   ├── types/
│   │   └── tax.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
├── tsconfig.json
└── README.md

💻 Usage

Open the app in your browser.

Enter your income, deductions, and investment details.

View tax results under both Old and New Regimes.

Use the What-If Simulator to test different financial scenarios.

Export your report as a PDF.

Optionally, upload Form 16 for quick automation.
