# Cyberpunk Portfolio Hero Section - UI Design Description

## Overall Layout (16:9 Aspect Ratio)

```
┌─────────────────────────────────────────────────────────────┐
│                    DARK SPACE BACKGROUND                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  LEFT SIDE (Text Content)    │  RIGHT SIDE (3D Scene) │  │
│  │                              │                        │  │
│  │  Hi, my name is              │  ┌──────────────────┐  │  │
│  │  NILESH KHATI                │  │                  │  │  │
│  │  Full Stack Developer        │  │   3D CYBERPUNK    │  │  │
│  │                              │  │      SCENE       │  │  │
│  │  [Tagline text]              │  │                  │  │  │
│  │                              │  │  - Avatar        │  │  │
│  │  [MCA Badge] [Location Badge]│  │  - Project Cards │  │  │
│  │                              │  │  - MongoDB Orbs  │  │  │
│  │  📧 Email  📞 Phone  📍 Loc  │  │  - Code Matrix   │  │  │
│  │                              │  │  - Glitch Icons  │  │  │
│  │  [GitHub] [LinkedIn] [Email] │  │                  │  │  │
│  │                              │  └──────────────────┘  │  │
│  │  [Get In Touch Button]      │                        │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│                    [Scroll Indicator ↓]                    │
└─────────────────────────────────────────────────────────────┘
```

## Color Scheme

- **Background**: Deep dark space (#0a0a0f → #1a1a2e → #0f0f1e gradient)
- **Primary Accent**: Cyan (#06b6d4)
- **Secondary Accent**: Purple (#8b5cf6)
- **Tertiary Accent**: Pink (#ec4899)
- **Text**: White/Gray with gradient effects
- **Neon Glow**: Cyan, Purple, Pink

## Left Side - Text Content

### Typography Hierarchy:
1. **Greeting**: "Hi, my name is" - Cyan, Medium weight
2. **Name**: "NILESH KHATI" - Large (5xl-7xl), Gradient (Cyan→Purple→Pink)
3. **Title**: "Full Stack Developer" - Large (3xl-5xl), Gradient (Cyan→Blue→Purple)
4. **Tagline**: Regular text, Gray-300
5. **Badges**: Small rounded pills with borders

### Elements:
- Clean spacing between sections
- Smooth fade-in animations
- Hover effects on social icons
- Gradient CTA button with glow

## Right Side - 3D Scene

### 3D Elements (from center outward):
1. **Central Avatar**: 
   - Young Indian male character
   - Hoodie with React/Node.js/MongoDB logos
   - Typing → Standing animation
   - Floating effect

2. **Project Cards** (4 cards floating around):
   - Top Left: ModelSuite.ai Video Editor (Purple)
   - Top Right: Bulk Invite System (Cyan)
   - Bottom Left: Course Builder (Pink)
   - Bottom Right: E-commerce MERN App (Green)
   - Holographic glow, particle bursts on hover

3. **Background Elements**:
   - MongoDB Orbs (3 green orbs orbiting)
   - Code Matrix particles (Tailwind CSS code)
   - Glitch Icons (GitHub, Postman, VS Code)
   - Stars background
   - God rays from top

### Visual Effects:
- Volumetric lighting
- Lens flares
- Fog for depth
- Neon glows
- Smooth auto-rotation

## Responsive Design

- **Desktop (lg)**: 2-column grid, full 3D scene
- **Tablet (md)**: Stacked layout, smaller 3D scene
- **Mobile (sm)**: Single column, simplified 3D or fallback

## Animations

1. **Page Load**: Fade-in from left (text) and scale-in (3D scene)
2. **Avatar**: Typing animation → transitions to confident pose
3. **Cards**: Floating, rotating, particle bursts on hover
4. **Icons**: Glitch effects, random position shifts
5. **Scroll Indicator**: Bouncing arrow at bottom

## Performance Optimizations

- Reduced particle counts
- Optimized lighting
- Efficient 3D rendering
- Suspense boundaries
- Lazy loading


