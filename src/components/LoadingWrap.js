import React, {Component} from 'react'
import {View, StyleSheet, Text, Animated} from 'react-native'
import {Spinner} from 'native-base'
import PropTypes from 'prop-types'

const toastWidth = 110

class Loading extends Component {
  static propTypes = {
    show: PropTypes.bool
  }
  static defaultProps = {
    show: false
  }

  constructor (props) {
    super(props)
    this.state = {
      fadeAnim: new Animated.Value(1.0)
    }
  }
  render () {
    const opacity = {
      opacity: this.state.fadeAnim
    }
    if (!this.props.show) return null
    return (
      <Animated.View style={[styles.container, this.props.style, opacity]}>
        <View style={styles.scontainer}>
          <Spinner color='white' />
          <Text style={styles.text}>{this.props.title || '正在加载...'}</Text>
          {/* <Image source={require('../../images/loading.gif')} style={{width: 35, height: 35}} /> */}
        </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0
  },
  scontainer: {
    borderRadius: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: toastWidth,
    justifyContent: 'center',
    // alignItems: 'center',
    height: toastWidth
  },
  text: {
    color: 'white',
    fontSize: 13,
    textAlign: 'center'
  }
})

export default Loading
