import { useState, useRef } from "react";
import { useAudioPlayer } from 'expo-audio'
import { useVideoPlayer, VideoView } from "expo-video";
import { StyleSheet, View, TouchableOpacity, Text, ScrollView, Animated, Easing } from "react-native";
import { Container } from "@/components/ui/container";

const MediaScreen = () => {
    const [currentVideo, setCurrentVideo] = useState(0)

    const [isVisible, setIsVisible] = useState(false);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const widthAnim = useRef(new Animated.Value(20)).current;

    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const audioPlayer = useAudioPlayer(require('../../../assets/audio/audio.mp3'))

    const videos = [
        require(`../../../assets/videos/test.mp4`)
    ]

    const player = useVideoPlayer(videos[currentVideo], player => {
        player.loop = true;
    })

    const toggleBar = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        const targetOpacity = isVisible ? 0 : 1;
        const targetWidth = isVisible ? 20 : 400;

        if (!isVisible) {
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: targetOpacity,
                    duration: 100,
                    useNativeDriver: false,
                }),
                Animated.timing(widthAnim, {
                    toValue: targetWidth,
                    duration: 3000,
                    useNativeDriver: false,
                    easing: Easing.out(Easing.quad),
                })
            ]).start();

            timerRef.current = setTimeout(() => {
                audioPlayer.play();
                timerRef.current = setTimeout(() => {
                    audioPlayer.pause();
                }, 500);
                player.play();
            }, 3100);

        }

        else {
            player.pause();

            Animated.parallel([
                Animated.timing(widthAnim, {
                    toValue: targetWidth,
                    duration: 1,
                    useNativeDriver: false,
                    easing: Easing.out(Easing.quad),
                }),
                Animated.timing(fadeAnim, {
                    toValue: targetOpacity,
                    duration: 1,
                    useNativeDriver: false,
                })
            ]).start();
        }

        setIsVisible(!isVisible);
    };

    return (
        <ScrollView>
            <Container style={{ height: 500, paddingVertical: 15, gap: 2 }}>
                <VideoView style={styles.video} player={player} allowsPictureInPicture />
            </Container>
            <View style={styles.barContainer}>
                <Animated.View style={[styles.bar, { opacity: fadeAnim, width: widthAnim }]} />
            </View>
            <TouchableOpacity style={styles.button} onPress={toggleBar}>
                <Text style={styles.buttonText}>
                    {isVisible ? "Скрыть bar" : "Показать bar"}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    video: {
        width: '100%',
        height: '90%',
        objectFit: 'contain',
        borderRadius: 8,
        marginBottom: 5
    },
    barContainer: {
        flex: 1,
        padding: 20,
    },
    bar: {
        height: 20,
        width: 20,
        backgroundColor: "green"
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 12,
        margin: 20,
        borderRadius: 8,
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    },
})

export default MediaScreen;