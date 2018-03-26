import React, { Component } from 'react'
import { StyleSheet, View, Image, Button } from 'react-native'

class Account extends Component {
    static navigationOptions = {
      title: '帐号',
      tabBarLabel: '帐号',
      tabBarIcon: ({ focused }) =>
        <Image style={{width: 55, height: 55}} source={focused ? require('../../images/tab/user_selected.png') : require('../../images/tab/user_prs.png')} />
    }

    gotoLogin = () => {
      this.props.navigation.navigate('Login')
    }
    render () {
      return (
        <View style={styles.container}>
          <Button title='Goto Login' onPress={this.gotoLogin} />
        </View>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: 32,
    height: 32
  }
})
export const LayoutComponent = Account
export function mapStateToProps (state) {
  return {
    user: state.user
  }
}
