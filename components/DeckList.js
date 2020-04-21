import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import { getDecks, setDecks } from '../utils/helper'

const DeckList = ({ navigation }) => {
    const [decks, setdecks] = useState([])

    useEffect(() => {
        if (Object.keys(decks).length === 0) {
            setDecks()
                .then(getDecks()
                    .then(decks => setdecks(decks)))
                .catch((error) => {
                    console.warn('Could not load decks', error)
                })
        } else {
            getDecks()
                .then(decks => setdecks(decks))
                .catch((error) => {
                    console.warn('Could not load decks', error)
                })
        }
    })

    //console.log("Length: ", Object.keys(decks).length)

    return (
        <View style={styles.container}>
            {
                Object.keys(decks).length === 0
                    ? <Text style={styles.error}>No Decks Added, Yet!!</Text>
                    : <FlatList
                        data={Object.values(decks)}
                        keyExtractor={item => item.title}
                        renderItem={({ item }) =>
                            <TouchableOpacity style={styles.deck} onPress={() => navigation.navigate('deck', { item: item })}>
                                <Text style={{ fontSize: 28, fontWeight: "700", alignSelf: "center" }}>{item.title}</Text>
                                <Text style={{ fontSize: 24, alignSelf: "center" }}>{item.questions.length}<Text style={{ fontSize: 20 }}> Cards</Text></Text>
                            </TouchableOpacity>
                        }
                    />
            }
        </View>
    )
}

export default DeckList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    deck: {
        flex: 1,
        backgroundColor: 'skyblue',
        margin: 10,
        padding: 16,
        paddingLeft: 60,
        paddingRight: 60,
    },
    error: {
        fontSize: 22
    }
})
