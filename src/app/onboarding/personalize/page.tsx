import { Suspense } from 'react';
import PersonalizeClientPage from './personalize-client-page';

// A simple loading component to show while the main component is loading.
const Loading = () => (
  <div className="fixed inset-0 bg-[#0D0E10] flex items-center justify-center">
    <p className="text-white text-lg">Loading...</p>
  </div>
);

export default function OnboardingPersonalizePage() {
  return (
    <Suspense fallback={<Loading />}>
      <PersonalizeClientPage />
    </Suspense>
  );
}