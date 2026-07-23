import { StyleSheet, View, TouchableOpacity, Text, ScrollView, Animated, Easing, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Container } from "@/components/ui/container";
import { useVideoPlayer, VideoView } from "expo-video";

const ProductDetailScreen = () => {
    const Videos: Record<string, any> = {
        video1: require('../../assets/videos/test.mp4'),
    }

    const router = useRouter();
    const { id, title, channel, videoUrl } = useLocalSearchParams<{ id: string, title: string, channel: string, videoUrl: any }>();
    const videoLink = Videos[videoUrl];
    const player = useVideoPlayer(videoLink, player => {
        player.loop = true;
    })


    return (
        <SafeAreaView>
            <View>
                <Container style={{ height: 500, paddingVertical: 15, gap: 2 }}>
                    <VideoView style={styles.video} player={player} allowsPictureInPicture />
                </Container>
                <Text style={styles.titleText}>{title}</Text>
                <Text style={styles.channelText}>{channel}</Text>
            </View>
            <Button color="#803da7" title="Back" onPress={() => {
                router.back()
            }} />
        </SafeAreaView>
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
    titleText: {
        fontSize: 20,
    },
    channelText: {
        color: 'gray',
        fontSize: 20,
        fontWeight: 'bold',
    },
})

export default ProductDetailScreen;