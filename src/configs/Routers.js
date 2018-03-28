import React from 'react'
import {
  StackNavigator,
  TabNavigator,
  TabBarBottom
} from 'react-navigation'
import { BlurView } from 'react-native-blur'
import * as LoginComponent from '../views/Login'
import * as HomeComponent from '../views/Home'
import * as AccountComponent from '../views/Account'
import * as MusicComponent from '../views/Music'
import * as DetailComponent from '../views/Detail'
import * as MusicList from '../views/MusicList'
import connectComponent from '../utils/connectComponent'

const mainColor = 'rgb(60,60,60)'
const HomeNavigator = TabNavigator(
  {
    Home: {screen: connectComponent(HomeComponent)},
    Music: {screen: connectComponent(MusicComponent)},
    Account: {screen: connectComponent(AccountComponent)}
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    lazyLoad: false,
    tabBarOptions: {
      activeTintColor: '#fff',
      labelStyle: {
        fontSize: 12
      },
      style: {
        backgroundColor: mainColor
      }
    }
  }
)

const MainNavigator = StackNavigator(
  {
    HomeNavigator: {screen: HomeNavigator},
    Detail: {screen: connectComponent(DetailComponent)},
    MusicList: {screen: connectComponent(MusicList)}
  },
  {
    headerMode: 'float',
    headerTransitionPreset: 'uikit',
    initialRouteName: 'HomeNavigator',
    navigationOptions: {
      headerStyle: {
        backgroundColor: mainColor,
        borderBottomColor: mainColor
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      },
      headerBackTitle: null,
      headerTransparent: true
      // headerBackground: (
      //   <BlurView style={{ flex: 1, backgroundColor: mainColor }} blurType='light' blurAmount={10} />
      // )
    }
  }
)

const AppNavigator = StackNavigator(
  {
    Main: { screen: MainNavigator },
    Login: { screen: connectComponent(LoginComponent) }
  },
  {
    // headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
      headerStyle: {
        backgroundColor: mainColor,
        borderBottomColor: mainColor
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      },
      headerTransparent: true,
      headerBackTitle: null
      // headerBackground: (
      //   <BlurView style={{ flex: 1, backgroundColor: mainColor }} blurType='light' blurAmount={10} />
      // )
    }
    // navigationOptions: {
    //     gesturesEnabled: false,
    // },
    // transitionConfig: () => ({
    //     transitionSpec: {
    //         duration: 300,
    //         easing: Easing.out(Easing.poly(4)),
    //         timing: Animated.timing,
    //     },
    //     screenInterpolator: sceneProps => {
    //         const { layout, position, scene } = sceneProps
    //         const { index } = scene

    //         const height = layout.initHeight
    //         const translateY = position.interpolate({
    //             inputRange: [index - 1, index, index + 1],
    //             outputRange: [height, 0, 0],
    //         })

    //         const opacity = position.interpolate({
    //             inputRange: [index - 1, index - 0.99, index],
    //             outputRange: [0, 1, 1],
    //         })

    //         return { opacity, transform: [{ translateY }] }
    //     },
    // }),
  }
)

export function getCurrentScreen (navigationState) {
  if (!navigationState) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  if (route.routes) {
    return getCurrentScreen(route)
  }
  return route.routeName
}

export function routerReducer (state, action = {}) {
  return AppNavigator.router.getStateForAction(action, state)
}

export default AppNavigator
