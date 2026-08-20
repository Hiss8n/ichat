import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'



const loginScreen = () => {
  return (
    <View style={styles.container}>
      
      <Pressable style={styles.logoutBtn} onPress={()=>router.push("/")} >
        <Text>To index</Text>
       </Pressable>
        
    </View>
  )
}

export default loginScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        backgroundColor:'#cfddea',
        marginTop:60    
    },
    logoutBtn:{
      
      padding:24,
      backgroundColor:'red'
    }
})