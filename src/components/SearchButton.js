import React,{Component} from 'react'
import { View, StyleSheet, TouchableOpacity,Dimensions } from 'react-native'
import {Icon,Text} from 'native-base'

export default class SearchButton extends Component {
 
  render(){
    return (
      <TouchableOpacity activeOpacity={1} style={[styles.container,this.props.style]}>
        <Icon name="ios-search" style={{fontSize:15,color:color,paddingRight: 5,}}/>
        <Text style={{fontSize:12,color:color}}>{this.props.placeholder}</Text>
      </TouchableOpacity>
    )
  }
}
const color= "rgb(194,194,194)"
const width = Dimensions.get('window').width
const styles = StyleSheet.create({
  container: {
      // flex: 3,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      borderRadius: 15,
      height:30,
      backgroundColor: "#fff",
      width:width-105
  },
})