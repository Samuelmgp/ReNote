import { Text, View, Keyboard, TextInput, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/EvilIcons'
import tw from 'twrnc';
import { useAddNoteMutation, useUpdateNoteMutation, useDeleteNoteMutation } from '../db';

const NoteEditor = ( { route, navigation } ) => {

    const date = new Date()
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const [ addNote ] = useAddNoteMutation();
    const [ updateNote ] = useUpdateNoteMutation()
    const [ deleteNote ] = useDeleteNoteMutation()
    
    const  initialNote = route.params ? route.params.item : {title: '', content: '', created: `${month}-${day}-${year}`}
    const [note, setNote] = useState(initialNote)
    const [title, setTitle] = useState(note.title)
    const [content, setContent] = useState(note.content)

    const [isFocused, setFocus] = useState(false);
    const [isKeyboardVisible, setKeyboardVisability] = useState(false);

    /* Saving Note Data */
    const saveData = async () => {
        note.id ?
            await updateNote(note) 
            :
            await addNote(note)
    }

    /* Done Button UI Component Single Use */
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
    const handleDelete = async () => {
        await deleteNote(note)
        navigation.goBack()
    }
    /* Sync Note */
    useEffect(() => {
        setNote({
            id: note.id,
            title: title,
            content: content,
            created: note.created
        })
    }, [title, content])

    /* Go Back Logic */
    const handleReturn = async () => {
        await saveData()
        console.log("Saving note: ", note)
        navigation.goBack()
    }
    
    /* Top Navigation Bar */
    useEffect(() => {
        navigation.setOptions({
            headerTitle: note.title != '' ? note.title : "New Note",
            headerLeft: () => (
                <TouchableOpacity
                    style={tw`flex flex-row items-center`}
                    onPress={handleReturn}
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
                  <Text style={tw`text-base text-red-600`}>
                    { note.title == '' ? "Cancel" : "Delete"}
                  </Text>
                    { (note.title != '' || note.content != '') ? (<Icon name='trash' size={25} color={'red'} />) : (<Icon name='close' size={25} color={'red'} />)} 
                </TouchableOpacity>
                ),
        });

    }, [navigation, note])


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
                        onChangeText={(title) => {setTitle(title)}}
                    />  
                
                    <TextInput
                        style={tw`flex-1 rounded-lg px-4`}
                        placeholder='The start of a new note...'
                        multiline={true}
                        value={content}
                        onChangeText={(content) => {setContent(content)}}
                        onFocus={() => setFocus(true)}
                        onBlur={() => setFocus(false)}
                    /> 
                {isFocused && <DoneButton />}
            </View>
    )
}

export default NoteEditor;