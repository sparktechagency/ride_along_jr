import { View, Text } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import BackWithComponent from '@/lib/backHeader/BackWithCoponent';

const namePage = () => {
    const router  = useRouter();
  return (
    <View>
     <BackWithComponent togather
                onPress={() => router.back()}
                />
    </View>
  )
}

export default namePage