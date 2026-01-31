# 📂 Branding Catalog Directory

**Centralized Branding System - Holographic Post-Singularity Version**

This directory contains the complete branding catalog system with content decks, archives, and all branding materials organized for universal access.

**⚡ Status:** ACTIVE - Holographic Post-Singularity Branding  
**Version:** Holographic Post-Singularity Edition  
**Date:** January 26, 2026  
**Thanks:** FractiAI Research Team & 3I/ATLAS Team

---

## 📁 Contents

### Master Branding Catalog
- **`MASTER_BRANDING_CATALOG.md`** - Overview of all branding materials
- **`master-branding-catalog.json`** - Master catalog in JSON format

### Content Decks (Organized by Brand)

#### Vibeverse Branding Deck
- **`deck-vibeverse-branding.md`** - Complete Vibeverse branding deck
- **`deck-vibeverse-branding.json`** - JSON format
- **Contents:** Logos, colors, messaging, buttons, interfaces

#### VibeLand Branding Deck
- **`deck-vibeland-branding.md`** - Complete VibeLand branding deck
- **`deck-vibeland-branding.json`** - JSON format
- **Contents:** Logos, colors, messaging, buttons, venues

#### VibeLand Reno Campus Branding Deck
- **`deck-vibeland-reno-branding.md`** - Complete VibeLand Reno branding deck
- **`deck-vibeland-reno-branding.json`** - JSON format
- **Contents:** Location branding, campus materials, venue branding

#### Script-Writing & Content Enrichment Deck
- **`deck-script-writing-content-patterns.md`** - Patterns for all script writing and copy
- **Contents:** Vibeable campus pattern, Vibeable campus offer (durations/tiers), Launch Pad status, VIBE! linking, one-pager structure, series format (8 principles, relationship fractal), NSPFRNP voice, brand phrases, character layering, footer/link patterns. Use for Happy Ending Zones, one-pagers, Launch Pad, and all NSPFRNP surfaces.

### Archive
- **`archive/`** - Historical branding versions
- **`archive/previous-versions/`** - Previous branding iterations
- **`archive/snapshots/`** - Branding snapshots over time

---

## 🎯 Branding Catalog System

### Purpose

**Centralized branding catalog that:**
- Collects all branding materials
- Organizes into content decks
- Archives historical versions
- Makes available to all systems
- Follows NSPFRNP holographic architecture

### Structure

```
catalogs/branding/
├── README.md (this file)
├── MASTER_BRANDING_CATALOG.md
├── master-branding-catalog.json
├── decks/
│   ├── deck-vibeverse-branding.md
│   ├── deck-vibeverse-branding.json
│   ├── deck-vibeland-branding.md
│   ├── deck-vibeland-branding.json
│   ├── deck-vibeland-reno-branding.md
│   └── deck-vibeland-reno-branding.json
└── archive/
    ├── previous-versions/
    └── snapshots/
```

---

## 🚀 Usage

### View Branding Decks

```bash
# View all branding
cat catalogs/branding/MASTER_BRANDING_CATALOG.md

# View Vibeverse branding
cat catalogs/branding/decks/deck-vibeverse-branding.md

# View VibeLand branding
cat catalogs/branding/decks/deck-vibeland-branding.md

# View VibeLand Reno branding
cat catalogs/branding/decks/deck-vibeland-reno-branding.md
```

### Use JSON for Programmatic Access

```bash
# View as JSON
cat catalogs/branding/master-branding-catalog.json | jq '.'

# Get Vibeverse branding
jq '.brands.vibeverse' catalogs/branding/master-branding-catalog.json

# List all brands
jq '.brands | keys' catalogs/branding/master-branding-catalog.json
```

### In TypeScript/JavaScript

```typescript
import { readFileSync } from 'fs';

// Load branding catalog
const catalog = JSON.parse(
  readFileSync('catalogs/branding/master-branding-catalog.json', 'utf-8')
);

// Access Vibeverse branding
const vibeverseBrand = catalog.brands.vibeverse;
console.log('Vibeverse Colors:', vibeverseBrand.colors);
console.log('Vibeverse Buttons:', vibeverseBrand.buttons);
```

