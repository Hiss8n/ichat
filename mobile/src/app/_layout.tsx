import { Color, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar"
import { Platform } from "react-native";

export default function RootLayout() {


  
  return(
     <>
  <Stack  screenOptions={{headerShown:false}}>
    <Stack.Screen name="index"/>
    <Stack.Screen name="(auth)"  />
    <Stack.Screen name="(tabs)"  />
    
  </Stack>
   <StatusBar
   style="auto"
     /* style={Platform.OS==='ios'?"light":'dark'} */
    

      />
       </>
  )
 
}
