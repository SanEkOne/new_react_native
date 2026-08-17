import { 
    StyleSheet,
    TextInput,
    View,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Text,
    Platform,
    Button
 } from "react-native";

import PlatformLabel from "@/components/ui/platform-label";
import { SafeAreaView } from "react-native-safe-area-context";
const KeyboardScreen = ()=>{

    const buttonColor = Platform.select({
        ios:'#bd5627',
        android: '#2ca14add',
        default: '#2b609e'
    })

    // if(Platform.OS === 'ios'){
    //     console.log("This app running on IPhone")
    // }else if(Platform.OS === 'android'){
    //     console.log("This app running on Android-device")
    // }
    
    return(
        <SafeAreaView style={{padding: 5, flex: 1}}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios'? 'padding': 'height'}
            >
                <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
                    <View
                        style={styles.inner}
                    >
                        <View style={{flex: 1}}></View>
                        <PlatformLabel></PlatformLabel>
                        <Text>OS: {Platform.OS} Version: {Platform.Version}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your email"
                            placeholderTextColor="#888"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your password"
                            secureTextEntry
                            placeholderTextColor="#888"
                        />
                       <TouchableOpacity style={[styles.button, {backgroundColor: buttonColor}]}>
                        <Text style={styles.buttonText}>Login</Text>
                       </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    button:{
        backgroundColor:'#2b609e',
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 8
    },
    buttonText:{
        color: '#ffffff',
        fontSize: 16
    },
    container:{
        flex: 1,
        // borderWidth: 1
    },
    inner:{
        // borderWidth: 1,
        padding: 24,
        flex: 1,
        justifyContent: 'space-around'
    },
    input:{
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 12
    }
})

export default KeyboardScreen;