import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import ResumeScreen from './screens/ResumeScreen';
import PublicationsScreen from './screens/PublicationsScreen';
import ContactScreen from './screens/ContactScreen';
import { Ionicons } from '@expo/vector-icons';

// Create the Drawer Navigator
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerStyle: { backgroundColor: '#6200ee' },
          headerTintColor: '#fff',
          drawerActiveTintColor: '#6200ee',
          drawerIcon: ({ focused, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Resume') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Publications') {
              iconName = focused ? 'book' : 'book-outline';
            } else if (route.name === 'Contact') {
              iconName = focused ? 'mail' : 'mail-outline';
            }
            return <Ionicons name={iconName} size={size} color={focused ? '#6200ee' : '#333'} />;
          },
        })}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Resume" component={ResumeScreen} />
        <Drawer.Screen name="Publications" component={PublicationsScreen} />
        <Drawer.Screen name="Contact" component={ContactScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
