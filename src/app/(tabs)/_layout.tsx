import { Tabs } from 'expo-router/js-tabs';

import { TabBar } from '@/components/ui/tab-bar';

export default function TabsLayout() {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="activity" />
      <Tabs.Screen name="insights" />
      <Tabs.Screen name="budgets" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}
