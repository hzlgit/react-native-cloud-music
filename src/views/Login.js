import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import {NavigationActions} from 'react-navigation'
import {Container, Input, Item, Icon, Button, Text} from 'native-base'
import LoadingWrap from '../components/LoadingWrap'

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({routeName: 'Main'})
  ]
})

class Login extends Component {
    static navigationOptions = {
      title: '手机号登录'
    }
    constructor (props) {
      super(props)
      this.state = {
        phone: null,
        password: null
      }
    }

    onLogin = () => {
      const {actions, navigation} = this.props
      if (!/^1\d{10}$/.test(this.state.phone)) {
        actions.toast('请输入正确的手机号码')
        return
      }
      if (!this.state.password) {
        actions.toast('请输入密码')
        return
      }
      actions.login(this.state.phone, this.state.password, (result) => {
        if (result.code === 200) {
          navigation.dispatch(resetAction)
        }
      })
    }

    onClose = () => {
      this.props.navigation.goBack()
    }

    render () {
      return (
        <Container style={styles.container}>
          <Item>
            <Icon active name='ios-phone-portrait-outline' />
            <Input
              style={styles.input}
              autoFocus
              placeholder='手机号'
              keyboardType='numeric'
              value={this.state.phone}
              onChangeText={(phone) => this.setState({phone})}
            />
          </Item>
          <Item last>
            <Icon active name='ios-lock-outline' />
            <Input
              style={styles.input}
              placeholder='密码'
              secureTextEntry
              value={this.state.password}
              onChangeText={(password) => this.setState({password})}
            />
          </Item>
          <View style={{padding: 12}}>
            <Button rounded dark block onPress={() => this.onLogin()}>
              <Text>登录</Text>
            </Button>
          </View>
          <LoadingWrap show={this.props.ui.loginPending} title='正在登录...' />
        </Container>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12
  },
  input: {

  }
})
export const LayoutComponent = Login
export function mapStateToProps (state) {
  return {
    user: state.user,
    ui: state.userUI
  }
}
