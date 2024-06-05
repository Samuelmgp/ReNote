import MasonryList from '@react-native-seoul/masonry-list';
import CardView from '../components/CardView';
import { useFetchNotesQuery, useClearDatabaseMutation, useSearchNotesQuery } from '../db';
import { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/EvilIcons';

export default function Home ({ navigation }) {

    const [search, setSearch] = useState('')
    const { data: searchData, error: searchError, isLoading: isLoading } = useSearchNotesQuery(search)
    const [ clearDatabase, {data: msg, error: e}] = useClearDatabaseMutation();
    const [items, setItems] = useState([]);

    /* Top Navigation Bar */
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
            <TouchableOpacity
                style={tw`flex flex-row justify-center items-center`}
                onPress={clearDatabase}
            >
                <Text style={tw`text-red-600 text-base`}>Delete All</Text>
                <Icon name='trash' size={25} color={'red'} />
            </TouchableOpacity>
            ), 
        });
    }, [navigation])

    useEffect(() => {
        if (searchData) {
            setItems(searchData);
        }
    }, [searchData]);

    if (isLoading) {
        return (
            <View style={tw`h-full justify-center items-center`}>
                <ActivityIndicator size="large" color={"gray"} />
            </View>
        );
    }

    if (searchError) {
        return (
            <View style={tw`h-full justify-center items-center`}>
                <Text style={tw`text-red-500`}>Failed to load notes: {fnError.message}</Text>
            </View>
        );
    }

    return (items.length > 0 || search != '') ? (
        /* Display this when user has saved notes */
        <View style={tw`h-full justify-center`}>
            <TextInput
                style={tw`m-1 p-4 bg-gray-200 rounded-lg`}
                placeholder='Search'
                returnKeyType='search'
                onChangeText={setSearch}
                value={search}
            />
            <MasonryList
                style={tw`w-full`}
                data={items}
                renderItem={({ item }) => <CardView navigation={navigation} item={item} />}
                keyExtractor={(item) => item.id}
                numColumns={2}
            />
            <TouchableOpacity
                style={tw`rounded-4 bg-blue-500 absolute bottom-8 right-8 justify-center w-15 h-15 mx-auto`}
                onPress={() => navigation.navigate('Note')}
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
                onPress={() => navigation.navigate('Note')}
            >
                <Text style={tw`text-center text-white`}>
                    Create Note
                </Text>
            </TouchableOpacity>
        </View>
    );
}
