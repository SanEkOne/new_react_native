import { ActivityIndicator, View, Text, Button, StyleSheet, FlatList, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { Container } from '@/components/ui/container';
import { jsonApi } from '@/lib/json-apis';

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const RestScreen = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    const [editingId, setEditingId] = useState<number | null>(null);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const getPostsHandle = async () => {
        try {
            const res = await jsonApi.get('/posts');
            console.log("Status:", res.status);
            setPosts(res.data);
        } catch (error) {
            console.error(" Ошибка при получении постов:", error);
        }

    }

    const handleEditPress = (post: Post) => {
        setEditingId(post.id);
        setTitle(post.title);
        setBody(post.body);
    };

    const handleUpdatePost = async () => {
        if (!editingId) return;

        try {
            const res = await jsonApi.put(`/posts/${editingId}`, {
                id: editingId,
                title,
                body,
                userId: 1, 
            });

            console.log('Успешно обновлено на сервере:', res.data);

            setPosts((prevPosts) =>
                prevPosts.map((post) => (post.id === editingId ? res.data : post))
            );

            setEditingId(null);
            setTitle('');
            setBody('');
        } catch (error) {
            console.error('Ошибка при обновлении:', error);
        }
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Button title='Get posts' onPress={getPostsHandle} />

            {editingId && (
                <View style={styles.formContainer}>
                    <Text style={styles.formTitle}>Редактирование поста #{editingId}</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={setTitle}
                        placeholder="Заголовок"
                    />
                    <TextInput
                        style={[styles.input, { height: 60 }]}
                        value={body}
                        onChangeText={setBody}
                        placeholder="Текст поста"
                        multiline
                    />
                    <View style={styles.buttonGroup}>
                        <Button title="Сохранить" onPress={handleUpdatePost} />
                        <Button title="Отмена" color="red" onPress={() => setEditingId(null)} />
                    </View>
                </View>
            )}

            <Container>
                <FlatList
                    data={posts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.listItem}>
                            <Text style={styles.listItemUserId}>User: {item.userId}</Text>
                            <Text style={styles.listItemId}>PostId: {item.id}</Text>
                            <Text style={styles.listItemText}>{item.title}</Text>
                            <Text style={styles.listItemBody}>{item.body}</Text>
                            <Button title="Редактировать" onPress={() => handleEditPress(item)} />
                        </View>
                    )}
                    ListEmptyComponent={<ActivityIndicator />}
                />
            </Container>
        </View>
    )
}

const styles = StyleSheet.create({
    listItem: {
        padding: 20,
        borderRadius: 10,
        borderLeftWidth: 5,
        borderLeftColor: '#940e30',
        marginVertical: 8
    },
    listItemId: { fontSize: 11 },
    listItemUserId: { fontSize: 15, fontWeight: 'bold' },
    listItemText: { fontSize: 20, fontWeight: 'bold' },
    listItemBody: { fontSize: 17, fontWeight: "bold", color: '#238a23' },

    formContainer: {
        padding: 15,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        marginVertical: 10,
    },
    formTitle: { fontWeight: 'bold', marginBottom: 8 },
    input: {
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 5,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    buttonGroup: { flexDirection: 'row', justifyContent: 'space-between' },
})

export default RestScreen;