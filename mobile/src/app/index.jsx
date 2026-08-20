import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import Cactus from "./components/decorationObject"
import CustomButton from "./components/CustomButtom"
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
const WellcomePage = () => {
  return (
    
    <LinearGradient
    colors={['#143928','#096c37', '#06a154']}
    style={styles.container}
        
    >
      {/*  <Cactus colors="#08c16e64" size={60} opacity={0.6} left={60} top={0} z={1}/>   */}
      <View style={{height:'60%',marginTop:30}}>

      <Image  source={require("../../assets/images/ichat-icon.png")}
              style={{ width: 'auto', height: 220 ,top:60,position:'relative',marginBottom:18}}/>
              <View style={{backgroundColor:'transparent',alignItems:'center'}}>
               <Text style={{fontSize:26,marginTop:50,textTransform:'uppercase',
               paddingLeft:8,
                marginLeft:10,lineHeight:36
                ,padding:0,marginLeft:0,textAlign:'left',flexDirection:'column',marginLeft:12,textDecorationColor:'white'}}>
                   Join Families & Friends Everywhere, AnyWhere on ichat
                   </Text>
                 </View>
                 
           {/*   <Cactus colors="#08c16e64" size={60} opacity={0.6} left={60} top={280}/>  */} 
      </View>
   {/*    <View style={styles.welcomeTop}>
       {/*  <View  style={{flexDirection:'column',marginRight:21,top:20}}>
           <Cactus colors="#32bd7f" size={80} opacity={0.2}/> 

        </View> 
         
         <Text>Welcome screeen</Text>
     

      </View>
 */}
   {/*    <DecorativeObject style={{with:100,height:120}}/> */}
   {/*  <Cactus colors="#32bd7f" size={100} opacity={0.2} top={10}/> 
     <Cactus colors="#61e5aa" size={80} opacity={1} left={300} top={190}/> 

     */}
     <Cactus colors="#08c16e64" size={120} opacity={0.8} left={60} top={280}/>  

     <View style={{flexDirection:'column',height:100,alignItems:'center'}}>
      <TouchableOpacity style={styles.getStartedBtn}>
        <Text style={styles.getStarted}>Get Started</Text>
      </TouchableOpacity>
       
     
       
      
     </View>
 
  
     
  
{/* 
    <CustomButton
      style={styles.nextBtn}
      color='white'
      textColor='black'
      radius={4}
    
      
      onPress={()=>router.push("/sign_up")}>
        <Text>Get started...</Text>
      </CustomButton> */}
   

      
      
     
    </LinearGradient >
   
  )
}

export default WellcomePage

const styles = StyleSheet.create({
    container:{
        flex:1,
        position:'relative'
        
    },
    welcomeTop:{
      width:"auto",
      height:'auto'
    },
    nextBtn:{
      marginHorizontal:20,
      position:'absolute'
    },
    getStartedBtn:{
      padding:12,
      backgroundColor:'#fff',
      borderRadius:4,
      borderWidth:0,
       width:220, 
       shadowColor:'#000',
      flexDirection:'row',
      alignContent:'center',
      justifyContent:'center',
      color:"#black",
      shadowOpacity: 0.8,
      shadowRadius: 12,
    // Android
      elevation:10,
     
    },
    getStarted:{
      fontSize:24,
      color:'#000000',
      fontWeight:400,
    
      
    }
    
})