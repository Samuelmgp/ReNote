import { Text, View, Keyboard, KeyboardAvoidingView, Platform,TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/EvilIcons'
import tw from 'twrnc';
import { useDispatch, useSelector } from 'react-redux';
import { updateContent, updateTitle } from '../components/noteSlice';
import { ActionCreators } from 'redux-undo';
import { useAddNoteMutation } from '../db';

export default function NoteEditior ( { navigation } ) {
    const dispatch = useDispatch()
    const [ addNote, { data, error } ] = useAddNoteMutation();
    
    const undoableTitle = useSelector(state => state.note.present.title)
    const undoableContent = useSelector(state => state.note.present.content)

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const [isFocused, setFocus] = useState(false);
    const [isKeyboardVisible, setKeyboardVisability] = useState(false);

    const handleFinish = () => {
        Keyboard.dismiss()
        dispatch(updateTitle(title))
        dispatch(updateContent(content)) 
    }

    /* Done Button UI Component Single Use */
    const DoneButton = () => {
        return (
                <TouchableOpacity
                    style={tw`flex-initial h-10 rounded-lg justify-center bg-blue-400`}
                    onPress={handleFinish}
                >
                    <Text style={tw`text-white text-center text-center`}>
                        Done
                    </Text>
                </TouchableOpacity>
            )
    }

    /* Keyboard Listeners (Predominantly for Resizing View) */
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

    /* Navigation Undo Button Logic */
    const handleUndo = () => {
        dispatch(ActionCreators.undo())
        setTitle(undoableTitle)
        setContent(undoableContent)
    }
    
    /* Top Navigation Bar */
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    style={tw`flex flex-row items-center`}
                    onPress={navigation.goBack}
                >
                    <Icon name='chevron-left' size={35} color={'blue'} />
                    <Text style={tw`text-base text-blue-600`}>My Notes</Text>
                </TouchableOpacity>
            ),
            headerRight: () => (
            <TouchableOpacity 
                style={tw`flex flex-row gap-x-1 items-center`}
                onPress={handleUndo}
            >
              <Text style={tw`text-base text-red-600`}>Undo</Text>
              <Icon name='undo' size={25} color={'red'} />
            </TouchableOpacity>
            ), 
        });
    }, [navigation])


    /* UI Portion */
    return (
            
            <View
                style={tw`flex flex-col justify-center gap-y-1 p-3 ${isKeyboardVisible || isFocused ? 'h-[55%]' : 'h-full'}`}
            > 
                    <TextInput 
                        style={tw`flex-initial h-10 rounded-lg px-4`}
                        returnKeyType='done'
                        placeholder='Title'
                        value={title}
                        onChangeText={(title) => setTitle(title)}
                    />  
                
                    <TextInput
                        style={tw`flex-1 rounded-lg px-4`}
                        placeholder='The start of a new note...'
                        multiline={true}
                        value={content}
                        onChangeText={(content) => setContent(content)}
                        onFocus={() => setFocus(true)}
                        onBlur={() => setFocus(false)}
                    /> 
                {isFocused && <DoneButton />}
            </View>
    )
}