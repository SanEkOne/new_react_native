import { View, Text, Button, StyleSheet, TextInput, FlatList, Touchable, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Container } from "@/components/ui/container";
import { dbManager, Product } from "@/lib/bd";
import { red } from "react-native-reanimated/lib/typescript/Colors";

const DatabaseScreen = () => {
    const [products, setProducts] = useState<Product[]>([]);

    const [productTitle, setProductTitle] = useState<string>("");
    const [productPrice, setProductPrice] = useState<string>();
    const [productDescription, setProductDescription] = useState<string>("");

    const [warning, setWarning] = useState<string>("")

    const [method, setMethod] = useState<boolean>(true);
    const [currentId, setCurrentsId] = useState<string>("");

    useEffect(() => {
        const setup = async () => {
            await dbManager.init();
            await loadProducts();
        }

        setup();
    }, []);

    const loadProducts = async () => {
        const list = await dbManager.getAllProducts();
        setProducts(list)
    }

    // const addProduct= async() => {
    //     await dbManager.addProduct(
    //         `Product-${Math.floor(Math.random()*100)}`,
    //         Math.floor(Math.random()*100)
    //     )
    //     await loadProducts();
    // }

    const addProduct = async () => {
        if (!productTitle || !productPrice) {
            setWarning("Заполните данные!");
            return;
        }

        const priceNumber = parseFloat(productPrice);

        if (isNaN(priceNumber)) {
            setWarning("Введите корректную цену!");
            return;
        }

        setWarning("");

        try {
            await dbManager.addProduct(productTitle, priceNumber, productDescription || "");

            setProductTitle("");
            setProductPrice("");
            setProductDescription("");

            await loadProducts();
        } catch (error) {
            console.error("Ошибка при добавлении продукта:", error);
        }
    }

    const deleteProduct = async (id: string) => {
        try {
            await dbManager.deleteProduct(id);
            await loadProducts();
        } catch (error) {
            console.error("Ошибка при удалении продукта:", error);
        }
    }

    // const updateProduct = async (id: string, title: string, price: number, description: string | undefined) => {
    //     try{
    //         await dbManager.updateProduct(id, title, price, description);
    //         await loadProducts();
    //     }catch(error){
    //         console.error("Ошибка при обновлении товара", error);
    //     }
    // }

    const updateProduct = async (id: string) => {
        const updates: Partial<Pick<Product, 'title' | 'price' | 'description'>> = {};

        if (productTitle.trim()) updates.title = productTitle;
        if (productPrice) {
            const parsedPrice = parseFloat(productPrice);
            if (!isNaN(parsedPrice)) updates.price = parsedPrice;
        }
        if (productDescription.trim()) updates.description = productDescription;

        if (Object.keys(updates).length === 0) return;

        try {
            await dbManager.updateProductPartial(id, updates);

            setProductTitle("");
            setProductPrice("");
            setProductDescription("");
            setMethod(true);
            await loadProducts();
        } catch (error) {
            console.error("Ошибка при обновлении товара:", error);
        }
    };

    const startEditProduct = (item: Product) => {
        setCurrentsId(item.id);
        setProductTitle(item.title);
        setProductPrice(String(item.price));
        setProductDescription(item.description || "");
        setMethod(false);
    };

    const cancelEdit = () => {
        setMethod(true);
        setCurrentsId("");
        setProductTitle("");
        setProductPrice("");
        setProductDescription("");
    };

    return (
        <Container style={{ padding: 20 }}>
            <Container style={{ padding: 10 }}>
                <View style={styles.container}>
                    <TextInput
                        placeholderTextColor={"#ccc"}
                        style={styles.textInput}
                        placeholder="Title"
                        value={productTitle}
                        onChangeText={setProductTitle}
                    />
                    <TextInput
                        placeholderTextColor={"#ccc"}
                        style={styles.textInput}
                        placeholder="Price"
                        keyboardType="numeric"
                        value={productPrice !== undefined ? String(productPrice) : ""}
                        onChangeText={(text) => {
                            const numericValue = text.replace(/[^0-9.]/g, "");
                            setProductPrice(numericValue);
                        }}
                    />
                    <TextInput
                        placeholderTextColor={"#ccc"}
                        style={styles.textInput}
                        placeholder="Description"
                        value={productDescription}
                        onChangeText={setProductDescription}
                    />
                </View>
            </Container>
            <Text style={styles.warningText}>{warning}</Text>

            {method ? (
                <Button title="Add product" onPress={addProduct} />
            ) : (
                <View style={{ gap: 10 }}>
                    <Button title="Update product" onPress={() => updateProduct(currentId)} />
                    <Button title="Cancel" color="gray" onPress={cancelEdit} />
                </View>
            )}

            <FlatList
                data={[...products].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={
                    <Text style={{ textAlign: 'center', marginTop: 50, color: "#999", fontSize: 16 }}>
                        Products not found
                    </Text>
                }
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Text style={styles.listItemId}>{item.id}</Text>
                        <Text style={styles.listItemText}>{item.title}</Text>
                        <Text style={styles.listItemPrice}>{item.price}</Text>
                        <Text style={styles.listItemText}>{item.description}</Text>
                        <Text style={styles.listItemText}>{new Date(item.created_at).toDateString()}</Text>

                        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteProduct(item.id)}>
                            <Text style={{ color: "#fff" }}>Delete</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.updateButton} onPress={() => startEditProduct(item)}>
                            <Text style={{ color: "#fff" }}>Update</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </Container>
    )
}

const styles = StyleSheet.create({
    listItem: {
        padding: 20,
        borderRadius: 10,
        borderLeftWidth: 5,
        borderLeftColor: '#940e30',
        marginBottom: 10,
    },
    listItemId: { fontSize: 11 },
    listItemText: { fontSize: 20, fontWeight: 'bold' },
    listItemPrice: { fontSize: 17, fontWeight: 'bold', color: '#e5ff00' },
    container: {
        justifyContent: "center",
        alignItems: "center",
    },

    textInput: {
        height: 40,
        width: '100%',
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        marginVertical: 10,
    },
    warningText: {
        color: "red",
        fontSize: 15,
        fontWeight: "bold",
    },
    deleteButton: {
        width: 100,
        padding: 10,
        backgroundColor: "red",
        borderRadius: 5,
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    updateButton: {
        width: 100,
        padding: 10,
        backgroundColor: "blue",
        borderRadius: 5,
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }

})

export default DatabaseScreen;