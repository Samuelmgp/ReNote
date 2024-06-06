import { Text, View, Keyboard, TextInput, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/EvilIcons'
import tw from 'twrnc';
import { useAddNoteMutation, useUpdateNoteMutation, useDeleteNoteMutation } from '../db';
import ColorPicker from '../components/ColorPicker';

const NoteEditor = ( { route, navigation } ) => {

    const date = new Date()
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const [ addNote, {data: newNote} ] = useAddNoteMutation();
    const [ updateNote, {data: updatedNote}  ] = useUpdateNoteMutation()
    const [ deleteNote ] = useDeleteNoteMutation()
    
    const  initialNote = route.params ? route.params.item : {title: '', content: '', color: "bg-yellow-200", created: `${month}-${day}-${year}`}
    const [note, setNote] = useState(initialNote)
    const [title, setTitle] = useState(note.title)
    const [content, setContent] = useState(note.content)
    const [color, setColor] = useState(note.color)

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
        /*
            When the keyboard is present Keyboard fires an event "keyboardDidShow"
            Which is tied to the setKeyboardVisability state
        */
        const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardVisability(true)
        })

        const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardVisability(false)
        })

        /*
            When unmounting remove the listeners as they are no longer
            neccessary. 
        */
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
            title: (title === "" ? "Untitled Note" : title),
            content: content,
            color: color,
            created: note.created
        })
    }, [title, content, color])

    /* Go Back Logic */
    const handleReturn = async () => {
        if (note.title !== "" && note.content !== ""){
            await saveData()
        }
        navigation.goBack()
    }
    
    /* Top Navigation Bar */
    useEffect(() => {
        /*
            Set the navigation bar elements: 
            - If the Note has a title:
                [Deprecated] - Display the title otherwise New Note
                [New] - Note is automatically set to "Untitled Note"
            - Left Side:
                If (New Note without Content):
                    - Display "X Cancel" in Red
                Otherwise:
                    - Display "< My Notes" in Blue
                OnPress - Handled by (handleReturn)
            - Right Side:
                [Visible] When content is not empty
                OnPress - Handled by (handleDelete)
            
            [Dev Notes]: When Cancel is displayed changes are not saved
            The note remains unchanged. Notes cannot be saved without content.
            However, they can be saved without a title -> as the title is automatically
            set to "Untitled Note"

            Interesting thing that I learned in this part when trying to figure out
            how to save & update a note is that if note is not a dependacy in this
            useEffect, then when saveNote() is called title & content wont be 
            synced and despite the previous useEffect updating note continuously 
            when title or content are modified, it wont be up to date prior to the
            goBack, despite the await & async declarations.

            This is my second time working with React, but in my first experience
            it wasn't as in depth, I am still a little puzzled by the cause.

        */
        navigation.setOptions({
            headerTitle: note.title,
            headerLeft: () => (
                <TouchableOpacity
                    style={tw`flex flex-row items-center`}
                    onPress={handleReturn}
                >
                    { note.content != "" ? 
                    (<Icon name='chevron-left' size={35} color={'blue'} />) 
                    : 
                    (<Icon name='close' size={25} color={'red'} />)}
                    <Text style={tw`text-base ${note.content != "" ? 'text-blue-600' : 'text-red-600'}`}>
                        { note.content != "" ? "My Notes" : "Cancel"}
                    </Text>
                </TouchableOpacity>
            ),
            headerRight: () => (
                note.content != ''
                && 
                (<TouchableOpacity 
                    style={tw`flex flex-row gap-x-1 items-center`}
                    onPress={handleDelete}
                >
                    <Text style={tw`text-base text-red-600`}>Delete</Text>
                    <Icon name='trash' size={25} color={'red'} />
                </TouchableOpacity>)
            ),
        });

    }, [navigation, note])


    /* UI Portion */
    return (
            
            <View
                style={tw`flex flex-col justify-center gap-y-1 p-3 ${isKeyboardVisible || isFocused ? 'h-[55%]' : 'h-full'}`}
            > 
                    <TextInput 
                        style={tw`flex-initial h-10 rounded-lg px-4 bg-gray-200`}
                        returnKeyType='done'
                        placeholder='Title'
                        value={title}
                        onChangeText={(title) => {setTitle(title)}}
                    />  
                
                    <TextInput
                        style={tw`flex-1 rounded-lg px-4 bg-gray-200`}
                        placeholder='The start of a new note...'
                        multiline={true}
                        value={content}
                        onChangeText={(content) => {setContent(content)}}
                        onFocus={() => setFocus(true)}
                        onBlur={() => setFocus(false)}
                    /> 
                    {/*
                    Done Button is only visible when content is focused
                    This is because on iOS keyboard doesn't have dismiss
                    button for whatever reason. And I didn't want to get rid
                    of the return key, so I made a custome button for this
                    */}
                {isFocused && <DoneButton />}
                {!note.id && <ColorPicker color={color} setColor={setColor} />}
            </View>
    )
}

export default NoteEditor;