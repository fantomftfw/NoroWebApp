import { Suspense } from 'react';
import WelcomeClientPage from './welcome-client-page';

// A simple loading component to show while the main component is loading.
const Loading = () => (
  <div className="fixed inset-0 bg-[#0D0E10] flex items-center justify-center">
    <p className="text-white text-lg">Loading...</p>
  </div>
);

export default function OnboardingWelcomePage() {
  return (
    <Suspense fallback={<Loading />}>
      <WelcomeClientPage />
    </Suspense>
  );
} 