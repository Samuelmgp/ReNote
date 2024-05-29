import MasonryList from '@react-native-seoul/masonry-list';
import CardView from '../components/CardView';
import { useFetchNotesQuery } from '../db';
import { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';

export default function Home ({ navigation }) {
    const {data: dbNotes} = useFetchNotesQuery
    const [items, setItems] = useState([])

    useEffect(() => {
        setItems(dbNotes)
    }, [])

    return dbNotes ? (
        <View>
            <TextInput
                style={tw`w-full`}
                placeholder='Search'
            />
            <MasonryList
                style={tw`w-full h-full`}
                data={items}
                renderItem={CardView}
                numColumns={2}
            />
        </View>
    ) : (
        <View style={tw`h-full justify-center`}>
            <Text style={tw`text-center text-lg font-bold mb-4`}>
                You currently dont have any notes!
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
    )


}