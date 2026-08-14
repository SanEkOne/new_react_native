import { Alert, View, TouchableOpacity, Image, StyleSheet, Text } from "react-native";
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
const AvatarScreen = () => {
    const STORAGE_KEY = 'user_avatar';
    const[savedImageUri, setSavedImageUri] = useState<string|null>(null);

    useEffect(()=>{
        const loadSaveImage = async ()=>{
            
                const uri = await AsyncStorage.getItem(STORAGE_KEY);
                setSavedImageUri(uri)
            
        }
        loadSaveImage()
    },[])
    const selectAndSaveImage = async()=>{
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(!permissionResult.granted){
            Alert.alert('Error','Need access to gallery');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:['images'],
            allowsEditing: true,
            quality: 0.8
        });
        if(!result.canceled && result.assets[0].uri){
            const pickedImgUri = result.assets[0].uri;
            try {
                const fileName = pickedImgUri.split('/').pop() || `photo_${Date.now()}.jpg`;
                const newPath = `${FileSystem.Paths.document.uri}${fileName}`;
                const pickedFile = new FileSystem.File(pickedImgUri);
                await pickedFile.copy(new FileSystem.File(newPath));

                await AsyncStorage.setItem(STORAGE_KEY, newPath);

                setSavedImageUri(newPath);
            } catch (error) {
                console.log(error)
                Alert.alert("Error",'Avatar is not updated');
            }
        }
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.placeholder}>
                <Text style={styles.text}>Please select avatar</Text>
                <TouchableOpacity style={styles.button} onPress={selectAndSaveImage} >
                    <Text style={styles.buttonText}>Select picture</Text>
                </TouchableOpacity>
                {savedImageUri?(
                    <Image source={{uri:savedImageUri}} style={styles.image}/>
                ):<></>}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 10
    },
    button: {
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#8b1b41',
        borderRadius: 4
    },
    buttonText: {
        fontSize: 16,
        color: 'white'
    },
    text:{
        fontSize: 16,
        color:"#666"
    },
    placeholder:{
        alignItems:'center',
        gap: 15
    },
    image:{
        width:250,
        height:250
    }
})
export default AvatarScreen;