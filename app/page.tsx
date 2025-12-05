I have a Next.js medical appointment booking application deployed on Vercel. Currently, the app/page.tsx file shows a login form immediately when users visit the homepage.

REQUIREMENTS:
1. Add a beautiful, minimal, premium landing/homepage that users see FIRST before login
2. The landing page should have:
   - Hero section with gradient background
   - App name "MedCare Connect" with tagline
   - Brief description of what the app does (book appointments with doctors, manage health records)
   - 3 feature cards showing key benefits (Verified Doctors, Secure Platform, Easy Scheduling)
   - One prominent "Get Started" button
3. When user clicks "Get Started" button, THEN show the existing login form (don't create new page, use state management)
4. Keep ALL existing functionality intact - admin login with phone "0000", patient dashboard, appointment booking
5. Use existing Tailwind CSS classes and Lucide React icons
6. Maintain the same component imports and structure
7. DO NOT use Vite config, Vite imports, or any non-Next.js dependencies
8. Only modify the app/page.tsx file
9. Use responsive design with mobile-first approach

CONSTRAINTS:
- Only use dependencies already in package.json (Next.js 15.1.3, React 18.3.1, Lucide icons, Tailwind)
- Must work with existing components: Button, Input, StatusBadge, AppointmentModal
- Keep existing MOCK_DOCTORS and INITIAL_APPOINTMENTS imports
- Preserve admin access link
- No new files, only update app/page.tsx

Please provide the COMPLETE updated app/page.tsx file with proper TypeScript types.
