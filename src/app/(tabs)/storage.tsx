import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Container } from "@/components/ui/container";

interface User {
    name: string;
    surname: string;
}

const StorageScreen = () => {
    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");

    const [user, setUser] = useState<User>();
    useEffect(() => {
        loadUserData();
    }, [])

    const saveUserData = async () => {
        try {
            let saveUser: User = { "name": name, "surname": surname };
            await AsyncStorage.setItem("user", JSON.stringify(saveUser));
            setUser(saveUser);
            setName("");
            setSurname("");

        } catch (error) {
            console.error("Error saving user data:", error);
        }

    }

    const loadUserData = async () => {
        try {
            const userData = await AsyncStorage.getItem("user");
            if (userData) {
                setUser(JSON.parse(userData));
            }
        } catch (error) {
            console.error("Error loading user data:", error);
        }
    }

    return (
        <View style={{flex: 1}}>
            <Container>
                <Text>Hello, {user?.name} {user?.surname}</Text>
            </Container>

            <Container style={{ padding: 10 }}>
                <View style={styles.container}>
                    <TextInput
                        placeholderTextColor={"#ccc"}
                        style={styles.textInput}
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        placeholderTextColor={"#ccc"}
                        style={styles.textInput}
                        placeholder="Surname"
                        value={surname}
                        onChangeText={setSurname}
                    />
                    <Button title="Sign In" onPress={saveUserData} />
                </View>
            </Container>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },

    textInput: {
        height: 40,
        width: '100%',
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        marginVertical: 10,
    }
})


export default StorageScreen;