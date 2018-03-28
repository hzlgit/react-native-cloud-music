import React, {Component} from 'react'
import {StyleSheet, View, Dimensions, BackHandler, ToastAndroid} from 'react-native'
import * as UtilsComponent from './Utils'
import connectComponent from '../utils/connectComponent'
import AppNavigator, {getCurrentScreen} from '../configs/Routers'
import {addNavigationHelpers, NavigationActions} from 'react-navigation'
import {initializeListeners} from 'react-navigation-redux-helpers'
import {addListener} from '../utils/redux'

const Utils = connectComponent(UtilsComponent)
const { height, width } = Dimensions.get('window')

class Navigation extends Component {
  constructor (props) {
    super(props)
    this.lastBackPressed = null
  }
  componentDidMount () {
    initializeListeners('root', this.props.nav)
  }
  componentWillMount () {
    BackHandler.addEventListener('hardwareBackPress', this.backHandle)
  }
  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
  }
  backHandle = () => {
    const currentScreen = getCurrentScreen(this.props.nav)
    if (currentScreen !== 'Home' && currentScreen !== 'Login') {
      this.props.dispatch(NavigationActions.back())
      return true
    } else if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
      // 最近2秒内按过back键，可以退出应用。
      // BackAndroid.exitApp();
      return false
    } else {
      this.lastBackPressed = Date.now()
      ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT)
      return true
    }
  }
  render () {
    const {nav} = this.props
    const {dispatch} = this.props
    return (
      <View style={styles.bg}>
        <AppNavigator
          navigation={addNavigationHelpers({ dispatch, state: nav, addListener })}
          ref={(v) => { this.navigation = v }}
        />
        <Utils />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bg: {
    flex: 1,
    height,
    width,
    backgroundColor: 'transparent'
  }
})

export const LayoutComponent = Navigation
export function mapStateToProps (state, props) {
  return {
    user: state.user,
    utils: state.utils,
    nav: state.nav
  }
}
export function mapDispatchToProps (dispatch) {
  return {
    dispatch
  }
}
