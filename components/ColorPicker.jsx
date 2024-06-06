import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

const ColorPicker = ( {color, setColor} ) => {

    return setColor ? (
        <View style={tw`flex flex-col justify-center pb-10`}>
            <View style={tw`flex flex-row items-center p-3 gap-x-2`}>
                <Text style={tw`text-gray-600`}>
                    Note Color:
                </Text>
                <View style={tw`rounded-full ${color} w-5 h-5`}/>
            </View>
            <View style={tw`flex flex-row px-5 gap-x-5 justify-center`}>
                <TouchableOpacity 
                    style={tw`rounded-full bg-blue-300 w-10 h-10`}
                    onPress={() => setColor("bg-blue-300")}
                />
                <TouchableOpacity 
                    style={tw`rounded-full bg-yellow-200 w-10 h-10`}
                    onPress={() => setColor("bg-yellow-200")}
                />
                <TouchableOpacity 
                    style={tw`rounded-full bg-red-300 w-10 h-10`}
                    onPress={() => setColor("bg-red-300")}
                />
                <TouchableOpacity 
                    style={tw`rounded-full bg-green-300 w-10 h-10`}
                    onPress={() => setColor("bg-green-300")}
                />
            </View>
        </View>
    ) : (
        <View style={tw`rounded-2 ${color} w-full h-10 mb-5`}/>
    )
}

export default ColorPicker;