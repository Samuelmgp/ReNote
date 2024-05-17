import { SafeAreaView, Text } from 'react-native';
import tw, { useDeviceContext } from 'twrnc';
import { Provider } from 'react-redux';
import { store } from './store';
import 'react-native-reanimated'; 
import CardView from './components/CardView';
import MyNotesView from './screens/MyNotes';

function App() {
  useDeviceContext(tw);

  return (
    <Provider store={store}>
      <SafeAreaView>
        
      </SafeAreaView>
    </Provider>
  )
}

export default App;
