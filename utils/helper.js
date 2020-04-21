import { AsyncStorage } from 'react-native'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'

const FLASHCARD_STORAGE_KEY = 'Udacity:flashcards'
const NOTIFICATION_KEY = 'UdaciFlashcards:notifications'


export function setDecks() {
    decks = {
        React: {
            title: 'React',
            questions: [
                {
                    question: 'What is React?',
                    answer: 'A library for managing user interfaces'
                },
                {
                    question: 'Where do you make Ajax requests in React?',
                    answer: 'The componentDidMount lifecycle event'
                }
            ]
        },
        JavaScript: {
            title: 'JavaScript',
            questions: [
                {
                    question: 'What is a closure?',
                    answer: 'The combination of a function and the lexical environment within which that function was declared.'
                }
            ]
        }
    }
    return AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(decks))
}

export function getDecks() {
    return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
        .then(JSON.parse)
}

export function getDeck(id) {
    return getDecks()
        .then(decks => {
            return decks[id]
        })
}

export function saveDeckTitle(title) {
    return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
        [title]: {
            title,
            questions: []
        }
    }))
}

export function addCardToDeck(title, card) {
    return getDeck(title)
        .then(deck => {
            deck.questions.push(card)
            return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({ [title]: deck }))
        })
}

export function clearDecks() {
    return AsyncStorage.clear()
}

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
    return {
        title: 'Continue your study!',
        body: "'👋 don't forget to complete your study for today!",
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        },
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(20)
                            tomorrow.setMinutes(0)

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day'
                                }
                            )

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}