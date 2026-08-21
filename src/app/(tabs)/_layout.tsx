import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer, DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from "expo-router/drawer";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const DrawerContent = (props: DrawerContentComponentProps) => {
    return (

        <View style={{ flex: 1, marginTop: 60, marginBottom: 60, padding: 5 }}>
            <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
                <DrawerItemList{...props} />
            </DrawerContentScrollView>
            <Text>React Native Lessons</Text>
            <Text>2026</Text>
            <Text></Text>
        </View>
    )
}

const TabLayout = () => {
    return (
        <SafeAreaProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Drawer
                    drawerContent={(props) => <DrawerContent {...props} />}
                    screenOptions={{
                        swipeEnabled: true,
                        swipeEdgeWidth: 100,
                        headerShown: true,
                        drawerStyle: {
                            backgroundColor: '#fff',
                            width: 250,
                            // borderWidth: 0,
                            borderColor: "#1f1f1f",
                            borderRadius: 0,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            padding: 0,
                            margin: 0
                        },
                        drawerActiveTintColor: '#4b182d',
                        drawerActiveBackgroundColor: '#f19ec2',
                        drawerItemStyle: {
                            borderRadius: 0,
                            margin: 0
                        }
                    }}
                >
                    <Drawer.Screen
                        name="index"
                        options={{
                            drawerLabelStyle: {
                                borderRadius: 0
                            },
                            drawerLabel: 'Home',
                            drawerIcon: ({ color, size }) => <Entypo name="home" size={size} color={color} />
                        }}
                    />
                    <Drawer.Screen
                        name="lists"
                        options={{
                            drawerLabel: 'Lists',
                            drawerIcon: ({ color, size }) => <FontAwesome name="list" size={size} color={color} />
                        }}
                    />
                    <Drawer.Screen
                        name="media"
                        options={{
                            drawerLabel: 'Media',
                            drawerIcon: ({ color, size }) => <MaterialCommunityIcons name="multimedia" size={size} color={color} />
                        }}
                    />
                    <Drawer.Screen
                        name="animation"
                        options={{
                            drawerLabel: 'Animation',
                            drawerIcon: ({ color, size }) => <MaterialCommunityIcons name="animation" size={size} color={color} />
                        }}
                    />
                    <Drawer.Screen
                        name="dimension"
                        options={{
                            drawerLabel: 'Dimension',
                            drawerIcon: ({ color, size }) => <MaterialCommunityIcons name="animation" size={size} color={color} />
                        }}
                    />
                    <Drawer.Screen
                        name="keyboard"
                        options={{
                            drawerLabel: 'Keyboard',
                            drawerIcon: ({ color, size }) => <Entypo name="keyboard" size={size} color={color} />
                        }}
                    />
                    <Drawer.Screen
                        name="contacts"
                        options={{
                            drawerLabel: 'Contacts',
                            drawerIcon: ({ color, size }) => <Entypo name="list" size={size} color={color} />
                        }}
                    />
                    <Drawer.Screen
                        name="storage"
                        options={{
                            drawerLabel: 'Storage',
                            drawerIcon: ({ color, size }) => <Entypo name="list" size={size} color={color} />
                        }}
                    />
                    <Drawer.Screen
                        name="rest"
                        options={{
                            drawerLabel: 'Rest',
                            drawerIcon: ({ color, size }) => <Entypo name="list" size={size} color={color} />
                        }}
                    />
                    <Drawer.Screen
                        name="avatar"
                        options={{
                            drawerLabel: 'Avatar',
                            drawerIcon: ({ color, size }) => <Entypo name="list" size={size} color={color} />
                        }}
                    />
                    <Drawer.Screen
                        name="database"
                        options={{
                            drawerLabel: 'Database',
                            drawerIcon: ({ color, size }) => <Entypo name="list" size={size} color={color} />
                        }}
                    />
                </Drawer>
            </GestureHandlerRootView>
        </SafeAreaProvider>
    )
}


export default TabLayout;