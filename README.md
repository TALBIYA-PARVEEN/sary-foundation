# 🌿 SARY Foundation - Full-Stack Web Platform

A high-performance, responsive, eco-modern web platform built for **SARY Foundation** (inspired by [Kanpur Ploggers](https://kanpurploggers.org/)).

---

## 📌 Foundation Details
- **Organization Name**: SARY Foundation
- **Official Email**: `arshahmad441@gmail.com`
- **Phone Number**: `+91 9517330895`
- **Headquarters**: 351, Vikas Nagar, Lakhanpur, Kanpur Nagar, Uttar Pradesh - 208024

---

## 🚀 Key Features

1. **Brand Aesthetic & Style**:
   - Clean, nature-inspired green palette (`#15803d`, `#166534`, `#dcfce7`).
   - Pill-shaped glassmorphic navigation with sticky positioning.
   - Fully responsive on mobile, tablet, laptop, and 4K displays.
   - Smooth animations, live counters, interactive photo/video lightboxes.

2. **Blueprint-Driven Architecture**:
   - Fully separated `backend/` and `frontend/` folders.
   - Frontend is organized into modular blueprints (`home`, `about`, `initiatives`, `gallery`, `volunteer`, `contact`, `donation`, `admin`), sharing reusable UI components in `src/components/common/`.

3. **Stealth Hidden Admin Portal**:
   - **Zero visible trace**: There is **no link or button** on any public navigation bar, drawer, or footer.
   - Secret access URL: `/sary-portal`
   - Security: Protected by bcrypt password hashing, JSON Web Tokens (JWT), role verification (`admin`/`superadmin`), and rate limiting against brute-force attempts.
   - Full management dashboard: Post photos & videos, edit initiatives, update live impact stats, review volunteer applications, and review citizen inquiries.

4. **Future-Proof Media System**:
   - Thoughtfully engineered for a new foundation with dedicated reservation slots and high-definition SVG/gradient visual placeholders.
   - Instant upload & post mechanism via the Admin Portal for future photos, YouTube videos, and press coverage.

5. **Brevo (Sendinblue) Email & Database Integration**:
   - All citizen inquiries and volunteer signups are securely stored in **MongoDB**.
   - Notifications are automatically dispatched to `arshahmad441@gmail.com` via **Brevo API**.
   - Auto-reply confirmation emails are sent to citizens and volunteers.
   - Graceful fallback: If Brevo credentials are not yet configured or in development mode, emails are cleanly simulated and logged to the console without interrupting user submissions.

6. **Donation Blueprint**:
   - Tax-exempt donation modal with UPI QR code generator, instant copy-to-clipboard for Bank IFSC and Account Number, and 80G receipt guidelines.

---

## 📂 Project Architecture

```
sary-foundation/
├── backend/                        # Node.js + Express + MongoDB + Brevo API
│   ├── config/
│   │   ├── db.js                   # Mongoose DB connection & health fallback
│   │   └── brevo.js                # Brevo SDK client configuration
│   ├── controllers/
│   │   ├── authController.js       # JWT login, verify & admin management
│   │   ├── contactController.js    # Inquiries submission & Brevo alerts
│   │   ├── initiativeController.js # Drives, campaigns & projects
│   │   ├── mediaController.js      # Photo & video gallery management
│   │   ├── statsController.js      # Real-time impact metrics
│   │   └── volunteerController.js  # Volunteer registrations & welcome email
│   ├── middleware/
│   │   ├── authMiddleware.js       # Bearer token verification
│   │   ├── errorHandler.js         # Centralized error handler
│   │   └── rateLimiter.js          # Brute-force & spam mitigation
│   ├── models/
│   │   ├── Admin.js                # Admin credentials & roles
│   │   ├── Contact.js              # Inquiries & status tracking
│   │   ├── Initiative.js           # Campaigns & upcoming drives
│   │   ├── Media.js                # Gallery items with placeholder support
│   │   ├── Stats.js                # Dynamic statistics counters
│   │   └── Volunteer.js            # Registered volunteers database
│   ├── routes/                     # Clean RESTful route mappings
│   ├── utils/
│   │   ├── emailService.js         # Brevo transactional email sender
│   │   └── seedDatabase.js         # Database seeder with sample data
│   ├── testApi.js                  # End-to-end API verification suite
│   ├── server.js                   # Express server entry point
│   ├── .env                        # Environment variables (Mongo, Brevo, JWT)
│   └── package.json
│
└── frontend/                       # React 18 + Vite + Tailwind CSS + Lucide Icons
    ├── src/
    │   ├── blueprints/             # Modular Blueprint Architecture
    │   │   ├── home/               # Hero, SDGs, Initiatives, Testimonials
    │   │   ├── about/              # Mission, Vision, Story, Legal Docs
    │   │   ├── initiatives/        # Projects grid & detailed cards
    │   │   ├── gallery/            # Filters, Photo grid, Video grid, Lightbox
    │   │   ├── volunteer/          # Multi-step Volunteer Registration form
    │   │   ├── contact/            # Inquiry form, Contact info, Leaflet map
    │   │   ├── donation/           # UPI QR code, Bank details, 80G info
    │   │   └── admin/              # Hidden portal dashboard & management tools
    │   ├── components/common/      # Navbar, Footer, Buttons, Modals, Stats
    │   ├── context/                # AuthContext & ToastContext
    │   ├── pages/                  # Route views (Home, About, Initiatives, etc.)
    │   ├── services/               # API service layer with JWT interceptor
    │   ├── styles/                 # Tailwind CSS & custom animations
    │   ├── App.jsx                 # Routing configuration
    │   └── main.jsx
    ├── tailwind.config.js
    ├── vite.config.js              # Proxy /api to backend port 5000
    └── package.json
```

---

## 🛠️ Getting Started

### 1. Prerequisites
- **Node.js**: v18+ installed
- **MongoDB**: Community server running locally on port 27017 or a MongoDB Atlas URI

### 2. Backend Setup
```bash
cd backend
npm install

# Seed the database with initial admin, impact stats, and initiatives
npm run seed

# Run the backend server
npm start
# -> Backend starts at http://localhost:5000
```

### 3. Frontend Setup
In a separate terminal:
```bash
cd frontend
npm install

# Start Vite development server
npm run dev
# -> Frontend starts at http://localhost:5173
```

---

## 📧 Configuring Brevo Email Service

1. Create a free account at [brevo.com](https://www.brevo.com/).
2. Navigate to **SMTP & API** -> Generate an **API Key**.
3. Open `backend/.env` and update:
   ```env
   BREVO_API_KEY=xkeysib-your-actual-api-key-here
   BREVO_SENDER_EMAIL=arshahmad441@gmail.com
   BREVO_SENDER_NAME="SARY Foundation"
   ADMIN_NOTIFICATION_EMAIL=arshahmad441@gmail.com
   ```
4. Restart the backend server. All volunteer signups and contact inquiries will instantly send live transactional emails!

---

## 🔐 Admin Portal Access

To keep the website authentic and clean, **there are no admin buttons anywhere on the public site**.

- **URL**: `http://localhost:5173/sary-portal`
- **Default Seed Username**: `saryadmin` *(or `admin@saryfoundation.org`)*
- **Default Seed Password**: `SaryAdmin@2025!`
