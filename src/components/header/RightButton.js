import React, {Component} from 'react'
import {StyleSheet, Image} from 'react-native'
import {Button} from 'native-base'

export default class RightButton extends Component {
  render () {
    return (
      <Button style={[styles.btn, this.props.style]} transparent onPress={() => this.props.onPress}>
        <Image style={styles.image} source={require('../../../images/loading1.png')} />
      </Button>
    )
  }
}
const styles = StyleSheet.create({
  btn: {
    marginRight: 10,
    // marginLeft: 5,
    width: 32
  },
  image: {
    width: 28,
    height: 28,
    tintColor: '#fff'
  }
})
