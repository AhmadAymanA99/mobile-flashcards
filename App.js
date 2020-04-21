import React, { useEffect } from 'react'
import { View, StatusBar } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome, Ionicons } from '@expo/vector-icons'


import DeckList from './components/DeckList'
import Deck from './components/Deck'
import NewQuestion from './components/NewQuestion'
import Quiz from './components/Quiz'
import NewDeck from './components/NewDeck'

import { setLocalNotification } from './utils/helper'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function StackScreens() {
  return (
    <Stack.Navigator initialRouteName="decklist">
      <Stack.Screen name="decklist" component={DeckList} options={{ title: 'All Decks' }} />
      <Stack.Screen name="deck" component={Deck} />
      <Stack.Screen name="newquestion" component={NewQuestion} options={{ title: 'Add New Card' }} />
      <Stack.Screen name="quiz" component={Quiz} options={{ title: 'Take Quiz' }} />
    </Stack.Navigator>
  )
}

export default function App() {

  useEffect(() => {
    console.log("notify")
    setLocalNotification()
  }, [])

  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <StatusBar translucent backgroundColor={'white'} barStyle="dark-content" />
        <Tab.Navigator initialRouteName="Home">
          <Tab.Screen name="home" component={StackScreens}
            options={{
              title: 'Home',
              tabBarIcon: () =>
                <Ionicons name='ios-bookmarks' size={30} color={"skyblue"} />
            }}
          />
          <Tab.Screen name="newdeck" component={NewDeck}
            options={{
              title: 'New Deck',
              tabBarIcon: () =>
                <FontAwesome name='plus-square' size={30} color={"skyblue"} />
            }}
          />
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  )
}