import { Redirect } from 'expo-router';

// Until onboarding state is stored (data-layer milestone), every launch starts at Welcome.
export default function Index() {
  return <Redirect href="/welcome" />;
}
