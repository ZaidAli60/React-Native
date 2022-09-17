import { View, Image, StyleSheet, Button, TouchableOpacity,Text } from 'react-native'
import React from 'react'

export default function Gallery() {
    return (
        <View style={Styles.flexContainer}>
            <Image
                style={Styles.image}
                source={{ uri: 'https://www.reactnative.express/static/logo.png' }}
            />
            <Button title="Press Me" color="aqua" onPress={() => alert("Hello Word")} />
            <TouchableOpacity style={Styles.button}>
                <Text>Login</Text>
            </TouchableOpacity>
        </View>
    )
}

const Styles = StyleSheet.create({
    flexContainer: {
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "aqua",
        flex: 1,
    },
    image: {
        width: 200,
        height: 200,
    },
    button:{
        backgroundColor:"yellow",
        paddingHorizontal:30,
        paddingVertical:10,
        // borderColor:"red"
        borderRadius:50,

        
    }
})