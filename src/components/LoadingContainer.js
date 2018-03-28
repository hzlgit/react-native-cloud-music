import React, {Component} from 'react'
import {View} from 'react-native'
import {Text, Spinner} from 'native-base'
class LoadingContainer extends Component {
  render () {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Spinner size='small' color='#000' style={{height: 55}} />
        <Text>{this.props.text ? this.props.text : '正在加载...'}</Text>
      </View>
    )
  }
}
export default LoadingContainer
