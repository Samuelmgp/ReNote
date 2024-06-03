import { Text, View, Keyboard, KeyboardAvoidingView, Platform,TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/EvilIcons'
import tw from 'twrnc';
import { useDispatch, useSelector } from 'react-redux';
import { updateContent, updateTitle } from '../components/noteSlice';
import { ActionCreators } from 'redux-undo';

const DoneButton = () => {
    return (
            <TouchableOpacity
                style={tw`flex-initial h-10 rounded-lg justify-center bg-blue-400`}
                onPress={Keyboard.dismiss}
            >
                <Text style={tw`text-white text-center text-center`}>
                    Done
                </Text>
            </TouchableOpacity>
        )
}

export default function NoteEditior ( { navigation } ) {
    const dispatch = useDispatch()

    const title = useSelector(state => state.note.present.title)
    const content = useSelector(state => state.note.present.content)

    const [isFocused, setFocus] = useState(false);
    const [isKeyboardVisible, setKeyboardVisability] = useState(false);

    useEffect(() => {

        const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardVisability(true)
        })

        const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardVisability(false)
        })

        return () => {
            keyboardDidShowListener.remove()
            keyboardDidHideListener.remove()
        }
    }, [])

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
            <TouchableOpacity 
                style={tw`flex flex-row gap-x-1`}
                onPress={() => (dispatch(ActionCreators.undo()))}
            >
              <Text style={tw`text-base bg-white text-red-600`}>Undo</Text>
              <Icon name='undo' size={25} color={'red'} />
            </TouchableOpacity>
            ), 
    });
        
    }, [navigation])


    return (
            
            <View
                style={tw`flex flex-col justify-center gap-y-1 p-3 ${isKeyboardVisible || isFocused ? 'h-[55%]' : 'h-full'}`}
            > 
                    <TextInput 
                        style={tw`flex-initial h-10 rounded-lg px-4`}
                        returnKeyType='done'
                        placeholder='Title'
                        value={title}
                        onChangeText={(title) => dispatch(updateTitle(title))}
                    />  
                
                    <TextInput
                        style={tw`flex-1 rounded-lg px-4`}
                        placeholder='The start of a new note...'
                        multiline={true}
                        value={content}
                        onChangeText={(content) => dispatch(updateContent(content))}
                        onFocus={() => setFocus(true)}
                        onBlur={() => setFocus(false)}
                    /> 
                {isFocused && <DoneButton />}
            </View>
    )
}