import {
    View,
    Text,
    StyleSheet,
    Button,
    Alert,
    ToastAndroid,
    TouchableOpacity,
    Pressable,
    FlatList,
    ScrollView,
    TextInput
}
    from "react-native";

import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

interface Item {
    id: string,
    title: string
}

const HomeScreen = () => {
    const data: Item[] = [
        { id: '1', title: "item1" },
        { id: '2', title: "item2" },
        { id: '3', title: "item3" },
        { id: '4', title: "item4" },
        { id: '5', title: "item5" },
        { id: '6', title: "item6" },
        { id: '7', title: "item7" },
    ]
    // const data: Item[] = [
    // ]

    const [interval, setInterv] = useState(0);
    const [text, setText] = useState('')

    return (
        /**
        
        <div>Text</div>
         */
        <SafeAreaView>
            <ScrollView>

                <View style={styles.mainContainer}>
                    <Text style={styles.welcomeText}>Welcome to React Native</Text>
                    <View style={styles.containerBase}>
                        <Text style={styles.headerText}>Buttons</Text>

                        <Button
                            title="Button(Android)"
                            color="#722b48"
                            onPress={() => Alert.alert('Warning⚠️', 'You tapped this button', [
                                {
                                    text: 'Ok',
                                    onPress: () => ToastAndroid.showWithGravityAndOffset("You select: OK", ToastAndroid.LONG, ToastAndroid.BOTTOM, 1, 2),
                                    style: 'default'
                                },
                                {
                                    text: 'Cancel',
                                    onPress: () => ToastAndroid.show("You pressed: CANCEL", ToastAndroid.LONG),
                                    style: 'cancel'
                                }
                            ])}
                        />
                        <TouchableOpacity style={styles.touchable} touchSoundDisabled={true} onPress={() => console.log("Touchable press")}
                            onLongPress={() => setInterv(
                                setInterval(() => console.log("Button still pressed"), 1000)
                            )}
                            onPressOut={() => interval !== 0 ? clearInterval(interval) : console.log()}
                        >
                            <Text style={styles.touchableText}>Touchable</Text>
                            {/* <Button title="Button in button"
                    color="#ad8a18"
                    onPress={()=>console.log("Button in button")}
                />  */}
                        </TouchableOpacity>

                        <Pressable style={({ pressed }) => [
                            styles.pressableBase,
                            pressed ? styles.pressablePressed : styles.presableDefault
                        ]} onPress={() => console.log("Pressable was tapped")}>
                            <Text style={styles.touchableText}>Pressable</Text>
                        </Pressable>
                    </View>
                    <View style={styles.containerBase}>
                        <Text style={styles.headerText}>Inputs</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Type something"
                            onChangeText={setText}
                            value={text}
                            placeholderTextColor="#999"
                        />
                        <Text style={{ color: 'gray', fontSize: 16 }}>&gt; {text}</Text>

                    </View>
                    <View style={styles.flexContainer}>
                        <Text style={styles.headerText}>Flex</Text>
                        {Array.from({ length: 48 }, (_, i) => i).map((v, i) => (
                            <View key={i} style={styles.card}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: 12,
                                    fontWeight: 'bold',
                                    letterSpacing: 3
                                }}>{i}#card</Text>
                            </View>
                        ))}
                        <View style={styles.card}>
                            <View style={{
                                paddingVertical: 5,
                                backgroundColor: "#26395c",
                                width: '60%',
                                height: '50%',
                                borderTopLeftRadius: 6,
                                borderTopRightRadius: 6
                            }}></View>
                        </View>

                        {/* <View style={styles.card}>
                    <Text style={{
                        color: 'white',
                        fontSize: 12,
                        fontWeight: 'bold'
                    }}>1</Text>
                </View> */}
                    </View>

                    <View style={styles.containerBase}>
                        <Text style={styles.headerText}>Flat list</Text>
                        <FlatList
                            data={data}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <View style={styles.listItem}>
                                    <Text style={styles.listItemText}>{item.title}</Text>
                                </View>
                            )}
                            scrollEnabled={false}
                            ListEmptyComponent={
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        marginTop: 50,
                                        color: '#8e8e93',
                                        fontSize: 16
                                    }}
                                >List is empty</Text>
                            }
                        />
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerText: {
        textAlign: 'center',
        marginVertical: 10,
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#424242'
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16
    },
    listItem: {
        backgroundColor: "#f9f9f9",
        padding: 20,
        borderRadius: 10,
        borderLeftWidth: 5,
        borderLeftColor: "#722b48",
        marginVertical: 8
    },
    listItemText: {
        fontSize: 16
    },
    mainContainer: {
        padding: 5
    },
    containerBase: {
        backgroundColor: "#fff",
        padding: 5,
        margin: 5,
        borderRadius: 8,
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.9,
        shadowRadius: 10,
    },
    flexContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: "#fff",
        padding: 5,
        margin: 5,
        borderRadius: 8,
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.9,
        shadowRadius: 10,
        // justifyContent:'center',
        alignItems: 'center',
        gap: 5,
    },

    card: {
        backgroundColor: '#2c2727',
        /**
         * Box-model
         * є можливість задавати: 
         *      height, minHeight, maxHeight
         *      width, minWidth, maxWidth
         * можна також задавати розмір у відсотках, але сам розмір треба вказувати як рядок: '100%'
         */
        width: 30,
        height: 50,
        borderRadius: 4
    },
    welcomeText: {
        margin: 5,
        padding: 5,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#91345b',
        color: 'white',
        borderRadius: 8
    },
    touchable: {
        backgroundColor: "#3b9b9b",
        color: 'white',
        padding: 5,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 8
    },
    touchableText: {
        color: 'white',
        fontSize: 15,
        textTransform: 'uppercase',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    pressableBase: {
        padding: 10,
        borderRadius: 8,
        alignItems: 'center'
    },
    presableDefault: {
        backgroundColor: "#1a6e36"
    },
    pressablePressed: {
        backgroundColor: "#0e3f1e",
        transform: [{ scale: 0.98 }]
    }
})

export default HomeScreen;