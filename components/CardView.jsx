import {Text, TouchableOpacity} from 'react-native'
import tw from "twrnc";

const CardView = ({ item }) => {
    return item ? (
        <TouchableOpacity style={tw`flex flex-col bg-yellow-200 rounded-md m-[2%]`}>
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