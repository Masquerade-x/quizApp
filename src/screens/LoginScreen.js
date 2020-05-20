import React,{useState, useEffect} from 'react';
import { View, Text,TextInput, StyleSheet,AsyncStorage,RefreshControl,ScrollView, ImageBackground } from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function LoginScreen({navigation}) {
    let[email,setEmail]=useState('');
    let[password,setPassword]=useState('');
    let[userInfo,setUserInfo]=useState('')
    
  
    // Set an initializing state whilst Firebase connects
    let [initializing, setInitializing] = useState(true);
    let [user, setUser] = useState();

    function onAuthStateChanged(user){
        setUser(user);
        if(initializing) setInitializing(false);
    }

    useEffect(()=>{
        let subscribe = auth().onAuthStateChanged(onAuthStateChanged);
        return subscribe;
    },[])


     async function Login(){
        try{
            await auth().signInWithEmailAndPassword(email,password).then(()=>navigation.navigate('Home'))
        }catch(error){
            console.log(error);
        }

    }

     return (
<ImageBackground source={require('../assets/green.jpg')} style={styles.img}> 
      <View style={styles.title}>
        <Text style={{color:'white',fontSize:40}}>Login</Text>
      </View>
        <View style={styles.form}> 
            <View style={styles.email}>
                <TextInput label='Email' style={styles.textInput}
                placeholderTextColor="white" 
                placeholderTextSize='40'
                onChangeText={e=>setEmail(e)} 
                placeholder='Enter Email'
                 autoCapitalize="none"
                value={email}/>
                <View style={[styles.line,styles.linePlace1]} />
                <View style={[styles.circle,styles.semicircle]} />
            </View>
           <View style={styles.password}>
                <TextInput label='Password' style={styles.textInput}
                 secureTextEntry 
                 placeholderTextColor="white" 
                 placeholder='Enter Password'
                 onChangeText={pass=>setPassword(pass)} 
                 autoCapitalize="none"
                 value={password}></TextInput>
                <View style={[styles.line,styles.linePlace2]} />
                <View style={[styles.circle2,styles.semicircle]} />
                <View style={[styles.line,styles.linePlace3]} />
                <View style={[styles.circle3,styles.semicircle]} />
            </View>
                <View style={styles.btnText}>
                    <TouchableOpacity onPress={Login} style={styles.touch}>
                      <Text style={{fontSize:22,color:'white'}}>Login</Text>
                    </TouchableOpacity>
                      <View style={[styles.line,styles.linePlace4]} />  
                </View>
                <View style={styles.join}>
                    <TouchableOpacity  style={styles.joinBtn} onPress={()=>navigation.navigate('Signup')}>
                      <Text style={{color:'white',fontSize:25}}>Join Us !</Text>
                    </TouchableOpacity>
                </View>
            </View>
               
          <View styles={styles.owner}>
            <Text style={{alignSelf:'flex-end',color:'white',marginEnd:10}}>
              &#xA9;Masquerade
             </Text> 
          </View>
      </ImageBackground>
    )
  }

  let styles= StyleSheet.create({
      img:{
          flex:1,
        },
        title:{
          alignItems:'center',
          justifyContent:'center',
          flex:1
        },
        form:{
            flex:3,
           justifyContent:'center',
          },
          email:{
            alignItems:'center',
            marginBottom:25,
          },
          password:{
            alignItems:'center',
            marginBottom:40,
          },
          textInput:{
            width: responsiveWidth(70),
            fontSize:18,
            color:'white',
            textAlign:'center',
          },
          line:{
              height:2,
              backgroundColor:'white',
          },
          linePlace1:{
            width:responsiveWidth(73),
            top:-64,
            right:16
          },
          linePlace2:{
            width:responsiveWidth(65),
            top:-62,
            left:1
          },
          linePlace3:{
            width:responsiveWidth(65),
            top:14,
            left:1
          },
          linePlace4:{
            width:responsiveWidth(73),
            top:21,
            left:40
          },
          circle: {
            borderTopRightRadius: 60,
            borderBottomRightRadius:60,
            borderLeftWidth:0,
            right:30,
            top:-15.2
          },
          circle2: {
            borderTopLeftRadius: 60,
            borderBottomLeftRadius:60,
            borderRightWidth:0,
            left:32,
            top:-13,
            
          },
          circle3:{
            borderTopRightRadius: 60,
            borderBottomRightRadius:60,
            borderLeftWidth:0,
            right:30,
            top:65
          },
          semicircle:{
            width:responsiveWidth(10),
            height: 80,
            borderColor:'white',
            borderWidth:2,
            position:"absolute",
          },
          touch:{
            alignItems:'center',
            justifyContent:'center'
          },
          join:{
            marginTop:100,
            alignItems:'center',
            justifyContent:'center'
          },
          joinBtn:{
            borderColor:'white',
            borderRadius:30,
            borderWidth:2,
            width:responsiveWidth(60),
            height:responsiveHeight(7),
            alignItems:'center',
            justifyContent:'center'
          }
        })