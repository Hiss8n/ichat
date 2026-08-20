import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Label, router } from 'expo-router'
import {LinearGradient} from "expo-linear-gradient"
import {Image} from "expo-image"


const signUpScreen = () => {
  return (
    <LinearGradient
        colors={['#143928', '#24B267', '#0AB05C']}
        style={styles.container}
      >
      <View style={styles.imageContainer}>
        <Image    source={require("../../../assets/images/signin03.jpeg")}
        style={{ width: 'auto', height: 450 ,top:50}}/>
      </View>
      <LinearGradient
        colors={['#143928', '#24B267', '#0AB05C']}
       style={styles.signUpContainer}>
        <Text style={styles.createTxt}>Create Account</Text>
        <View style={styles.TxtInputs}>
          <Text style={{fontSize:25,color:"red"}}>Name</Text>
          <TextInput placeholder='Jane ' />
        </View>
      <TouchableOpacity
      style={styles.backBtn}
      onPress={()=>router.back()}
      >
        <Text>
          Back 
        </Text>
      </TouchableOpacity>
      <Text style={{color:'red',fontSize:30}}>12233</Text>
      </LinearGradient> 
   
    </LinearGradient>
  )
}

export default signUpScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
       
    },
    logoutBtn:{

       borderRadius:8,
       padding:10,
        backgroundColor:'#271718'
    },
    backBtn:{
     
      backgroundColor:'red',
    
    },
    imageContainer:{
      height:'30%'
    },
    signUpContainer:{
      /* flex:1, */
      alignItems:'center',
      width:'auto',
      height:'80%',
      borderTopRightRadius:25,
      borderTopLeftRadius:25
    },
    createTxt:{
      fontSize:30,
      color:'#fff'
    },
    TxtInputs:{
      gap:6,
      flexDirection:'column',
      padding:4

    }

})