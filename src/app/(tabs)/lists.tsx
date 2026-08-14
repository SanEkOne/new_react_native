import { useState } from "react";
import { Container } from "@/components/ui/container";
import { View, Text, ScrollView, StyleSheet, SectionList, Image, TextInput, Button } from "react-native"
import { Dropdown } from 'react-native-element-dropdown'
import Checkbox from "expo-checkbox"


interface DropDownMenu {
    label: any,
    value: string
}

interface Character {
    id: string;
    name: string;
    class: string;
    strength: string;
    image: any;
}


const ListScreen = () => {
    const [characterName, setCharacterName] = useState('')
    const [characterClass, setCharacterClass] = useState<DropDownMenu | null>(null);
    const [characterImage, setCharacterImage] = useState<DropDownMenu | null>(null);
    const [characterStrength, setCharacterStrength] = useState('')
    const [isClassFocus, setIsClassFocus] = useState(false);
    const [isImageFocus, setIsImageFocus] = useState(false);

    const [characters, setCharacters] = useState<Character[]>([]);

    const dropDownData: DropDownMenu[] = [
        {
            label: 'class1',
            value: 'id1'
        },
        {
            label: 'class2',
            value: 'id2'
        },
        {
            label: 'class3',
            value: 'id3'
        }
    ]

    const dropDownImages: DropDownMenu[] = [
        {
            label: require('../../../assets/images/logo-glow.png'),
            value: 'img1'
        },
        {
            label: require('../../../assets/images/icon.png'),
            value: 'img2'
        },
        {
            label: require('../../../assets/images/tutorial-web.png'),
            value: 'img3'
        }
    ]


    const handleAddCharacter = () => {
        if (!characterName.trim()) {
            alert('Пожалуйста, введите имя персонажа!');
            return;
        }

        const newCharacter: Character = {
            id: Date.now().toString(),
            name: characterName,
            class: characterClass ? characterClass.label : 'Не указан',
            strength: characterStrength,
            image: characterImage ? characterImage.label : null
        };

        setCharacters(prevCharacters => [...prevCharacters, newCharacter]);

        setCharacterName('');
        setCharacterClass(null);
        setCharacterStrength('');
        setCharacterImage(null);

        console.log('Персонаж добавлен! Текущий список:', [...characters, newCharacter]);
    };




    return (
        <ScrollView>
            <View>
                <Text>Add character</Text>
            </View>
            <Container>
                <Text>Character name:</Text>
                <TextInput
                    value={characterName}
                    onChangeText={setCharacterName}
                />
            </Container>
            <Container>
                <Text>Character class:</Text>
                <Dropdown
                    placeholder={!isClassFocus ? "Select class" : "..."}
                    data={dropDownData}
                    labelField={"label"}
                    valueField={"value"}
                    value={characterClass?.value}
                    onFocus={() => setIsClassFocus(true)}
                    onBlur={() => setIsClassFocus(false)}
                    onChange={item => {
                        setCharacterClass(item);
                        setIsClassFocus(false);
                    }}
                />
            </Container>
            <Container>
                <Text>Character strength:</Text>
                <TextInput
                    value={characterStrength}
                    onChangeText={setCharacterStrength}
                />
            </Container>
            <Container>
                <Text>Character image:</Text>
                <Dropdown
                    placeholder={!isImageFocus ? "Select image" : "..."}
                    data={dropDownImages}
                    labelField={"value"}
                    valueField={"value"}
                    value={characterImage?.value}
                    onFocus={() => setIsImageFocus(true)}
                    onBlur={() => setIsImageFocus(false)}
                    onChange={item => {
                        setCharacterImage(item);
                        setIsImageFocus(false);
                    }}
                    renderLeftIcon={() => {
                        if (!characterImage) return null;
                        return (
                            <Image
                                source={characterImage.label}
                                style={styles.dropdownIcon}
                            />
                        );
                    }}
                    renderItem={(item) => (
                        <View style={styles.dropdownItem}>
                            <Image
                                source={item.label}
                                style={styles.dropdownItemImage}
                            />
                            <Text style={styles.dropdownItemText}>{item.value}</Text>
                        </View>
                    )}
                />
            </Container>
            <Container>
                <Button
                    title="Создать персонажа"
                    onPress={handleAddCharacter}
                    color="#2196F3"
                />
            </Container>

            <Container>
                <Text style={styles.headerText}>Список персонажей:</Text>
                {characters.length === 0 ? (
                    <Text>Персонажей пока нет</Text>
                ) : (
                    characters.map((char) => (
                        <View key={char.id} style={styles.characterCard}>
                            {char.image && (
                                <Image source={char.image} style={styles.dropdownItemImage} />
                            )}
                            <View>
                                <Text style={styles.label}>{char.name}</Text>
                                <Text>Класс: {char.class}</Text>
                                <Text>Сила: {char.strength}</Text>
                            </View>
                        </View>
                    ))
                )}
            </Container>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    header: {
        padding: 16,
        alignItems: 'center'
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    label: {
        marginBottom: 4,
        fontWeight: '500'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        minHeight: 40
    },
    dropdownIcon: {
        width: 30,
        height: 30,
        marginRight: 10,
        borderRadius: 4
    },
    dropdownItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        gap: 10
    },
    dropdownItemImage: {
        width: 40,
        height: 40,
        borderRadius: 6
    },
    dropdownItemText: {
        fontSize: 16
    },
    characterCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: 10,
        marginVertical: 4,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 8,
    }
})

export default ListScreen;