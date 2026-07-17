import React from 'react'
import { PropsWithChildren } from 'react';

import { StyleProp, View, ViewStyle } from "react-native";


export const Container = ({children, style = {}}:PropsWithChildren & {style?:StyleProp<ViewStyle>})=>{
    return(
        <View style={[{
            padding: 5,
            margin: 5,
            borderRadius: 8,
        }, style]}>
            {children}
        </View>
    )
}