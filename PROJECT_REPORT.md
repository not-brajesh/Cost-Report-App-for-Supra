# SUPRA SAEINDIA Cost Report Application - Project Report

## 📋 Executive Summary

**Project Name:** SUPRA SAEINDIA Cost Report App  
**Purpose:** Cost calculation and reporting system for SUPRA SAEINDIA racing teams  
**Current Status:** Partially functional - requires materials database integration  
**GitHub:** https://github.com/not-brajesh/Cost-Report-App-for-Supra  
**Live URL:** https://not-brajesh.github.io/Cost-Report-App-for-Supra/

---

## 🎯 Project Overview

### What is SUPRA SAEINDIA?
SUPRA SAEINDIA is a Formula-style student racing competition where engineering students design, build, and race formula-style vehicles. Each team must submit detailed cost reports for their vehicle components.

### Purpose of This App
This web application helps racing teams:
- Calculate costs of vehicle parts and materials
- Generate formatted cost reports
- Manage materials database (898+ items)
- Export reports as PDF/Excel
- Track component costs by category (Bearings, Brakes, etc.)

---

## 📁 Project Structure

```
SUPRA-Cost-Report-App/
│
├── index.html                 ← Main application (React-based)
├── simple-version.html        ← New simplified HTML version
├── materials-database.js      ← Generated JS with 898 materials
├── generate-materials.cjs     ← Script to convert CSV to JS
│
├── assets/
│   ├── index-DQ0lPwaa.js     ← Minified React app (PRODUCTION BUILD)
│   └── index-C5zfTLSS.css    ← Minified styles
│
├── .github/workflows/
│   └── deploy.yml             ← GitHub Pages auto-deploy config
│
├── manifest.webmanifest       ← PWA (Progressive Web App) config
├── vite.config.js             ← Build configuration
├── package.json               ← Node dependencies
├── README.md                  ← Basic documentation
└── PROJECT_REPORT.md          ← This file
```

---

## 🔧 Technical Architecture

### Original Implementation (index.html)
**Technology Stack:**
- **Frontend Framework:** React 18.2.0 (minified production build)
- **Build Tool:** Vite 5.0.8
- **Styling:** CSS (minified)
- **Deployment:** GitHub Pages + Netlify
- **Data Storage:** localStorage + hardcoded JS objects

**Problem:**
- Original app was built as **production React bundle**
- No source code available (no `src/` folder)
- Materials data hardcoded inside minified JS
- Cannot easily modify materials database

---

## 📊 Data Sources

### CostTable_Materials_2025.csv
**Location:** `/Users/brajeshkumar/Downloads/CostTable_Materials_2025_converted.csv`

**Contents:**
- **Total Materials:** 898 items
- **Categories:** 37 categories
- **Format:** CSV with formula support
- **Version:** Posted Version 1.0, 19-May-2025

**Sample Categories:**
1. Bearings (33 items) - Formula-based pricing
2. Brake System (100+ items) - Fixed pricing
3. Chassis (5 items) - Cost-as-made
4. Composite (17 items) - Carbon fiber, honeycomb
5. Control Module (90+ items) - ECUs, data loggers
6. Damper (40 items) - Ohlins, Penske, Fox
7. Drivetrain (20+ items) - CV joints, diffs
8. Electronics (100+ items) - Batteries, sensors
9. EV - Electronics (5 items)
10. EV - Tractive Drive (2 items)
11. Fasteners, Fluid, Fuel System, Hardware
12. Misc, Pedals, Plumbing, Raw Materials
13. Safety, Seals, Sensors, Sheet Material
14. Shifter, Springs, Steering, Suspension
15. Tire (50+ items), Wheel (35+ items)

**Data Format:**
```csv
Material,Supplier,Category,Table Price,Unit 1,Unit 2,C1,C2,Size1,Size2
"Bearing Ball, Steel",Any,Bearings,[C1]*[Size1]+[C2],mm,,0.195,3.25,0
"Brake Caliper, AP",AP,Brake System,8125,unit,,,,,
"Aluminum, Normal",Any,Raw Material,273,kg,,,,,
```

---

## ⚠️ Problems Encountered

### 1. **Production Build Only**
- No React source code available
- All logic minified in `assets/index-DQ0lPwaa.js`
- Cannot edit materials directly

### 2. **Injection Attempts Failed**
Tried multiple approaches:
- ❌ DOM manipulation after React render
- ❌ setInterval polling
- ❌ MutationObserver watching
- ❌ Event listener triggers
- ❌ Button-based manual load

**Why they failed:**
- React re-renders overwrite DOM changes
- Dropdowns not detectable by content pattern
- Timing issues between script load and React hydration

### 3. **CSV Integration Issues**
- Cannot parse CSV directly in browser reliably
- Formula calculations need special handling
- Size inputs required for formula-based materials

---

## ✅ Current Solutions

### Solution 1: materials-database.js
**Generated file with 898 materials in JS format:**
```javascript
window.completeMaterialDatabase = {
  "Bearing Ball, Steel": { 
    formula: "[C1]*[Size1]+[C2]", 
    c1: 0.195, c2: 3.25, 
    unit: "mm", 
    category: "Bearings" 
  },
  "Brake Caliper, AP, CP2577": { 
    price: 8125, 
    unit: "unit", 
    category: "Brake System" 
  },
  // ... 898 total items
};
```

### Solution 2: simple-version.html
**New clean implementation:**
- Pure HTML/JavaScript (no React)
- Direct materials data embedding
- Currently has 40 sample materials
- Can be expanded to full 898

