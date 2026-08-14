import { View, StyleSheet, Text } from "react-native"
const PlatformLabel = ()=>{
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Android</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#34b613',
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: 'center'
    },
    text:{
        color:'#fff',
        fontSize: 16,
        fontWeight: 'bold'
    }
})
export default PlatformLabel;