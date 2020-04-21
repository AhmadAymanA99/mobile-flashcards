import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const Deck = ({ route, navigation }) => {
    const { item } = route.params
    navigation.setOptions({ title: item.title })
    //console.log(item)
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 40 }}>{item.title}</Text>
            <Text style={{ fontSize: 28 }}><Text style={{ fontSize: 22, fontWeight: "700" }}>Cards number: </Text>{item.questions.length}</Text>
            <View style={styles.btn}><Button title="Start Quiz" color="#77b300" onPress={() => navigation.navigate('quiz', { cards: item })} /></View>
            <View style={styles.btn}><Button title="Add Card" color="#ff8c1a" onPress={() => navigation.navigate('newquestion', { item: item })} /></View>
        </View>
    )
}

export default Deck

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 50
    },
    btn: {
        marginTop: 20,
        width: '35%',
    }
})
