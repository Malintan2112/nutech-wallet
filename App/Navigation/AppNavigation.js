import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import CodePushService from '../Container/CodePushService';

import AuthPage from '../Container/AuthPage';
import BottomTabNavigator from './BottomTabNavigator';
import HistoryPage from '../Container/HistoryPage';
import TopUpPage from '../Container/TopUpPage';
import TransferPage from '../Container/TransferPage';
import ContactListPage from '../Container/ContactListPage';


const Stack = createStackNavigator()

const StackNavigator = () => (
    <Stack.Navigator headerMode='none'>
        <Stack.Screen name='Codepush' component={CodePushService} options={{ ...TransitionPresets.ScaleFromCenterAndroid }} />
        <Stack.Screen name='AuthPage' component={AuthPage} options={{ ...TransitionPresets.ScaleFromCenterAndroid }} />
        <Stack.Screen name='Homepage' component={BottomTabNavigator} options={{ ...TransitionPresets.ScaleFromCenterAndroid }} />
        <Stack.Screen name='HistoryPage' component={HistoryPage} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name='TopUpPage' component={TopUpPage} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name='TransferPage' component={TransferPage} options={{ ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name='ContactListPage' component={ContactListPage} options={{ ...TransitionPresets.SlideFromRightIOS }} />

    </Stack.Navigator>
)



const AppNavigation = () => {
    return (
        <NavigationContainer>
            {StackNavigator()}
        </NavigationContainer>
    )
}

export default AppNavigation