import MasonryList from '@react-native-seoul/masonry-list';
import CardView from '../components/CardView';
import { useFetchNotesQuery } from '../db';
import { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import tw from 'twrnc';

export default function Home ({ navigation }) {
    const { data: fetchedNoteData, error: fnError, isLoading } = useFetchNotesQuery('');
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (fetchedNoteData) {
            setItems(fetchedNoteData);
            console.log(fetchedNoteData)
        }
    }, [fetchedNoteData]);

    if (isLoading) {
        return (
            <View style={tw`h-full justify-center items-center`}>
                <ActivityIndicator size="large" color={"gray"} />
            </View>
        );
    }

    if (fnError) {
        return (
            <View style={tw`h-full justify-center items-center`}>
                <Text style={tw`text-red-500`}>Failed to load notes: {fnError.message}</Text>
            </View>
        );
    }

    return items.length > 0 ? (
        /* Display this when user has saved notes */
        <View style={tw`h-full justify-center`}>
            <TextInput
                style={tw`w-full p-4 bg-gray-200 rounded-lg`}
                placeholder='Search'
                returnKeyType='search'
            />
            <MasonryList
                style={tw`w-full mt-2`}
                data={items[0]}
                renderItem={({ item }) => <CardView navigation={navigation} item={item} />}
                keyExtractor={(item) => item.id}
                numColumns={2}
            />
            <TouchableOpacity
                style={tw`rounded-4 bg-blue-500 absolute bottom-8 right-8 justify-center w-15 h-15 mx-auto`}
                onPress={() => navigation.navigate('New Note')}
            >
                <Text style={tw`text-5xl text-center align-middle text-white mt-1`}>+</Text>
            </TouchableOpacity>
        </View>
    ) : (
        /* If There are no notes display this */
        <View style={tw`h-full justify-center`}>
            <Text style={tw`text-center text-lg font-bold mb-4`}>
                You currently don't have any notes!
            </Text>
            <TouchableOpacity 
                style={tw`w-32 py-2 rounded-lg bg-blue-500 self-center`}
                onPress={() => navigation.navigate('New Note')}
            >
                <Text style={tw`text-center text-white`}>
                    Create Note
                </Text>
            </TouchableOpacity>
        </View>
    );
}
