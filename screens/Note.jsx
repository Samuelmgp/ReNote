import { Text, View, Keyboard, TextInput, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/EvilIcons'
import tw from 'twrnc';
import { useDispatch, useSelector } from 'react-redux';
import { updateContent, updateTitle } from '../components/noteSlice';
import { ActionCreators } from 'redux-undo';
import { useAddNoteMutation, useUpdateNoteMutation, useDeleteNoteMutation } from '../db';

const NoteEditor = ( { route, navigation } ) => {

    const note = route.params.item;

    const dispatch = useDispatch()
    const [ addNote, { data: addNoteData, error: addError, isLoading: addIsLoading } ] = useAddNoteMutation();
    const [ updateNote, {data: updatedNoteData, error: updateError} ] = useUpdateNoteMutation()
    const [ deleteNote, {data: deletedNoteData, error: deleteError} ] = useDeleteNoteMutation()
    
    /*
    const undoableTitle = useSelector(state => state.note.present.title)
    const undoableContent = useSelector(state => state.note.present.content)
    */

    const [title, setTitle] = useState(note.title)
    const [content, setContent] = useState(note.content)

    const [isFocused, setFocus] = useState(false);
    const [isKeyboardVisible, setKeyboardVisability] = useState(false);

    /* For Done Button OnPress */
    const handleFinish = () => {
        Keyboard.dismiss()
        /*
        dispatch(updateTitle(title))
        dispatch(updateContent(content)) 
        */
        if (note.id === "base" && (title !== '' || content !== '')){
            const date = new Date()
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');

            addNote({title: title, content: content, created: `${month}-${day}-${year}`})
        } else if (title !== '' || content !== ''){
            console.log("Updating: ", title, content, note.id)
            updateNote({id: note.id, created: note.created, content: content, title: title})
        }
    }

    /* Saving Note Data */
    

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

    /* Delete Note Logic */
    const handleDelete = () => {
        deleteNote(note)
        navigation.goBack()
    }
    
    /* Top Navigation Bar */
    useEffect(() => {
        navigation.setOptions({
            headerTitle: note.title != '' ? note.title : "New Note",
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
                    onPress={handleDelete}
                >
                  <Text style={tw`text-base text-red-600`}>Delete</Text>
                  <Icon name='trash' size={25} color={'red'} />
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

export default NoteEditor;