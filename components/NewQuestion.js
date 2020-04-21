import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { addCardToDeck, getDecks, getDeck } from '../utils/helper'

const NewQuestion = ({ route, navigation }) => {
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const { item } = route.params
    const card = {
        question,
        answer
    }
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 26, textAlign: "center" }}>Question:</Text>
            <TextInput
                style={styles.input}
                onChangeText={text => setQuestion(text)}
                value={question}
            />
            <Text style={{ fontSize: 26, textAlign: "center" }}>Answer:</Text>
            <TextInput
                style={styles.input}
                onChangeText={text => setAnswer(text)}
                value={answer}
            />
            <View style={styles.btn}>
                <Button title="Add Card" color="orange" disabled={answer === '' || question === ''} onPress={() => {

                    addCardToDeck(item.title, card).then(
                        () => {
                            navigation.navigate('decklist')
                            setQuestion('')
                            setAnswer('')
                            getDecks().then((decks) => console.log(decks))
                        })

                }} />
            </View>

        </View>
    )
}

export default NewQuestion

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 80
    },
    btn: {
        marginTop: 20,
        width: '35%',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: 300,
        padding: 8,
        marginBottom: 20
    }
})
