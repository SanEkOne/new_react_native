import { View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";

interface Product {
    id: number,
    title: string,
    description?: string,
    imageUrl: string,
    price: number
}
const ProductDetailScreen = () => {
    const router = useRouter();
    const {id, title, description, price, imageUrl} = useLocalSearchParams<{id:string, title:string, description:string, price: string, imageUrl:any}>(); 

    return (
        <SafeAreaView>
            <View>
                <Text>{id}</Text>
                <Text>{title}</Text>
                <Text>{description}</Text>
                <Text>{price}</Text>
                <Text>{imageUrl}</Text>
            </View>
            <Button color="#803da7" title="Back" onPress={()=>{
                router.back()
            }}/>
        </SafeAreaView>
    )
}

export default ProductDetailScreen;