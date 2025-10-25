# Next.js Project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## How to Run Locally

First, clone the repository:

git clone <your-repository-url>
cd <your-project-name>

Then install dependencies:

npm install

Create a `.env.local` file in the root directory and add your environment variables:

NEXT_PUBLIC_API_KEY=your_api_key_here

Finally, run the development server:

npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Tech Stack

**Frontend:**
- **Next.js 15** - React framework with App Router for server-side rendering and optimal performance
- **TypeScript** - Type safety and better developer experience
- **React 19** - Latest React features and improved performance
- **Tailwind CSS** - Utility-first CSS for rapid UI development

**Why this stack:**
- Next.js provides excellent performance with automatic code splitting and optimized builds
- TypeScript catches errors early and improves code maintainability
- App Router enables modern React patterns with Server Components
- Tailwind speeds up development while maintaining consistent design

## Animation Approach

Animations are kept smooth by:
- Using CSS transforms and opacity for GPU-accelerated animations
- Leveraging `will-change` property for elements that will animate
- Implementing `requestAnimationFrame` for JavaScript-driven animations
- Avoiding layout thrashing by batching DOM reads and writes
- Using Framer Motion or CSS transitions for 60fps animations
- Optimizing re-renders with React.memo and useMemo where appropriate

## Backend & Secrets Management

**Backend Choice:**
- Next.js API Routes for serverless backend functions
- Server Components for data fetching directly in components
- Server Actions for form submissions and mutations

**Secrets Handling:**
- Environment variables stored in `.env.local` (never committed)
- Production secrets managed through Vercel Environment Variables
- API keys accessed only in Server Components or API Routes
- Client-side code never exposes sensitive credentials
- `.gitignore` configured to exclude all environment files

## Learn More

To learn more about Next.js:
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.