import React, { useEffect, useRef } from "react";
import { ScrollView, View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Container } from "@/components/ui/container";

const AnimateScreen = () => {

    const fadeAnim = useRef(new Animated.Value(0)).current;

    // Анімація руху блока
    const moveAnim = useRef(new Animated.Value(0)).current;

    // Анімація кольору блока
    const colorAnim = useRef(new Animated.Value(0)).current;

    // Анімація рамки у Fade animation
    const fadeBoxColorAnim = useRef(new Animated.Value(0)).current;

    const animate = (toValue: number, animateValue: Animated.Value, duration = 3000, useNativeDriver = true) => {
        Animated.timing(animateValue, {
            toValue: toValue,
            duration: duration,
            useNativeDriver: useNativeDriver
        }).start()
    }

    // інтерполяція для кольору блока
    const boxColor = colorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['#1f1f1f', '#fff']
    })

    // інтерполяція для кольору рамки
    const borderColor = fadeBoxColorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['#1f1f1f', '#fff']
    })

    // інтерполяція руху блока
    const moveInterpol = moveAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0%", "100%"]
    })

    const show = () => {
        animate(1, fadeAnim, 3000)
        animate(1, fadeBoxColorAnim, 3000, false)
    }
    const suspense = () => {
        animate(0, fadeAnim, 3000)
        animate(0, fadeBoxColorAnim, 3000, false)
    }

    return (
        <ScrollView>
            <Container>
                <Text style={styles.headerText}>Fade animation</Text>
                {/* Анімована рамка, з'являєтся коли зникає блок */}
                <Animated.View style={[styles.fadeTextContainer, {
                    borderColor: borderColor
                }]}>
                    {/* Анімована блок, зникає при натисканні на кнопку Suspense */}
                    <Animated.View style={[
                        StyleSheet.absoluteFill,
                        styles.fadeBox,
                        { opacity: fadeAnim }
                    ]} />
                    <Text style={styles.text}>stealth mode</Text>
                </Animated.View>
                <View style={{ flexDirection: 'row', gap: 3 }}>
                    <TouchableOpacity onPress={() => show()} style={[styles.buttonBase, { backgroundColor: "#a03064", marginVertical: 5 }]}>
                        <Text style={styles.buttonText}>Show</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => suspense()} style={[styles.buttonBase, { backgroundColor: "#611e3d", marginVertical: 5 }]}>
                        <Text style={styles.buttonText}>Suspense</Text>
                    </TouchableOpacity>
                </View>
            </Container>
            <Container>

                <Text style={styles.headerText}>Move animation</Text>
                <Animated.View style={
                    [styles.moveBox,
                    {
                        transform: [{
                            translateX: moveInterpol
                        }],
                        backgroundColor: boxColor
                    }]}>
                    <Text
                        style={{
                            color: "#1f1f1f",
                            textTransform: 'uppercase',
                            fontSize: 16,
                            fontWeight: 'bold'
                        }}>i'm here</Text>
                </Animated.View>
                <View style={{ flexDirection: 'row', gap: 3 }}>
                    <TouchableOpacity onPress={() => {
                        animate(1, moveAnim, 3000, false)
                        animate(1, colorAnim, 3000, false)
                    }} style={[styles.buttonBase, { backgroundColor: "#a03064", marginVertical: 5 }]}>
                        <Text style={styles.buttonText}>Move Right</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        animate(0, moveAnim, 3000, false)
                        animate(0, colorAnim, 3000, false)
                    }} style={[styles.buttonBase, { backgroundColor: "#611e3d", marginVertical: 5 }]}>
                        <Text style={styles.buttonText}>Move Back</Text>
                    </TouchableOpacity>
                </View>
            </Container>

        </ScrollView>
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
    moveBox: {
        width: 100,
        height: 100,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fadeBox: {
        backgroundColor: "#1f1f1f",
        borderRadius: 6
    },
    buttonBase: {
        flex: 1,
        padding: 10,
        borderRadius: 8
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'white',
        textTransform: "uppercase",
        fontWeight: 'bold'
    },
    fadeTextContainer: {
        height: 50,
        justifyContent: 'center',
        borderRadius: 8,
        borderColor: "#1f1f1f",
        borderWidth: 2,
    },
    text: {
        color: "#1f1f1f",
        fontSize: 20,
        textAlign: 'center',
        textTransform: "uppercase"
    }
})

export default AnimateScreen;