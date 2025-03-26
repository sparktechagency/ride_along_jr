import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import BackWithComponent from '@/lib/backHeader/BackWithCoponent'
import tw from '@/lib/tailwind'
import { Icon } from 'react-native-ui-lib'
import { SvgXml } from 'react-native-svg'
import { IconPlus, IconVisa } from '@/assets/icon/Icon'

const payment = () => {
    return (
        <>
            <View>

                <BackWithComponent togather title='Payment method' />

                <View style={tw`p-4 rounded-lg gap-4`}>
                    <View style={tw`border border-gray-300 rounded-lg px-2 py-2 flex-row justify-between items-center`}>
                        <View>
                            <Text style={tw`text-gray-500 text-sm`}>Card number</Text>
                            <Text style={tw`text-lg font-semibold`}>123********1542</Text>
                        </View>
                        <SvgXml xml={IconVisa} />
                    </View>

                    

                    <TouchableOpacity style={tw`mt-4 bg-gray-200 py-3 rounded-full flex-row items-center justify-center`}>
                        <SvgXml xml={IconPlus} />
                        <Text style={tw`text-[#1E3050] text-lg font-semibold ml-2`}>Add a new card</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default payment