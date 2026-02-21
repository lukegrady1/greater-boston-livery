### STEP 1: INITIALIZATION & DESIGN LAW
Before writing a single line of code or configuring the project, you MUST read and internalize the Anthropic Frontend Design Skill. This is the absolute design law for this project.
Run: `cat skills/skills/frontend-design/SKILL.md` (or the equivalent path on the main branch of the anthropics/skills repo).

### 1. PROJECT OVERVIEW & VISION
Build a premium, high-conversion multi-page website for **Greater Boston Livery** (formerly Greater Boston Coach). 
- **Target Audience:** Corporate executives, luxury wedding planners, and high-net-worth individuals in the New England area.
- **Emotional Tone:** "Quiet Luxury." The site should feel reliable, exclusive, and effortless.
- **Design Philosophy:** Inspired by the "Old Money" aesthetic—think Waldorf Astoria meets modern Tesla minimalism. High-contrast typography, generous white space, and cinematic motion.

### 2. RESEARCH & CONTENT GATHERING
Perform a deep-crawl and analysis of the following resources to extract brand voice, service lists, vehicle specs, and customer testimonials:
- Current Site: https://greaterbostonlivery.com/
- Historical Context/Reviews: https://www.yelp.com/biz/greater-boston-coach-hanover
- **Key Task:** Extract real reviews. When implementing them, attribute them as "First Name + Last Initial." Ensure the transition from "Greater Boston Coach" to "Greater Boston Livery" is addressed naturally in the "About" or "Footer" sections to maintain SEO equity and customer trust.

### 3. TECH STACK (NON-NEGOTIABLE)
- **Framework:** React with Vite (TypeScript Strict Mode)
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion (Primary), GSAP (for complex timelines if needed)
- **Icons:** Lucide React
- **Routing:** React Router DOM
- **Additional Libraries:** - `lenis`: For smooth, cinematic inertial scrolling.
    - `shadcn/ui`: For accessible, high-end primitives (Dialogs, Forms, Accordions).
    - `react-helmet-async`: To handle SEO metadata for each route.
    - `clsx` & `tailwind-merge`: For clean dynamic class management.

### 4. DESIGN SYSTEM SPECIFICATION
- **Color Palette:**
    - Primary: `Midnight Navy` (#0A192F)
    - Secondary: `Rich Black` (#020202)
    - Accent: `Champagne Gold` (#C5A059)
    - Neutral: `Silver Satin` (#E5E5E5)
    - Background: `Off-White` (#F9F9F9)
- **Typography:**
    - Headings: `Playfair Display` (Serif) - Elegant and authoritative.
    - Body: `Inter` (Sans-Serif) - Highly legible and modern.
- **Spacing/Borders:**
    - Use a strict 4px/8px grid.
    - Border Radius: `2px` (Sharp, professional corners) or `full` for specific pill-buttons.

### 5. FILE & FOLDER ARCHITECTURE
```text
src/
├── assets/          # Compressed images, Boston skyline SVGs
├── components/
│   ├── ui/          # Atomic components (Buttons, Inputs)
│   ├── layout/      # Navbar, Footer, Section wrapper
│   ├── motion/      # Reveal, Stagger, Parallax wrappers
│   └── shared/      # VehicleCard, ServiceCard, ReviewCard
├── hooks/           # useScroll, useForm
├── pages/           # Home, Fleet, Services, Reviews, Contact
├── styles/          # Global CSS, Tailwind entry
├── types/           # TypeScript interfaces
└── utils/           # Lib helpers (cn, formatters)
6. COMPONENT BREAKDOWN
Navbar: Transparent on hero, blurs to Midnight Navy on scroll. Includes a "Book Now" CTA with a magnetic hover effect.

HeroSection: Full-height cinematic video or high-res image of Boston at night. Text should use a staggered letter-reveal animation.

VehicleCard: Hovering over a card should trigger a "Quick Specs" overlay (Capacity, Luggage, WiFi).

BookingForm: A multi-step form (Step 1: Ride Details, Step 2: Vehicle Selection, Step 3: Contact Info). Use Radix UI for the date/time pickers.

7. PAGE-BY-PAGE SPECIFICATION
Home: Hero -> Trusted By (Logos) -> Core Services Grid -> The "Rebrand" Story (Coach to Livery) -> Featured Fleet -> Yelp Testimonial Slider.

Fleet: A filterable grid (Sedan, SUV, Sprinter, Limo). Each vehicle needs a dedicated detail section highlighting leather quality, climate control, and privacy features.

Services: Use a "Sticky Scroll" layout where the service description stays fixed while imagery of the service (Weddings, Logan Airport, Corporate) scrolls by.

Reviews: A masonry grid of Yelp reviews. Include a "Verified Customer" badge and star ratings using the Champagne Gold accent.

8. ANIMATION & MOTION DESIGN (FRAMER MOTION)
Page Transitions: Implement a "Slide up and Fade" transition for all route changes.

Scroll Reveals: All sections must use a whileInView trigger with a 0.4s delay and a spring stiffness of 100.

Micro-interactions: Buttons should have a subtle scale: 0.98 on tap and a gold-glow shadow on hover.

Parallax: Apply a subtle parallax effect to the Boston skyline background images.

9. PERFORMANCE & ACCESSIBILITY
Images: Use lazy loading and provide alt text for all vehicle photos.

Accessibility: Ensure a 4.5:1 contrast ratio for all text. All form inputs must have associated <label> tags.

Reduced Motion: Wrap animations in useReducedMotion hooks to respect user system settings.

10. STRETCH GOALS & POLISH
Custom Cursor: Implement a custom circle cursor that expands when hovering over interactive elements.

Noise Overlay: Add a subtle opacity-5 noise texture over the entire site to give it a film-grain, premium tactile feel.

Live Clock: A small "Boston Local Time" indicator in the footer to emphasize local expertise.

EXECUTION STEPS
Initialize Vite project and install dependencies.

Build the Design System (Tailwind config, Global CSS).

Implement the Layout (Navbar/Footer).

Build the Home Page first to establish the visual language.

Populate Fleet and Services using the researched content.

Finalize with the Booking Form and Framer Motion polish.