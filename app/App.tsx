/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React, {FunctionComponent, useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
// @ts-ignore: no declaration files
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced';
import {
  Box,
  Button,
  NativeBaseProvider,
  ScrollView,
  Text,
  HStack,
  Image,
  ZStack,
  VStack,
  Spacer,
} from 'native-base';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import {
  useFlipper,
  useReduxDevToolsExtension,
} from '@react-navigation/devtools';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {
  createStackNavigator,
  StackScreenProps,
  StackCardStyleInterpolator,
  StackCardInterpolationProps,
  CardStyleInterpolators,
  TransitionPresets,
  StackNavigationOptions,
  StackHeaderProps,
} from '@react-navigation/stack';
import {Animated} from 'react-native';
import {client} from './graphql/client';
import {countAction, persistor, RootState, store} from './redux';
import App from './screens/_App';
import LoginScreen from './screens/loginScreen';
import CreateModalScreen from './screens/createModal';
import type {StackScreenParams, HomeIndexScreenProps} from './types';
import {View} from 'native-base';
import {SheetProvider} from 'react-native-actions-sheet';
import './utils/SheetManager';
import RegisterOnboardGender from './screens/registerOnboardGender';
import RegisterOnboardActivity from './screens/registerOnboardActivity';
import Home from './screens/Home/home';
import {AuthProvider} from './contexts/authContext';
import {useAuth} from './hooks/useAuth';
import HomeIndex from './screens/Home/index';
import {Config} from './env';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LoadingScreen from './screens/loadingScreen';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {setStackAction} from './redux/reducers/navigation';
import SearchScreenStack from './screens/SearchScreen';
import './utils/warningIgnore';
import Icon from './utils/ImageIcon';
import EventScreen from './screens/eventScreen';
import OtherProfileScreen from './screens/otherProfile';
import MapViewScreen from './screens/MapView';
import Geolocation from '@react-native-community/geolocation';
import SettingScreen from './screens/SettingScreen';
import MapViewForEventCardScreen from './screens/MapViewForEventCard';
import ProfileScreen from './screens/ProfileScreen';
import ProfileSettingScreen from './screens/ProfileSettingScreen';
import ProfileSettingEditScreen from './screens/ProfileSettingEditScreen';
import FriendScreen from './screens/Friend';
import NotificatioNScreen from './screens/NotificationScreen';
import EventNote from './screens/EventNote';
import CreatePostScreen from './screens/createPostScreen';
import CommentScreen from './screens/CommentScreen';
import CreatePinPostScreen from './screens/createPinPostScreen';
import EventDescriptipnScreen from './screens/EventDescriptionScreen';
import EventMember from './screens/EventMember';
import EventInfoScreen from './screens/EventInfoScreen';
const Stack = createStackNavigator<StackScreenParams>();
const defaultScreenOption: StackNavigationOptions = {
  headerShown: false,
  gestureEnabled: true,
  freezeOnBlur: true,
};
const StackNavigation = () => {
  /**
   * when Defined new Screen you should declare type of it in folder type.
   */
  // const user = useState(false);
  const {user, loading, isMount} = useAuth();
  const isLoading = useSelector<
    RootState,
    RootState['navigation']['isLoading']
  >(state => state.navigation.isLoading);

  return (
    <>
      <Stack.Navigator screenOptions={defaultScreenOption}>
        {(!user || !user.username) && !Config.bypassUser ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="HomeIndex" component={HomeIndex} />
            <Stack.Screen
              name="Onboard1"
              component={RegisterOnboardGender}
              options={{
                gestureEnabled: false,
              }}
            />
            <Stack.Screen
              name="Onboard2"
              component={RegisterOnboardActivity}
              options={{
                headerShown: true,

                header: (props: StackHeaderProps) => {
                  return (
                    <Box
                      backgroundColor={'white'}
                      safeAreaTop
                      paddingBottom={3}
                      marginTop={3}>
                      <HStack
                        alignItems={'center'}
                        w={'100%'}
                        justifyContent={'space-between'}>
                        <TouchableOpacity
                          onPress={() => {
                            props.navigation.goBack();
                          }}>
                          <Image
                            marginLeft={10}
                            marginBottom={3}
                            alt="key icon"
                            source={require('./assets/back_icon.png')}
                          />
                        </TouchableOpacity>
                      </HStack>
                    </Box>
                  );
                },
              }}
            />
            <Stack.Screen
              name="CreateModal"
              component={CreateModalScreen}
              // options={{presentation: 'modal'}}
            />
            <Stack.Screen
              name="SearchScreen"
              component={SearchScreenStack}
              options={{
                headerShown: true,

                headerTitle: () => {
                  return (
                    <Image source={Icon.homeScreen.logo} h={41} alt={'asdfs'} />
                  );
                },
                headerLeft(props) {
                  return (
                    <TouchableOpacity
                      style={{marginLeft: 30, marginBottom: 3}}
                      onPress={props.onPress}>
                      <Image
                        alt="key icon"
                        source={require('./assets/back_icon.png')}
                      />
                    </TouchableOpacity>
                  );
                },
                headerStyle: {
                  backgroundColor: 'white',
                  shadowOpacity: 0,
                  elevation: 0,
                },
              }}
            />
            <Stack.Screen
              name="EventScreen"
              component={EventScreen}
              options={{
                gestureEnabled: true,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="OtherProfileScreen"
              component={OtherProfileScreen}
              options={{
                gestureEnabled: true,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="MapViewScreen"
              component={MapViewScreen}
              options={{
                gestureEnabled: true,
                headerShown: true,
                headerLeft(props) {
                  return (
                    <TouchableOpacity
                      style={{marginLeft: 30, marginBottom: 3}}
                      onPress={props.onPress}>
                      <Image
                        alt="key icon"
                        source={require('./assets/back_icon.png')}
                      />
                    </TouchableOpacity>
                  );
                },
                title: 'Map',
                headerTitle(props) {
                  return (
                    <View alignSelf={'center'} justifyContent={'center'}>
                      <Text>Maps</Text>
                    </View>
                  );
                },
                headerStyle: {
                  backgroundColor: 'white',
                  shadowOpacity: 0,
                  elevation: 0,
                },
              }}
            />
            <Stack.Screen
              name="SettingScreen"
              component={SettingScreen}
              options={{
                gestureEnabled: true,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="MapViewForEventCardScreen"
              component={MapViewForEventCardScreen}
              options={{
                gestureEnabled: true,
                headerShown: true,
                headerLeft(props) {
                  return (
                    <TouchableOpacity
                      style={{marginLeft: 30, marginBottom: 3}}
                      onPress={props.onPress}>
                      <Image
                        alt="key icon"
                        source={require('./assets/back_icon.png')}
                      />
                    </TouchableOpacity>
                  );
                },
                title: 'Map',
                headerTitle(props) {
                  return (
                    <View alignSelf={'center'} justifyContent={'center'}>
                      <Text>Maps</Text>
                    </View>
                  );
                },
                headerStyle: {
                  backgroundColor: 'white',
                  shadowOpacity: 0,
                  elevation: 0,
                },
              }}
            />
            <Stack.Screen
              name="ProfileScreen"
              component={ProfileScreen}
              options={{
                gestureEnabled: true,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ProfileSettingScreen"
              component={ProfileSettingScreen}
              options={{
                gestureEnabled: true,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ProfileSettingEditScreen"
              component={ProfileSettingEditScreen}
              options={{
                gestureEnabled: true,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="FriendScreenIndex"
              component={FriendScreen}
              options={{
                gestureEnabled: true,
                headerShown: true,
                headerTitle: () => {
                  return (
                    <Image source={Icon.homeScreen.logo} h={41} alt={'asdfs'} />
                  );
                },
                headerLeft(props) {
                  return (
                    <TouchableOpacity
                      style={{marginLeft: 30, marginBottom: 3}}
                      onPress={props.onPress}>
                      <Image
                        alt="key icon"
                        source={require('./assets/back_icon.png')}
                      />
                    </TouchableOpacity>
                  );
                },
                headerStyle: {
                  backgroundColor: 'white',
                  shadowOpacity: 0,
                  elevation: 0,
                },
              }}
            />
            <Stack.Screen
              name="NotificationScreen"
              component={NotificatioNScreen}
              options={{
                gestureEnabled: true,
                headerShown: true,
                headerTitle: () => {
                  return (
                    <Image source={Icon.homeScreen.logo} h={41} alt={'asdfs'} />
                  );
                },
                headerLeft(props) {
                  return (
                    <TouchableOpacity
                      style={{marginLeft: 30, marginBottom: 3}}
                      onPress={props.onPress}>
                      <Image
                        alt="key icon"
                        source={require('./assets/back_icon.png')}
                      />
                    </TouchableOpacity>
                  );
                },
                headerStyle: {
                  backgroundColor: 'white',
                  shadowOpacity: 0,
                  elevation: 0,
                },
              }}
            />
            <Stack.Screen
              name="EventNoteScreen"
              component={EventNote}
              options={{
                gestureEnabled: true,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="CreatePostScreen"
              component={CreatePostScreen}
              options={{
                gestureEnabled: true,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="CommentScreen"
              component={CommentScreen}
              options={{
                gestureEnabled: true,
                headerShown: false,
                presentation: 'modal',
              }}
            />
            <Stack.Screen
              name="CreatePinPostScreen"
              component={CreatePinPostScreen}
              options={{
                gestureEnabled: true,
                headerShown: false,
                presentation: 'modal',
              }}
            />
            <Stack.Screen
              name="EventDescriptionScreen"
              component={EventDescriptipnScreen}
              options={{
                gestureEnabled: true,
                headerShown: false,
                // presentation: 'modal',
              }}
            />
            <Stack.Screen
              name="EventMemberScreen"
              component={EventMember}
              options={{
                gestureEnabled: true,
                headerShown: false,
                // presentation: 'modal',
              }}
            />
            <Stack.Screen
              name="EventInfoScreen"
              component={EventInfoScreen}
              options={{
                gestureEnabled: true,
                headerShown: false,
                // presentation: 'modal',
              }}
            />
          </>
        )}
      </Stack.Navigator>
      {(loading || !isMount || isLoading) && <LoadingScreen />}
    </>
  );
};

const Wrapper = () => {
  const navigationRef = useNavigationContainerRef();

  if (__DEV__) {
    useFlipper(navigationRef); //eslint-disable-line react-hooks/rules-of-hooks
    useReduxDevToolsExtension(navigationRef); //eslint-disable-line react-hooks/rules-of-hooks
  }

  Geolocation.requestAuthorization(
    () => {
      console.log('requestAuthorization');
    },
    e => {
      console.log('requestAuthorization error', e);
    },
  );
  return (
    <Provider store={store}>
      <FlipperAsyncStorage />
      <NativeBaseProvider>
        <PersistGate loading={null} persistor={persistor}>
          <ApolloProvider client={client}>
            <AuthProvider>
              <SheetProvider>
                <NavigationContainer ref={navigationRef}>
                  <StackNavigation />
                </NavigationContainer>
              </SheetProvider>
            </AuthProvider>
          </ApolloProvider>
        </PersistGate>
      </NativeBaseProvider>
    </Provider>
  );
};

export default Wrapper;
