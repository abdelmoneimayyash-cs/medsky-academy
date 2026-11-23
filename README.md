<div align="center">

<img src="images/0786dcbd-1d22-422b-9182-5fd58fbbd30f.png" alt="MedSky Academy logo" width="112" />

# MedSky Academy

### A digital learning platform for medical translation training

[![Live Website](https://img.shields.io/badge/Live%20Website-medskyacademy.com-147CC1?style=for-the-badge&logo=googlechrome&logoColor=white)](https://medskyacademy.com)
[![Node.js](https://img.shields.io/badge/Node.js-22%2B-43853D?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5-111111?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

<img src="docs/images/medsky-banner.svg" alt="MedSky Academy — Digital Medical Education" width="100%" />

**Learn with purpose. Build a career in medical translation.**

</div>

---

## Overview

**MedSky Academy** is a digital training platform focused on medical translation education. It introduces specialized diploma pathways in **medical editorial translation** and **medical interpreting**, helping learners explore structured training programs and access their learning accounts.

The project combines a responsive, Arabic-first web experience with a Node.js and Express backend.

## Live Preview

Explore the deployed platform: **[medskyacademy.com](https://medskyacademy.com)**

![MedSky Academy homepage](docs/images/homepage.webp)

## Key Areas

| Area | What it includes |
| --- | --- |
| Academy homepage | Introduction, training pathways, trainers and course discovery |
| Diploma programs | Dedicated pages for the Editorial Diploma and Instant Diploma |
| Learner access | Sign-in and learner account interface |
| Authentication API | Server-side authentication and session handling |
| Privacy | Dedicated privacy information page |

## Screenshots

### Homepage
![MedSky Academy homepage](docs/images/homepage.webp)

### Training diplomas

<div align="center">

<table>
<tr>
<td width="50%" align="center">

**Medical Editorial Translation Diploma**

<img src="images/tahreree.png" alt="Medical Editorial Translation Diploma" width="100%" />

</td>
<td width="50%" align="center">

**Medical Instant Interpreting Diploma**

<img src="images/fawreee.png" alt="Medical Instant Interpreting Diploma" width="100%" />

</td>
</tr>
</table>

[Explore all diploma programs](https://medskyacademy.com/courses.html)

</div>

## Technology Stack

- **Frontend:** HTML5, CSS3, JavaScript
- **Backend:** Node.js, Express 5
- **Database:** SQLite
- **Authentication:** Server-side sessions
- **Email:** Nodemailer (optional SMTP configuration)
- **Identity integration:** Google Identity Services

## Repository Structure

```text
medsky-academy/
├── courses/                 # Diploma detail pages
├── css/                     # Page styles
├── docs/images/             # Repository documentation visuals
├── images/                  # Brand and course imagery
├── javascript/              # Frontend interactions
├── server/
│   ├── routes/              # Authentication and user routes
│   ├── test/                # API tests
│   ├── config.js            # Server configuration
│   ├── db.js                # SQLite database
│   ├── index.js             # Express application
│   ├── mailer.js            # Email integration
│   ├── security.js          # Security utilities
│   └── session.js           # Session handling
├── account.html
├── auth.html
├── courses.html
├── index.html
├── privacy.html
├── package.json
└── README.md
```

## Getting Started

### Requirements

- Node.js **22.13.0 or newer**
- npm

### 1. Clone the repository

```bash
git clone https://github.com/abdelmoneimayyash-cs/medsky-academy.git
cd medsky-academy
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the application

Review `server/config.js` and provide the environment-specific configuration required by your deployment. Keep credentials, SMTP passwords, private keys and production secrets out of source control.

### 4. Start locally

```bash
npm run dev
```

The development server uses **http://localhost:3000** by default.

For production:

```bash
npm start
```

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the server in watch mode |
| `npm start` | Start the production server |
| `npm test` | Run the Node.js test suite |

## Security

- Never commit `.env` files, database files, credentials or private keys.
- Use HTTPS in production.
- Configure secure cookies and production session settings for deployment.
- Rotate any credential that has previously been exposed in a public commit.

## Project

**Website:** [medskyacademy.com](https://medskyacademy.com)  
**Repository:** [github.com/abdelmoneimayyash-cs/medsky-academy](https://github.com/abdelmoneimayyash-cs/medsky-academy)

---

<div align="center">

**MedSky Academy** · Medical education, built for the web.

</div>
