import {Text, TouchableOpacity} from 'react-native'
import tw from "twrnc";

const CardView = ({ navigation, item }) => {
    const handlePress = () => {
        navigation.navigate('Note', {item: item})
    }

    return item ? (
        <TouchableOpacity 
            style={tw`flex flex-col bg-yellow-200 rounded-md m-[2%]`}
            onPress={handlePress}
        >
            <Text style={tw`text-lg text-black font-bold px-3 pt-2`}>
                {item.title}
            </Text>
            <Text style={tw`text-xs font-light text-left text-gray-600 px-3`}>
                Created: {item.created}
            </Text>
            <Text style={tw`text-base text-black px-3 pb-2`}>
                {item.content}
            </Text>
        </TouchableOpacity>
    ) : (
        <></>
    )
}

export default CardView