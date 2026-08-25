import React, { useEffect, useState } from "react";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Touchable,
  TouchableOpacity,
} from "react-native";

import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
 MessageCircle,
  Apple,
  ArrowBigLeftIcon,
  ArrowLeft,
} from "lucide-react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import COLORS  from "../constants/color";
import { router } from "expo-router";

export default function SignUpScreen() {

   useEffect(() => {
        GoogleSignin.configure({
          // Pass the WEB client ID here (do NOT use the Android client ID here)
          webClientId: '702609845604-cagesp3r8tc73mm1vnaino542r7t74od.apps.googleusercontent.com', 
          offlineAccess: true, // If you need a refresh token to access the Google API from your backend
          profileImageSize: 120,
        });
      }, []);
  const [showPassword, setShowPassword] = useState(false);

  const inset = useSafeAreaInsets();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const updateForm = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };


  /* Google sign in implementation */

  const handleGoogle = async () => {
    console.log("*****gooooogle****")
    try {
      // Check if the device has Google Play Services available (mostly for Android)
      const serv=await GoogleSignin.hasPlayServices();
      console.log("serve",serv);
      
      // Trigger the login modal
      const userInfo = await GoogleSignin.signIn();

      
      console.log('User Info Target:', userInfo);
      // Access idToken or user profile fields here: userInfo.data.idToken
      Alert.alert('Success', `Logged in as ${userInfo.data.user.name}`);
      
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign in operation is already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Google Play Services not available or outdated');
      } else {
        console.log('Some other error happened:', error);
      }
    }
  };


  const handleSignIn = () => {
    console.log("Sign in:", form);
  };

  const handleApple = () => {
    console.log("Continue with Apple");
  };

  return (
     <SafeAreaView style={[styles.safeArea,{paddingBottom:inset.top*-1.05,paddingBottom:inset.bottom*-1.05}]}>

      <KeyboardAvoidingView
        style={{ flex: 1}}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
     {/*    <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        > */}
          <View style={styles.container}>
            <View>
              <TouchableOpacity
              style
              onPress={()=>router.push("/")}
              >
                    <ArrowLeft
               size={20}
                color={COLORS.brightGreen}
                strokeWidth={2}
              />

              </TouchableOpacity>
          
            </View>

            {/* Logo */}
            <View style={styles.logoContainer}>

            {/*   <View style={styles.logoCircle}>
                <MessageCircle
                  size={48}
                  color={COLORS.brightGreen}
                  strokeWidth={2.5}
                />

                <View style={styles.logoDots}>
                  <View style={styles.dot} />
                  <View style={styles.dot} />
                  <View style={styles.dot} />
                </View>
              </View> */}

              <Text style={styles.logoText}>
                <Text style={styles.logoGreen}>i</Text>
                Chat
              </Text>

              <Text style={styles.tagline}>
                Connect. Chat. Share.
              </Text>
            </View>

            {/* Heading */}
            <View style={styles.headingContainer}>
              <Text style={styles.title}>
                Create an account
              </Text>

              <Text style={styles.subtitle}>
                Welcome! Please sign un to continue
              </Text>
            </View>

            {/* Name */}
            <View style={styles.inputContainer}>
              <User
                size={23}
                color={COLORS.brightGreen}
                strokeWidth={2}
              />

              <TextInput
                value={form.name}
                onChangeText={(value) =>
                  updateForm("name", value)
                }
                placeholder="Full Name"
                placeholderTextColor="#9CA3AF"
                style={styles.input}
              />
            </View>

            {/* Email */}
            <View style={styles.inputContainer}>
              <Mail
                size={23}
                color={COLORS.brightGreen}
                strokeWidth={2}
              />

              <TextInput
                value={form.email}
                onChangeText={(value) =>
                  updateForm("email", value)
                }
                placeholder="Email"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
              />
            </View>

            {/* Password */}
            <View style={styles.inputContainer}>
              <Lock
                size={23}
                color={COLORS.brightGreen}
                strokeWidth={2}
              />

              <TextInput
                value={form.password}
                onChangeText={(value) =>
                  updateForm("password", value)
                }
                placeholder="Password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showPassword}
                style={styles.input}
              />

              <Pressable
                onPress={() =>
                  setShowPassword((prev) => !prev)
                }
                hitSlop={10}
              >
                {showPassword ? (
                  <EyeOff
                    size={23}
                    color="#777"
                  />
                ) : (
                  <Eye
                    size={23}
                    color="#777"
                  />
                )}
              </Pressable>
            </View>

            {/* Forgot Password */}
            <Pressable
              style={styles.forgotContainer}
              onPress={() => console.log("Forgot password")}
            >
              <Text style={styles.forgotText}>
                Forgot password?
              </Text>
            </Pressable>

            {/* Sign In Button */}
            <Pressable
              style={({ pressed }) => [
                styles.signInButton,
                pressed && styles.pressed,
              ]}
              onPress={handleSignIn}
            >
              <Text style={styles.signInText}>
                Create Account
              </Text>
            </Pressable>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />

              <Text style={styles.orText}>OR</Text>

              <View style={styles.divider} />
            </View>

            <Text style={styles.continueText}>
              Sign Up with
            </Text>

            {/* OAuth Buttons */}
            <View style={styles.oauthContainer}>

              {/* Google */}
              <Pressable
                style={({ pressed }) => [
                  styles.oauthButton,
                  pressed && styles.pressed,
                ]}
                onPress={handleGoogle}
              >
                <Text style={styles.googleIcon}>G</Text>
               {/*  <go
                 color="#000000" 
                 size={22} 
                 strokeWidth={2} 
                 /> */}

                <Text style={styles.oauthText}>
                  Google
                </Text>
              </Pressable>

              {/* Apple */}
              <Pressable
                style={({ pressed }) => [
                  styles.oauthButton,
                  pressed && styles.pressed,
                ]}
                onPress={handleApple}
              >
               {/*  <Text style={styles.appleIcon}>●</Text> */}
                <Apple 
                 color="#000000" 
                 size={22} 
                 strokeWidth={2} 
                 />

                <Text style={styles.oauthText}>
                  Apple
                </Text>
              </Pressable>

            </View>

            {/* Sign up */}
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>
                Already have an account ?
              </Text>

              <Pressable
                onPress={() =>router.push('/login')}
              >
                <Text style={styles.signupLink}>
                  {" "}Sign In
                </Text>
              </Pressable>
            </View>

          </View>
       {/*  </ScrollView> */}
    </KeyboardAvoidingView>
     </SafeAreaView> 
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor:'transparent',
    borderColor:'transparent',
    paddingBottom:-28   //This code have some errors
  },

  scrollContent: {
    flex:1,
    paddingVertical: 35,
  },

  container: {
    flex:1,
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
    backgroundColor: COLORS.white,
  /*   borderRadius: 30, */
     paddingHorizontal: 24, 
    paddingVertical: 35,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },

  /* LOGO */

  logoContainer: {
    alignItems: "center",
    marginBottom:15,
  },

 /*  logoCircle: {
    width: 90,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  }, */
