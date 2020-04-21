import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { saveDeckTitle } from '../utils/helper'

const NewDeck = ({ navigation }) => {
    const [name, setName] = useState('')

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 30, margin: 60, textAlign: "center" }}>What is the name of your deck?</Text>
            <TextInput
                style={styles.input}
                onChangeText={text => setName(text)}
                value={name}
            />
            <View style={styles.btn}>
                <Button title="Add Deck" color="skyblue" disabled={name === ''} onPress={() => {
                    saveDeckTitle(name).then(
                        () => {
                            console.log(Object.keys(decks))
                            navigation.navigate('deck', {
                                item: {
                                    title: name,
                                    questions: []
                                }
                            })
                            setName('')
                        })
                }} />
            </View>

        </View>
    )
}

export default NewDeck

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    btn: {
        marginTop: 20,
        width: '35%',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: 200,
        padding: 8
    }
})
