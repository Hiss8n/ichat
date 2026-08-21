import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Label, router } from 'expo-router'
import {LinearGradient} from "expo-linear-gradient"
import {Image} from "expo-image"
import { SafeAreaView } from 'react-native-safe-area-context'


const signUpScreen = () => {
  return (
    <SafeAreaView  style={{flex:1}}>  
    <LinearGradient
        colors={['#143928', '#24B267', '#0AB05C']}
        style={styles.container}
      >
      <View style={styles.imageContainer}>
        <Image    source={require("../../../assets/images/signin03.jpeg")}
        style={{ width: 'auto', height: 250 ,top:0}}/>
      </View>
      {/* <LinearGradient
        colors={['#143928']}
       style={styles.signUpContainer}> */}
       <View style={{marginTop:20,flexDirection:'column',gap:12,justifyContent:'center',alignItems:'center'}}>

    
        <Text style={styles.createTxt}>Create Account</Text>


        <View style={styles.TxtInputs}>
          <Text style={{fontSize:25,color:"red",width:120,height:20}}>Name</Text>
          <TextInput placeholder='Jane ' />
        </View>
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

      <View style={{height:50,backgroundColor:'#fff'}}>

     
      <Pressable style={{backgroundColor:'black',padding:30,height:120,width:300}} onPress={()=>router.push('/(tabs)/')}>
        <Text style={{fontSize:30,color:"white"}}>Sign Up</Text>
      </Pressable>
       </View>

      
      </LinearGradient> 

      
   
   {/*  </LinearGradient> */}
    </SafeAreaView>
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
      backgroundColor:'#fff',
      width:120,
      padding:10,
      borderRadius:5
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