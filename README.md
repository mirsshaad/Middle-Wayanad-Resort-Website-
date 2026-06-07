# Middle Wayanad Holyday Inn - Resort Website & Booking Platform

An immersive, premium editorial-style landing page and booking application designed for **Middle Wayanad Holyday Inn** in Wayanad, Kerala, India. The application features a minimalist FORESTIS-inspired design, custom-designed interactive components, and a complete checkout and payment routing system.

---

## 🌟 Key Features

1. **Immersive Multi-Step Booking Flow:**
   - A full-screen booking router mapping steps: `Dates` → `Villas` → `Info` → `Invoice` → `Payment` → `Success`.
   - Real-time pricing calculations, including customizable capacity surcharges per extra guest.
2. **Real Razorpay Checkout Integration:**
   - Fully integrated client-side Razorpay SDK supporting UPI applications (GPay, PhonePe, Paytm), Netbanking, and Credit/Debit cards.
   - Automatically handles transactions and generates real-time payment IDs on successful processing.
3. **Automated WhatsApp Booking Prefills & Receipts:**
   - Redirects guests automatically to chat with the hotel desk (`+91 81579 16319`) prefilled with booking references and transaction IDs upon success.
   - Dynamic manual "Share via WhatsApp" buttons as backup fallbacks.
4. **Animated Coverflow room Carousel:**
   - A custom-engineered 3D card layout using `framer-motion` for rooms and spaces.
   - Supports touch/swipe gestures, card clicks, and circular wrapping logic.
5. **Interactive Grayscale Google Maps Section:**
   - Custom styled location section containing coordinates (`11.6754047, 76.0709064`) near Muttil North.
   - Interactive grayscale map overlay that transitions back to native colors on hover, paired with transit travel times from Kozhikode, Calicut, and Kannur.
6. **Nearby Attractions Hover Reveal:**
   - Accordion-style layout highlighting local attractions (Banasura Sagar Dam, Pookode Lake, Edakkal Caves, Lakkidi View Point, Chembra Peak).
   - Hovering over a name dynamically transitions high-resolution visuals.
7. **Bespoke Media Assets:**
   - Features custom-generated 8k landscape graphics of Wayanad tea plantations and realistic resort photography.

---

## 🛠️ Technology Stack

* **Core Framework:** React 19 (JavaScript)
* **Build Tool:** Vite 8
* **Animations:** Framer Motion
* **Styling:** Vanilla CSS (Outfit & Playfair Display typography stacks)
* **Icons:** Lucide React
* **Confetti Animations:** Canvas Confetti

---

## 🚀 Local Setup & Development

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (version 18+ is recommended).

### 2. Installation
Clone the repository, navigate into the project directory, and install dependencies:
```bash
npm install
```

### 3. Running Locally
Start the Vite development server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173` (or the port specified in your console).

### 4. Swapping Live Razorpay Key
To transition the payment gateway from Test Mode to Live Mode, replace the key constant in [src/App.jsx](file:///src/App.jsx):
```javascript
// Change this value in src/App.jsx (Line 14)
const RAZORPAY_KEY_ID = "rzp_live_your_actual_key";
```

### 5. Production Build
To build and optimize the site for production hosting:
```bash
npm run build
```
The optimized bundle will be compiled into the `dist/` directory, ready to be deployed to your host.

---

## 📂 Project Structure

```text
├── dist/                      # Production build output
├── public/                    # Static assets
│   ├── attractions/           # Real sightseeing photographs
│   ├── favicon.png            # Gold monogram browser icon
│   └── wayanad_bg.png         # 8k Wayanad landscape hero background
├── src/
│   ├── assets/                # Local asset files
│   ├── components/            # UI layout modules
│   ├── App.css                # Primary stylesheets & layouts
│   ├── App.jsx                # Main application entry & state logic
│   ├── index.css              # Color tokens & typography resets
│   └── main.jsx               # React DOM bootstrapping
├── index.html                 # Main HTML entry & Razorpay SDK injector
├── package.json               # Dependencies and scripts
└── vite.config.js             # Vite configurations
```
