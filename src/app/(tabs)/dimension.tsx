import { Container } from "@/components/ui/container";
import { useState, useEffect } from "react";

import { useRouter } from "expo-router";

import { Image, View, StyleSheet, Text, Dimensions, useWindowDimensions, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Size {
    width: number,
    height: number
}

interface Product {
    id: number,
    title: string,
    description?: string,
    imageUrl: string,
    price: number
}


const DimensionScreen = () => {

    const images = [
        require('../../../assets/images/icon.png'),
        require('../../../assets/images/icon.png'),
        require('../../../assets/images/icon.png'),
        require('../../../assets/images/icon.png'),
    ];
    const products: Product[] = [
        {
            id: 1,
            title: 'Smartphone',
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt quasi sunt amet est voluptatem laborum culpa neque ab dicta eveniet labore minima deleniti, obcaecati tempora, quae recusandae delectus vel exercitationem.',
            imageUrl: images[0],
            price: 1200.00
        },
        {
            id: 2,
            title: 'Laptop',
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt quasi sunt amet est voluptatem laborum culpa neque ab dicta eveniet labore minima deleniti, obcaecati tempora, quae recusandae delectus vel exercitationem.',
            imageUrl: images[1],
            price: 2100.00
        },
        {
            id: 3,
            title: 'Earphones',
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt quasi sunt amet est voluptatem laborum culpa neque ab dicta eveniet labore minima deleniti, obcaecati tempora, quae recusandae delectus vel exercitationem.',
            imageUrl: images[2],
            price: 100.00
        },
        {
            id: 4,
            title: 'Powerbank',
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt quasi sunt amet est voluptatem laborum culpa neque ab dicta eveniet labore minima deleniti, obcaecati tempora, quae recusandae delectus vel exercitationem.',
            imageUrl: images[3],
            price: 500.00
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
        // card:{
        //     backgroundColor:"#438a43",
        //     width: isWide ? 50: 150,
        //     height: isWide ? 50: 150,
        //     margin: 10,
        //     justifyContent: 'center',
        //     alignItems: 'center',
        //     borderRadius: 10
        // },
        //cardText: {
        //     color: 'white',
        //     fontSize: isWide ? 24 : 60
        // },
        cardImageBox: {
            width: '90%',
            height: 150,
            // borderColor: '#a03064',
            // borderWidth: 3,
            // borderRadius: 4
        },
        productImage: {
            width: '100%',
            height: '100%',
            objectFit: 'contain'
        },
        card: {
            borderLeftColor: '#a03064',
            borderLeftWidth: 3,
            borderTopColor: '#a03064',
            borderTopWidth: 3,
            padding: 5,
            borderRadius: 4,
            alignItems: 'center',
        },
        cardTitle: {
            fontSize: 20,
            textTransform: 'uppercase',

        },
        cardDescription: {
            fontSize: 16,
        },
        cardPrice: {
            color: 'darkgreen',
            fontSize: 20,
            fontWeight: 'bold',

        },
        buttonBase: {
            padding: 10,
            borderRadius: 8,
            backgroundColor: '#a03064',
            marginVertical: 5
        },
        buttonText: {
            textAlign: 'center',
            fontSize: 16,
            color: 'white',
            textTransform: "uppercase",
            fontWeight: 'bold'
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

    const cards = ['A', 'B', 'C', 'D'];

    return (
        <SafeAreaView>
            <ScrollView>
                {/* <Text>Width: {windowSize.width}{`\nHeight: ${windowSize.height}`}</Text>
            <Text>Width: {screenSize.width}{`\nHeight: ${screenSize.height}`}</Text> */}

                <Container>
                    <Text>Width: {dimension.width}{`\nHeight: ${dimension.height}`}</Text>
                </Container>

                {/* <Container style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: isWide?'flex-start': 'center'
            }}>
                {cards.map((item, index)=>(
                    <View key={index} style={styles.card}>
                        <Text style={styles.cardText}>{item}</Text>
                    </View>
                ))}
            </Container> */}
                <Container style={{
                    gap: 5
                }}>
                    {products.map((item, index) => (
                        <View key={index} style={styles.card}>
                            <View style={styles.cardImageBox}>
                                <Image style={styles.productImage} source={images[index]} />
                            </View>
                            <Text style={styles.cardTitle}>{item.title}</Text>
                            <Text style={styles.cardDescription}>{item.description}</Text>
                            <Text style={styles.cardPrice}>${item.price}</Text>
                            <TouchableOpacity style={[styles.buttonBase, { alignSelf: 'flex-end' }]}>
                                <Text style={styles.buttonText} onPress={() => {
                                    console.log("Image url: ", images[index])
                                    router.push({
                                        pathname: '/product_modal',
                                        params: {
                                            id: item.id.toString(),
                                            title: item.title,
                                            description: item.description,
                                            price: item.price.toString(),
                                            imageUrl: images[index].toString()
                                        }
                                    })
                                }}>View product</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </Container>
                <Container>
                    <TouchableOpacity style={styles.buttonBase}
                        onPress={() => {
                            router.push({
                                pathname: '/'
                            })
                        }}
                    >
                        <Text style={styles.buttonText}>Main Screen</Text>
                    </TouchableOpacity>
                </Container>
            </ScrollView>
        </SafeAreaView>
    )
}




export default DimensionScreen;