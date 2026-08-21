import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabLayout() {


  return (
    <SafeAreaView style={{flex:1}}> 
    <NativeTabs>
        {/* chat Home */}
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Chat</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house.fill" md="go" />
      </NativeTabs.Trigger>
        {/* Go places */}
      <NativeTabs.Trigger name="go">
        <NativeTabs.Trigger.Icon sf="chair.fill" md="go" />
        <NativeTabs.Trigger.Label>Go</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
        {/* MOods */}
      <NativeTabs.Trigger name="moods">
        <NativeTabs.Trigger.Icon sf="signature.th" md="moods" />
        <NativeTabs.Trigger.Label>moods</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
       {/* Teams */}
      <NativeTabs.Trigger name="teams">
        <NativeTabs.Trigger.Icon sf="person.crop.circle.badge.minus" md="teams" />
        <NativeTabs.Trigger.Label>Teams</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

    </NativeTabs>
    
</SafeAreaView>
    

  );
}