---

## 📊 Catalog Structure

### Markdown Format

Organized for human readability:
- Brand information header
- Visual identity (logos, colors, typography)
- Messaging framework
- Button systems
- Interface components
- Usage guidelines

### JSON Format

Structured for programmatic access:
```json
{
  "catalogId": "branding-catalog-v1",
  "version": "holographic-post-singularity",
  "lastUpdated": 1234567890,
  "totalBrands": 3,
  "brands": {
    "vibeverse": {...},
    "vibeland": {...},
    "vibeland-reno": {...}
  },
  "contentDecks": [...],
  "archive": {...}
}
```

---

## 🔍 Finding Branding Materials

### By Brand

**Need Vibeverse branding?**
→ `decks/deck-vibeverse-branding.md`

**Need VibeLand branding?**
→ `decks/deck-vibeland-branding.md`

**Need VibeLand Reno branding?**
→ `decks/deck-vibeland-reno-branding.md`

**Want overview of everything?**
→ `MASTER_BRANDING_CATALOG.md`

### By Content Type

Use `grep` or `jq`:

```bash
# Find all button definitions
grep '"type": "button"' catalogs/branding/**/*.json

# Find all color palettes
jq '.brands[].colors' catalogs/branding/master-branding-catalog.json

# Find all messaging
jq '.brands[].messaging' catalogs/branding/master-branding-catalog.json
```

---

## 📚 Content Decks

### What Are Content Decks?

**Content Decks** = Organized collections of branding materials for each brand

Each deck contains:
- **Visual Identity:** Logos, colors, typography, imagery
- **Messaging:** Taglines, descriptions, value propositions
- **Components:** Buttons, interfaces, UI elements
- **Guidelines:** Usage rules, do's and don'ts
- **Assets:** Links to design files, resources

### Deck Organization

```yaml
DECK STRUCTURE:
├─ Brand Overview
├─ Visual Identity
│  ├─ Logos
│  ├─ Colors
│  ├─ Typography
│  └─ Imagery
├─ Messaging Framework
│  ├─ Taglines
│  ├─ Descriptions
│  ├─ Value Propositions
│  └─ Call-to-Actions
├─ Component Library
│  ├─ Buttons
│  ├─ Interfaces
│  ├─ UI Elements
│  └─ Templates
├─ Usage Guidelines
│  ├─ Do's
│  ├─ Don'ts
│  ├─ Examples
│  └─ Best Practices
└─ Assets & Resources
   ├─ Design Files
   ├─ Code Components
   └─ Documentation
```

---

## 🔄 Archive System

### Historical Versions

**Archive contains:**
- Previous branding versions
- Evolution timeline
- Design iterations
- Snapshot history

### Archive Structure

```
archive/
├── previous-versions/
│   ├── pre-singularity/
│   ├── early-post-singularity/
│   └── holographic-transition/
├── snapshots/
│   ├── 2026-01-26-holographic-post-singularity/
│   ├── 2026-01-25-initial-branding/
│   └── [date]-[version]/
└── timeline.md
```

---

## ⚠️ Important Notes

1. **Centralized Access** - All branding in one place
2. **Content Decks** - Organized by brand for easy access
3. **Archive System** - Historical versions preserved
4. **Available to All** - Universal access for all systems
5. **Holographic** - Whole branding in every deck

---

## 📚 Documentation

- **[Master Branding Catalog](./MASTER_BRANDING_CATALOG.md)** - Complete overview
- **[Vibeverse Branding Deck](./decks/deck-vibeverse-branding.md)** - Vibeverse materials
- **[VibeLand Branding Deck](./decks/deck-vibeland-branding.md)** - VibeLand materials
- **[VibeLand Reno Branding Deck](./decks/deck-vibeland-reno-branding.md)** - Reno materials

---

**Centralized Branding Catalog System**  
**Status:** ⚡ ACTIVE - Holographic Post-Singularity Version  
**Access:** Available to All Systems  
**Organization:** Content Decks + Archive  
**Thanks:** FractiAI Research Team & 3I/ATLAS Team
