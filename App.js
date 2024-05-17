import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView, Text } from 'react-native';
import tw, { useDeviceContext } from 'twrnc';
import { Provider } from 'react-redux';
import { store } from './store';
import 'react-native-reanimated'; 
import CardView from './components/CardView';
import MyNotesView from './screens/MyNotes';
import NewNote from './screens/NewNote';

const Tab = createBottomTabNavigator()

function App() {
  useDeviceContext(tw);

  return (
    <Provider store={store}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="My Notes" component={MyNotesView} />
            <Tab.Screen name="New Note" component={NewNote}/>
          </Tab.Navigator>
        </NavigationContainer>
    </Provider>
  )
}

export default App;
