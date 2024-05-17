import MasonryList from '@react-native-seoul/masonry-list';
import CardView from '../components/CardView';
import { useFetchNotesQuery } from '../db';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';

const MyNotesView = () => {
    const {data: dbNotes} = useFetchNotesQuery
    const [items, setItems] = useState([])

    useEffect(() => {
        setItems(dbNotes)
    }, [])

    return dbNotes ? (
        <MasonryList
            style={tw`w-full h-screen`}
            data={items}
            renderItem={CardView}
            numColumns={2}
        />
    ) : (
        <View style={tw`h-screen justify-center`}>
            <Text style={tw`text-center text-wrap text-lg font-bold mb-4`}>
                You currently dont have any notes!
            </Text>
            <TouchableOpacity style={tw`w-32 py-2 rounded-lg bg-blue-500 self-center`}>
                <Text style={tw`text-center text-white`}>
                    Add Note
                </Text>
            </TouchableOpacity>
        </View>
    )


}

export default MyNotesView