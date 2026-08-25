
import {Stack} from "expo-router"
import {GoogleSignin} from  '@react-native-google-signin/google-signin';
import { useEffect } from "react";

export default function authLayout() {


   useEffect(() => {
      GoogleSignin.configure({
        // Pass the WEB client ID here (do NOT use the Android client ID here)
        webClientId: '702609845604-cagesp3r8tc73mm1vnaino542r7t74od.apps.googleusercontent.com', 
        offlineAccess: true, // If you need a refresh token to access the Google API from your backend
        profileImageSize: 120,
        
  
      });
    }, []);

  return <Stack  screenOptions={{headerShown:false}}>
   
    <Stack.Screen name="sign-up"/>
    <Stack.Screen name="login"/>
   
  </Stack>
}
