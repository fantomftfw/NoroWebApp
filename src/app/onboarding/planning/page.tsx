import { Suspense } from 'react';
import PlanningClientPage from './planning-client-page';

// A simple loading component to show while the main component is loading.
const Loading = () => (
  <div className="fixed inset-0 bg-[#0D0E10] flex items-center justify-center">
    <p className="text-white text-lg">Loading...</p>
  </div>
);

export default function OnboardingPlanningPage() {
  return (
    <Suspense fallback={<Loading />}>
      <PlanningClientPage />
    </Suspense>
  );
} 