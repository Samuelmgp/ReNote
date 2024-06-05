import {Text, TouchableOpacity} from 'react-native'
import tw from "twrnc";

const CardView = ({ navigation, item }) => {
    const handlePress = () => {
        console.log(item.id)
        navigation.navigate('Note', {item: item})
    }

    return item ? (
        <TouchableOpacity 
            style={tw`flex flex-col bg-yellow-200 rounded-md m-[2%]`}
            onPress={handlePress}
        >
            <Text style={tw`text-lg font-bold p-2 text-black`}>
                {item.title}
            </Text>
            <Text style={tw`text-base text-black p-2`}>
                {item.content}
            </Text>
        </TouchableOpacity>
    ) : (
        <></>
    )
}

export default CardView