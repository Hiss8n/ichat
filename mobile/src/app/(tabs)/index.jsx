


import { router } from 'expo-router';
import { View,Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen() {


 

  return (
    <View>
        <Text>Home</Text>
        <TouchableOpacity
              style={styles.backBtn}
              onPress={()=>router.back()}
              >
                <Text>
                  Back 
                </Text>
              </TouchableOpacity>
    </View>
  );
}

const styles=StyleSheet.create({
      backBtn:{
      backgroundColor:'#fff',
      width:120,
      padding:10,
      borderRadius:5
    },
})