/* 
  logoDots: {
    position: "absolute",
    flexDirection: "row",
    gap: 5,
    top: 30,
    left: 27,
  }, */

/*   dot: {
    width: 6,
    height: 6,
    borderRadius: 10,
    backgroundColor: COLORS.brightGreen,
  }, */

  logoText: {
    fontSize: 45,
    fontWeight: "800",
    color: COLORS.darkGreen,
    letterSpacing: -2,
  },

  logoGreen: {
    color: COLORS.brightGreen,
  },

  tagline: {
    marginTop: -3,
    fontSize: 16,
    color: "#4B5563",
    letterSpacing: 0.5,
  },

  /* HEADING */

  headingContainer: {
    alignItems: "center",
    marginBottom: 16,
  },

  title: {
    fontSize: 25,
    fontWeight: "700",
    color: COLORS.black,
    textAlign: "center",
  },

  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: COLORS.gray,
    textAlign: "center",
  },

  /* INPUTS */

  inputContainer: {
    height: 62,
    borderWidth: 1.3,
    borderColor: COLORS.lightGray,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 17,
    marginBottom: 14,
    backgroundColor: COLORS.white,
  },
  input: {
    flex: 1,
    height: "100%",
    marginLeft: 13,
    fontSize: 16,
    color: COLORS.black,
    borderRadius:1
  }, 

  /* FORGOT PASSWORD */

  forgotContainer: {
    alignItems: "flex-end",
    marginTop: -3,
    marginBottom: 12,
  },

  forgotText: {
    color: COLORS.brightGreen,
    fontSize: 14,
    fontWeight: "600",
  },

  /* SIGN IN */

  signInButton: {
    height: 40,
    borderRadius: 8,
    backgroundColor: COLORS.brightGreen,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: COLORS.brightGreen,
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  signInText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "700",
  },

  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },

  /* DIVIDER */

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 18,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.lightGray,
  },

  orText: {
    marginHorizontal: 15,
    color: "#777",
    fontSize: 14,
    fontWeight: "600",
  },

  continueText: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "600",
    color: COLORS.black,
    marginBottom: 8,
  },

  /* OAUTH */

  oauthContainer: {
    flexDirection: "row",
    gap: 15,
  },

  oauthButton: {
    flex: 1,
    height: 56,
    borderWidth: 0.5,
    borderColor: COLORS.black,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },

  oauthText: {
    color: COLORS.black,
    fontSize: 24,
    fontWeight: "400",
  },

  googleIcon: {
    fontSize: 23,
    fontWeight: "800",
    color: "#4285F4",
  },

  appleIcon: {
    fontSize: 18,
    fontSize:23,
    color: COLORS.black,
  },

  /* SIGN UP */

  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },

  signupText: {
    color: COLORS.gray,
    fontSize: 15,

  },

  signupLink: {
    color: COLORS.brightGreen,
    fontSize: 15,
    fontWeight: "700",
    
  },
});