import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GaussJordanFinitos, Modulo, Home } from './screens/index'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='Gauss Jordan' component={GaussJordanFinitos}/>
        <Stack.Screen name='Modulo' component={Modulo}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}