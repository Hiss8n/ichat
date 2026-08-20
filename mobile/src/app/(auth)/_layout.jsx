
import {Stack} from "expo-router"


export default function authLayout() {

  return <Stack  screenOptions={{headerShown:false}}>
    <Stack.Screen name="sign_up"/>
    <Stack.Screen name="login"/>
   
  </Stack>
}
