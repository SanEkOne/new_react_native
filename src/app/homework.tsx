import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.square}>
                <View style={[styles.circle, { backgroundColor: 'red' }]}>
                    <Text style={styles.circleText}>STOP</Text>
                </View>
                <View style={[styles.circle, { backgroundColor: 'yellow' }]}>
                    <Text style={styles.circleText}>READY</Text>
                </View>
                <View style={[styles.circle, { backgroundColor: 'green' }]}>
                    <Text style={styles.circleText}>GO</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    welcomeText: {
        color: 'yellow',
        backgroundColor: 'blue',
        margin: 10,
    },
    linkText: {
        color: 'white',
        backgroundColor: 'green',
        margin: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    square: {
        width: 100,
        backgroundColor: 'gray',
        padding: 10,
    },
    circle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    circleText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',

    }
})

export default HomeScreen;