import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  ToastAndroid,
  TouchableOpacity,
  Pressable,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const HomeScreen = () => {
  const [text, setText] = useState('');
  const [itemList, setItemList] = useState<string[]>([]);
  const handleAddItem = () => {
    if (text.trim() === '') {
      alert('Enter some text!');
      return;
    }

    setItemList([...itemList, text]);
    setText('');
  };
  const handleDeleteItem = (indexToDelete: number) => {
    const updatedList = itemList.filter((_, index) => index !== indexToDelete);
    setItemList(updatedList);
  };
  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        {itemList.map((item, index) => (
          <View key={index} style={styles.listItemContainer}>
            <Text style={styles.listItem}>
              {item}
            </Text>
            <View style={styles.listItemButtonContainer}>
              <TouchableOpacity style={styles.enterButton} onPress={() => handleDeleteItem(index)}>
                <MaterialIcons name="delete" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>



      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Введите ваш текст..."
          placeholderTextColor="#888"
          onChangeText={(newText) => setText(newText)}
          value={text}
        />
        <TouchableOpacity style={styles.enterButton} onPress={handleAddItem}>
          <Text style={styles.buttonText}>Добавить</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  inputContainer: {
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  enterButton: {
    padding: 10,
    backgroundColor: '#4ac74e',
    alignSelf: 'flex-start',
    borderRadius: 8,
    margin: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
  },
  listItemContainer: {
    padding: 10,
    backgroundColor: '#54fa44',
    borderRadius: 8,
    marginBottom: 10,
  },
  listItem: {
    fontSize: 16,
  },
  listItemButtonContainer: {
    padding: 5,
  }
})

export default HomeScreen;