import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import { CameraView, useCameraPermissions } from 'expo-camera';

import * as Contacts from "expo-contacts";
import * as SMS from 'expo-sms';
import * as Linking from "expo-linking";
import { Contact, ContactField } from "expo-contacts";
import { useEffect, useState } from "react";
type ContactItem = Awaited<ReturnType<typeof Contact.getAllDetails>>[number];
type PhoneItem = NonNullable<ContactItem['phones']>[number];

const ContactScreen = () => {
    // const [contacts, setContacts] = useState<Awaited<ReturnType<typeof Contact.getAllDetails>>>([]);
    const [contacts, setContacts] = useState<ContactItem[]>([]);
    const [contactPermisionStatus, setContactPermisionStatus] = useState<Contacts.PermissionStatus>();

    const [permission, requestPermission] = useCameraPermissions();
    const [torchOn, setTorchOn] = useState(false);

    useEffect(() => {
        const askPermission = async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            setContactPermisionStatus(status);
        }
        askPermission();
    }, [contactPermisionStatus])

    useEffect(() => {
        if (torchOn) {
            console.log("Lighter On!");
        } else {
            console.log("Lighter Off!");
        }
    }, [torchOn]);

    if (!permission) return <View />;

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ marginBottom: 10 }}>Требуется разрешение на использование камеры</Text>
                <Button onPress={requestPermission} title="Предоставить разрешение" />
            </View>
        );
    }

    const loadContacts = async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
            const data = await Contact.getAllDetails([
                ContactField.FULL_NAME,
                ContactField.PHONES,
            ]);

            if (data.length > 0) {
                setContacts(data);
                console.log(data);
                console.log(data[0]?.phones);
            }
        }
    }
    const createContact = async () => {
        const id = Math.floor(Math.random() * (9999 - 0 + 1)) + 0;
        const createContact: Contacts.CreateContactRecord = {
            givenName: `Name-${id}`,
            familyName: `Surname-${id}`,
            phones: [
                { 'label': 'work', "number": "+1 343-534-3333" }
            ]
        }
        createContact.emails?.push(
            { 'label': 'work', 'address': `email${id}@example.com` }
        )
        const newContact = await Contact.presentCreateForm(createContact);
    }

    const sendSMS = async () => {
        const isAvailable = await SMS.isAvailableAsync();
        if (isAvailable) {
            const { result } = await SMS.sendSMSAsync(
                ['+18881234567',],
                "Hello. This is your access code: 45356"
            );
            console.log('Send status: ', result);
        }
    }

    const deleteContact = async (id: string) => {
        try {
            const contact = new Contact(id);
            await contact.delete();

            setContacts(prev => prev.filter(c => c.id !== id));
        } catch (error) {
            console.error('Ошибка при удалении контакта:', error);
        }
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <TouchableOpacity style={styles.button} onPress={loadContacts}>
                <Text style={styles.buttonText}>Load Contacts</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={createContact}>
                <Text style={styles.buttonText}>Create contact</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={sendSMS}>
                <Text style={styles.buttonText}>Send SMS</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('https://maps.google.com/?q=46.4825,30.7233')}>
                <Text style={styles.buttonText}>Open google maps</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('tel:+1234567890')}>
                <Text style={styles.buttonText}>Open phone</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => Linking.openSettings()}>
                <Text style={styles.buttonText}>Open settings</Text>
            </TouchableOpacity>

            <CameraView enableTorch={torchOn} />
            <TouchableOpacity style={styles.button} onPress={() => setTorchOn(prev => !prev)}>
                <Text style={styles.buttonText}>Lighter ON/OFF</Text>
            </TouchableOpacity>

            <View style={styles.contacts_container}>
                {contacts.map((contact, index) => (
                    <View key={contact.id ?? index} style={styles.contactItem}>
                        <Text style={styles.contactText}>{contact.fullName}</Text>
                        {contact.phones?.map((phone: PhoneItem, i: number) => (
                            <Text key={i} style={styles.contactText}>
                                {phone.number}
                            </Text>
                        ))}
                        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteContact(contact.id)}>
                            <Text style={styles.contactText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                ))}

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 10,
        gap: 5
    },
    button: {
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#8b1b41',
        borderRadius: 4
    },
    buttonText: {
        fontSize: 16,
        color: 'white'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contacts_container: {
        flex: 1,
        padding: 10,
        gap: 5
    },
    contactItem: {
        padding: 10,
        gap: 5,
        backgroundColor: '#ee4848',
        borderRadius: 4,
    },
    contactText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    deleteButton: {
        width: 100,
        backgroundColor: '#8b1b41',
        borderRadius: 4,
        padding: 5,
        alignItems: 'center'
    }
})

export default ContactScreen;