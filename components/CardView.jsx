import {Text, TouchableOpacity} from 'react-native'
import tw from "twrnc";

const CardView = ({item}) => {
    return (
        <TouchableOpacity style={tw`bg-yellow-200 rounded-md w-auto`}>
            <Text style={tw`text-lg font-bold mx-auto mt-5px text-wrap`}>
                {item.title}
            </Text>
            <Text style={tw`text-base mx-auto hyphens-auto`}>
                {item.content}
            </Text>
        </TouchableOpacity>
    )
}

export default CardView