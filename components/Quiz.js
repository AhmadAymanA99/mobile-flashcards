import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native'
import CardFlip from 'react-native-card-flip'

import { clearLocalNotification, setLocalNotification } from '../utils/helper'


class Quiz extends React.Component {
    state = {
        index: 0,
        score: 0
    }

    correct = () => {
        this.setState((state) => {
            return {
                index: state.index + 1,
                score: state.score + 1
            }
        })
        clearLocalNotification()
            .then(setLocalNotification)
    }

    incorrect = () => {
        this.setState((state) => {
            return {
                index: state.index + 1,
            }
        })
        clearLocalNotification()
            .then(setLocalNotification)
    }

    reset = () => {
        this.setState({
            index: 0,
            score: 0
        })
    }
    render() {
        const { route, navigation } = this.props
        const { cards } = route.params
        const { index, score } = this.state

        if (index === cards.questions.length) {
            return (
                <View style={styles.container}>
                    <Text style={{ fontSize: 32 }}>Your Score: {score}</Text>
                    <Text style={{ fontSize: 32, marginBottom: 60, fontWeight: '700' }}>{score / cards.questions.length * 100} %</Text>
                    <View style={styles.btn}><Button title="Try Again" color="skyblue" onPress={this.reset} /></View>
                    <View style={styles.btn}><Button title="Go to Deck" color="skyblue" onPress={() => navigation.goBack()} /></View>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 22, fontWeight: '700', marginTop: 15 }}>{index + 1}/{cards.questions.length}</Text>
                <CardFlip duration={500} flipZoom={0} perspective={1000} style={styles.cardContainer} ref={(card) => this.card = card}>
                    <TouchableOpacity style={styles.face} disabled>
                        <Text style={styles.text}>{cards.questions[index].question}</Text>
                        <Text onPress={() => this.card.flip()} style={{ fontSize: 18, margin: 20 }}>Show Answer</Text>
                        <View style={styles.btn}><Button title="Correct" color="green" onPress={this.correct} /></View>
                        <View style={styles.btn}><Button title="incorrect" color="red" onPress={this.incorrect} /></View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.back} disabled >
                        <Text style={styles.text}>{cards.questions[index].answer}</Text>
                        <Text onPress={() => this.card.flip()} style={{ fontSize: 18, margin: 20 }}>Go Back</Text>
                    </TouchableOpacity>

                </CardFlip>
            </View>
        )
    }
}

export default Quiz

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    cardContainer: {
        flex: 1,
        width: '85%',
        marginTop: 100,
        marginBottom: 100,

    },
    btn: {
        marginTop: 20,
        width: '40%',
    },
    face: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#ff6666',
        borderColor: '#ff6666',
        borderWidth: 1,
        borderRadius: 20,
        padding: 10
    },
    back: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#ffad33',
        borderColor: '#ffad33',
        borderWidth: 1,
        borderRadius: 20,
        padding: 10
    },
    text: {
        fontSize: 28,
        textAlign: "center",
        color: 'white',
        fontWeight: '700'
    }
})
