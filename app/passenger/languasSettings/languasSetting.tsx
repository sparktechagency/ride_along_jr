import { View, Text } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { SvgXml } from 'react-native-svg'
import { IconLanguas, IconLanguasEnglish } from '@/assets/icon/Icon'
import BackWithComponent from '@/lib/backHeader/BackWithCoponent'
import { useRouter } from 'expo-router'
import tw from '@/lib/tailwind'
import { Checkbox } from 'react-native-ui-lib'
import { PrimaryColor } from '@/utils/utils'

const languasSetting = () => {
  const [checkBoxEnglish, setCheckBoxEnglish] = React.useState(false)
  const [checkBoxSpanish, setCheckBoxSpanish] = React.useState(false)
  const router = useRouter();
  return (
    <ScrollView>
      <BackWithComponent
        togather
        title={"Language settings"}
        onPress={() => router.back()}
      />
      <View style={tw`items-center my-6 px-9`}>
        <SvgXml style={tw`my-7`} xml={IconLanguas} />
        <Text style={tw`text-2xl font-bold font-NunitoSansRegular`}>Select your primary language</Text>
      </View>

      <View style={tw`gap-3`}>
        <View style={tw` flex-row justify-between bg-white w-[370px] h-24 items-center mx-auto rounded-2xl p-4`}>
          <View>
            <Checkbox
            value={checkBoxEnglish}
            onValueChange={setCheckBoxEnglish}
              color={PrimaryColor}
              style={tw`rounded-full w-6 h-6`}
            />
            <Text style={tw`my-1 font-bold text-lg text-[#405658]`}>English</Text>
          </View>
          <SvgXml xml={IconLanguasEnglish} />
        </View>

        <View style={tw` flex-row justify-between bg-white w-[370px] h-24 items-center mx-auto rounded-2xl px-4`}>
          <View>
            <Checkbox
            value={checkBoxSpanish}
            onValueChange={setCheckBoxSpanish}
              color={PrimaryColor}
              style={tw`rounded-full w-6 h-6`}
            />
            <Text style={tw`my-1 font-bold text-lg text-[#405658]`}>Spanish</Text>
          </View>
          <SvgXml xml={IconLanguasEnglish} />
        </View>
      </View>
    </ScrollView>
  )
}

export default languasSetting