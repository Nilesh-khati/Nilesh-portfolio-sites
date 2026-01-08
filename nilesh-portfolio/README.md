# Nilesh Khati - Portfolio Website

A modern, full-stack portfolio website built with Next.js 15, React Three Fiber, MongoDB, and NextAuth.

## Features

- **3D Interactive Hero Section** - Animated 3D laptop model using React Three Fiber
- **Responsive Design** - Mobile-first approach with smooth animations
- **Dark/Light Mode** - Theme toggle with system preference detection
- **Admin Dashboard** - Manage projects and contact messages
- **Contact Form** - Integrated with MongoDB for message storage
- **Dynamic Projects** - CRUD operations for portfolio projects
- **Authentication** - Secure admin access with NextAuth
- **Modern UI** - Glass morphism effects and smooth transitions

## Tech Stack

### Frontend
- Next.js 15 (App Router)
- React 18
- TypeScript
- Tailwind CSS v4
- Framer Motion
- React Three Fiber
- SWR

### Backend
- Next.js API Routes
- MongoDB
- NextAuth.js

## Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB database (local or Atlas)

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create a `.env.local` file in the root directory:
\`\`\`env
MONGODB_URI=your_mongodb_connection_string
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
\`\`\`

4. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Admin Access

Navigate to `/admin/login` and use your configured credentials to access the admin dashboard.

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── admin/             # Admin dashboard pages
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── sections/          # Page sections
│   ├── admin/             # Admin components
│   └── ui/                # Reusable UI components
├── lib/                   # Utility functions
│   ├── mongodb.ts         # Database connection
│   └── models/            # Data models
└── src/
    └── content/           # Static content (resume.json)
\`\`\`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production

Make sure to set all environment variables in your hosting platform:
- `MONGODB_URI`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL` (your production URL)

## Customization

### Update Personal Information

Edit `src/content/resume.json` to update your personal information, experience, skills, education, and projects.

### Styling

The design system is configured in `app/globals.css` using Tailwind CSS v4 theme tokens. Modify the color scheme and design tokens to match your brand.

## License

MIT License - feel free to use this project for your own portfolio!

## Contact

Nilesh Khati - [nileshkhati@gmail.com](mailto:nileshkhati@gmail.com)

Project Link: [https://github.com/yourusername/portfolio](https://github.com/yourusername/portfolio)
