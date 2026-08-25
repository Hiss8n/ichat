import { Color, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar"
import { useEffect } from "react";
import {GoogleSignin} from  '@react-native-google-signin/google-signin';
export default function RootLayout() {

    useEffect(() => {
    GoogleSignin.configure({
      // Pass the WEB client ID here (do NOT use the Android client ID here)
      webClientId: '702609845604-cagesp3r8tc73mm1vnaino542r7t74od.apps.googleusercontent.com', 
      offlineAccess: false, // If you need a refresh token to access the Google API from your backend
      profileImageSize: 120,
    

    });
  }, []);



  
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
