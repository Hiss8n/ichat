import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import Cactus from "./components/decorationObject"
import CustomButton from "./components/CustomButtom"
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import { Ionicons } from "@expo/vector-icons";


const WellcomePage = () => {
  return (
    
    <LinearGradient
    colors={['#143928','#096c37', '#06a154']}
    style={styles.container}
        
    >
      {/*  <Cactus colors="#08c16e64" size={60} opacity={0.6} left={60} top={0} z={1}/>   */}
      <View style={{height:'60%',marginTop:30}}>

      <Image  source={require("../../assets/images/ichat-icon.png")}
              style={{ width: 'auto', height: 220 ,top:60,marginBottom:28,shadowColor:'#000',shadowOffset:12,shadowRadius:12}}/>
              <View style={{backgroundColor:'transparent',alignItems:'center'}}>
               <Text style={styles.introTxt}>
                   Join Families & Friends Everywhere, AnyWhere on <Text style={{color:'#ebe3e3',shadowColor:12,shadowColor:'#000', textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowRadius: 4,}}>ichat</Text> 
                   </Text>
                 </View>
                 
           {/*   <Cactus colors="#08c16e64" size={60} opacity={0.6} left={60} top={280}/>  */} 
      </View>

     <Cactus colors="#08c16e64" size={120} opacity={0.8} left={60} top={280}/>  

     <View style={{flexDirection:'column',height:100,alignItems:'center'}}>
      <TouchableOpacity style={styles.getStartedBtn} onPress={()=>router.push('/sign_up')}>
        <Text style={styles.getStarted}>Get Started</Text>
        <Ionicons name='arrow-forward-outline' size={24} color='#000' style={styles.forwardArrow}/>
      </TouchableOpacity>
        
     </View>
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
    introTxt:{
    textShadowColor: "rgba(196, 198, 198, 0.2)",
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowRadius: 4,
    fontSize:26,
    marginTop:60,
    textTransform:'uppercase',
    paddingLeft:8,
    marginLeft:10,lineHeight:36,
    padding:0,
    marginLeft:0,
    textAlign:'left',
    flexDirection:'column',
    marginLeft:12,
    textDecorationColor:'white',
    lineHeight:40

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
      flexDirection:'row',
      gap:10
     
    },
    getStarted:{
      fontSize:24,
      color:'#000000',
      fontWeight:400,
    
      
    },
    forwardArrow:{
      fontFamily:35,
      marginTop:4,
      paddingRight:1,
      shadowColor:'#000',
      shadowRadius:5,
      shadowOpacity:12
    }
    
})