**Features:**
- ✅ Clean grey background
- ✅ Material dropdowns by category
- ✅ Auto cost calculation
- ✅ Add/Delete rows
- ✅ Grand total display

---

## 📈 What Works Now

### 1. **Process Costs** ✅
**File:** `CostTable_Processes_2025.csv` (152 items)
**Status:** Successfully injected in `index.html`

**Working Features:**
- Die Casting, Welding, Machining
- All 152 processes with unit costs
- Comma-formatted costs (₹1,234.56)
- localStorage persistence

### 2. **GitHub Pages Deployment** ✅
**Status:** Auto-deploy on every push
**URL:** https://not-brajesh.github.io/Cost-Report-App-for-Supra/

### 3. **Simple Version** ✅
**File:** `simple-version.html`
**Status:** 40 materials working perfectly

---

## 🔧 Remaining Work

### Priority 1: Complete Materials Integration
**Task:** Add all 898 materials to simple-version.html

**Approach Options:**

#### Option A: Expand simple-version.html
Add remaining 858 materials to `MATERIALS_DATA` object:
```javascript
const MATERIALS_DATA = {
  "Bearings": [ /* 33 items */ ],
  "Brake System": [ /* 100+ items */ ],
  // ... all 37 categories
};
```

**Pros:**
- Simple, no build process
- Easy to modify
- Fast loading

**Cons:**
- Large file size
- Manual data entry required

#### Option B: Load CSV Dynamically
Load `CostTable_Materials_2025.csv` at runtime:
```javascript
fetch('CostTable_Materials_2025.csv')
  .then(r => r.text())
  .then(parseCSV);
```

**Pros:**
- Data stays in CSV format
- Easy updates

**Cons:**
- CORS issues on GitHub Pages
- Async loading complexity

#### Option C: Build New React App
Create fresh React app with source code:
```
src/
├── components/
│   ├── MaterialsTable.jsx
│   ├── PartsTable.jsx
│   └── CostCalculator.jsx
├── data/
│   └── materials.json       ← 898 items
└── App.jsx
```

**Pros:**
- Modern, maintainable
- Full control

**Cons:**
- Time consuming
- Need to recreate all features

---

## 📋 Recommendation

**Best Path Forward:**

1. **Complete simple-version.html** (Quick win - 1-2 days)
   - Add all 898 materials
   - Add Parts section
   - Add Processes section
   - Add PDF export

2. **Deploy as main app** (Replace index.html)
   - Simple version becomes primary
   - Rename to index.html
   - Keep old as backup

3. **Future enhancement** (Later)
   - Build new React version
   - Admin panel for CSV uploads
   - Formula calculator UI

---

## 💻 Technical Implementation Details

### Formula Calculation System
Materials with formulas need size inputs:

```javascript
// Example: Bearing Ball, Steel
// Formula: [C1]*[Size1]+[C2]
// C1=0.195, C2=3.25
// If Size1 (diameter) = 10mm:
// Cost = 0.195 * 10 + 3.25 = ₹5.20

function calculateCost(material, inputs) {
  if (material.formula) {
    // Parse formula and calculate
    return eval(material.formula
      .replace('[C1]', material.c1)
      .replace('[C2]', material.c2)
      .replace('[Size1]', inputs.size1)
    );
  }
  return material.price; // Fixed price
}
```

### Data Format Conversion
```
CSV → JS Object → Dropdown Options

CSV: "Bearing, Ball, Deep Groove",Bearings,[C1]*...,mm,6.5,32.5
↓
JS: { name: "Bearing, Ball, Deep Groove", category: "Bearings", formula: "...", c1: 6.5, c2: 32.5 }
↓
HTML: <optgroup label="Bearings"><option>Bearing, Ball... - [Formula]</option></optgroup>
```

---

## 📊 Project Metrics

| Metric | Value |
|--------|-------|
| Total Materials | 898 |
| Total Processes | 152 |
| Categories | 37 |
| GitHub Commits | 15+ |
| Attempted Solutions | 8 |
| Working Solutions | 2 |

---

## 🚀 Next Steps (Action Items)

### Immediate (Today):
1. ✅ Test simple-version.html live
2. ✅ Verify 40 materials load correctly
3. ✅ Check cost calculations

### Short-term (This week):
1. 📌 Add remaining 858 materials to simple-version.html
2. 📌 Add Parts section (from CSV)
3. 📌 Add Processes section
4. 📌 Add PDF export feature

### Medium-term (Next week):
1. 📌 Replace index.html with completed simple-version
2. 📌 Test all 898 materials
3. 📌 Add formula input fields (for formula-based materials)
4. 📌 Deploy to production

### Long-term (Future):
1. 📌 Build admin dashboard
2. 📌 CSV upload functionality
3. 📌 User authentication
4. 📌 Report templates

---

## 📝 Conclusion

**Status:** 60% Complete

**What's Working:**
- ✅ GitHub Pages deployment
- ✅ Process costs (152 items)
- ✅ Basic UI framework
- ✅ Simple version prototype (40 materials)

**What's Pending:**
- ⚠️ Complete materials integration (858 remaining)
- ⚠️ Formula calculator UI
- ⚠️ PDF/Excel export
- ⚠️ Parts & Processes sections in simple version

**Recommendation:** 
Proceed with completing **simple-version.html** as the primary solution. It's clean, maintainable, and can handle all 898 materials without build complexity.

---

**Report Generated:** April 30, 2026  
**By:** AI Assistant for SUPRA Cost Report Project  
**Contact:** GitHub Issues at https://github.com/not-brajesh/Cost-Report-App-for-Supra
