import { Container } from "@/components/ui/container";
import { useState, useEffect } from "react";

import { useRouter } from "expo-router";

import { Image, View, StyleSheet, Text, Dimensions, useWindowDimensions, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Size {
    width: number,
    height: number
}

interface Video {
    id: number,
    title: string,
    description?: string,
    videoUrl: string,
    channel: string
}


const DimensionScreen = () => {

    const videos = [
        require('../../../assets/images/icon.png'),
        require('../../../assets/images/react-logo.png'),
        require('../../../assets/images/tutorial-web.png'),
        require('../../../assets/images/expo-badge-white.png'),
    ];
    const content: Video[] = [
        {
            id: 1,
            title: 'First video',
            videoUrl: "video1",
            channel: "First - channel"
        },
        {
            id: 2,
            title: 'Second video',
            videoUrl: "video1",
            channel: "Second - channel"
        },
        {
            id: 3,
            title: 'Third video',
            videoUrl: "video1",
            channel: "Third - channel"
        },
        {
            id: 4,
            title: 'Fourth video',
            videoUrl: "video1",
            channel: "Fourth - channel"
        },
    ];

    const router = useRouter();

    const { width: windowWidth, height: windowHeight } = Dimensions.get('window');
    const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

    const [windowSize, setWindowSize] = useState<Size>(Dimensions.get('window'))
    const [screenSize, setScreenSize] = useState<Size>(Dimensions.get('screen'))

    const dimension = useWindowDimensions();

    const isWide = dimension.width > dimension.height;

    const styles = StyleSheet.create({
        cardImageBox: {
            width: '100%',
            height: 150,
        },
        productImage: {
            width: '100%',
            height: '100%',
            objectFit: 'contain'
        },
        card: {
            borderColor: 'black',
            borderWidth: 2,
            padding: 5,
            borderRadius: 4,
        },
        cardTitle: {
            fontSize: 20,
        },
        cardChannel: {
            color: 'gray',
            fontSize: 20,
            fontWeight: 'bold',

        },

    })
    useEffect(() => {
        const onWindowChange = ({ window, screen }: {
            window: Size, screen: Size
        }) => {
            setWindowSize(window)
            setScreenSize(screen)
        }

        const screenSub = Dimensions.addEventListener('change', onWindowChange)

        return () => {
            screenSub.remove();
        }
    }, []);


    return (
        <SafeAreaView>
            <ScrollView>
                <Container style={{
                    gap: 5
                }}>
                    {content.map((item, index) => (
                        <View key={index} style={styles.card}>

                            <TouchableOpacity onPress={() => {
                                console.log("Image url: ", videos[index])
                                router.push({
                                    pathname: '/video_modal',
                                    params: {
                                        id: item.id.toString(),
                                        title: item.title,
                                        channel: item.channel.toString(),
                                        videoUrl: item.videoUrl
                                    }
                                })
                            }}>
                                <View style={styles.cardImageBox}>
                                    <Image style={styles.productImage} source={videos[index]} />
                                </View>
                                <Text style={styles.cardTitle}>{item.title}</Text>
                                <Text style={styles.cardChannel}>{item.channel}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </Container>
            </ScrollView>
        </SafeAreaView>
    )
}




export default DimensionScreen;