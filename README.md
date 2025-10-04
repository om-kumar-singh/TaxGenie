# 🧮 TaxGenie

<p align="center">
  A smart tax computation and simulation web app — built with React + TypeScript + Vite.  
  Compare tax regimes, simulate "what-if" cases, upload Form 16, and generate reports instantly.
  <br />
  <a href="https://github.com/om-kumar-singh/TaxGenie"><strong>Explore the docs »</strong></a>
  <br />
  <br />
  <a href="https://taxgenie-helper.netlify.app/">View Demo</a>
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
|----------|------------|
| **Frontend** | React (TypeScript) |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS |
| **State Management** | React Hooks / Context |
| **PDF Generation** | Custom React PDF Export |
| **Linting** | ESLint |
| **Version Control** | Git + GitHub |

---

## 🖼 Screenshots

## 🖼 Screenshots

> *(Preview of TaxGenie features and UI)*  

<p align="center">
  <img src="assets/screenshots/Screenshot%202025-10-04%20230514.png" width="75%" alt="Dashboard Overview"><br/>
  <img src="assets/screenshots/Screenshot%202025-10-04%20230545.png" width="75%" alt="Form16 Upload"><br/>
  <img src="assets/screenshots/Screenshot%202025-10-04%20230604.png" width="75%" alt="What-If Simulator"><br/>
  <img src="assets/screenshots/Screenshot%202025-10-04%20230629.png" width="75%" alt="Tax Comparison"><br/>
  <img src="assets/screenshots/Screenshot%202025-10-04%20230711.png" width="75%" alt="Recommendations"><br/>
  <img src="assets/screenshots/Screenshot%202025-10-04%20230725.png" width="75%" alt="Genie Assistant"><br/>
  <img src="assets/screenshots/Screenshot%202025-10-04%20230739.png" width="75%" alt="PDF Export"><br/>
  <img src="assets/screenshots/Screenshot%202025-10-04%20230847.png" width="75%" alt="Summary Results"><br/>
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
```

### 3️⃣ Install Dependencies

```bash
npm install
# or
yarn
```

### 4️⃣ Run the Development Server

```bash
npm run dev
# or
yarn dev
```

The app will be available at 👉 **http://localhost:5173**

### 5️⃣ Build for Production

```bash
npm run build
# or
yarn build
```

### 6️⃣ Preview the Production Build

```bash
npm run preview
# or
yarn preview
```

---

## 📂 Project Structure

```
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
```

---

## 💻 Usage

1. **Open the app** at 👉 [TaxGenie](https://taxgenie-helper.netlify.app/)
2. **Enter your income**, deductions, and investment details
3. **View tax results** under both Old and New Regimes
4. **Use the What-If Simulator** to test different financial scenarios
5. **Export your results** as a PDF report
6. **Optionally, upload your Form 16** for quick automation

---

## 🤝 Contributing

Contributions are welcome!  
Fork the repo, create a new branch, make your changes, and submit a PR.

```bash
git checkout -b feature-name
git commit -m "Add new feature"
git push origin feature-name
```

---

## 📜 License

Distributed under the MIT License.  
See `LICENSE` for more information.

---

## 👨‍💻 Author

**Om Kumar Singh**

- GitHub: [@om-kumar-singh](https://github.com/om-kumar-singh)
- Project: [TaxGenie](https://github.com/om-kumar-singh/TaxGenie)
- Live Demo: [TaxGenie](https://taxgenie-helper.netlify.app/)

---
