import { Text, Keyboard, KeyboardAvoidingView, Platform,TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import tw from 'twrnc';

const DoneButton = () => {
    return Platform.OS === 'ios' ?
        (
            <TouchableOpacity
                style={tw`w-auto h-10 rounded-lg mx-5 mt-5 justify-center bg-blue-400`}
                onPress={Keyboard.dismiss}
            >
                <Text style={tw`text-white text-center text-center`}>
                    Done
                </Text>
            </TouchableOpacity>
        ) : null
}

export default function NoteEditior () {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isFocused, setFocus] = useState(false);

    return (
            <KeyboardAvoidingView 
                style={tw`flex-1`}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={100}
            > 
                <TextInput 
                    style={tw`w-auto h-auto py-4 px-4 bg-gray-200 rounded-lg text-black mx-5 mt-5`}
                    returnKeyType='done'
                    placeholder='Title'
                    value={title}
                    onChangeText={(title) => setTitle(title)}
                /> 
                <TextInput
                    style={tw`w-auto h-70 py-4 px-4 bg-gray-200 m-5 rounded-lg text-black text-left`}
                    placeholder='The start of a new note...'
                    multiline={true}
                    value={content}
                    scrollEnabled={true}
                    onChangeText={(content) => setContent(content)}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                />
                {isFocused && <DoneButton />}

            </KeyboardAvoidingView>
    )
}