import { View, Text, StyleSheet  } from 'react-native';
import { Link } from 'expo-router';

const HomeScreen = () => {
  return (
    <View>
      <Text style={styles.welcomeText}>Hello world</Text>
      <Link href="/homework" style={styles.linkText}>
              Перейти к домашнему заданию 
            </Link>
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
    }
})

export default HomeScreen;