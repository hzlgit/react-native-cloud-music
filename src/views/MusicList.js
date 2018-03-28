import React, { Component } from 'react'
import { StyleSheet, View, Image, StatusBar, Platform, SectionList } from 'react-native'
import {Icon, Text, Container, Content, Separator, Col, Header, Item, Input, Button, ListItem, Left, Right, Body, Thumbnail, Title} from 'native-base'
import RightButton from '../components/header/RightButton'
import {HeaderBackButton} from 'react-navigation'
import { BlurView } from 'react-native-blur'
import LinearGradient from 'react-native-linear-gradient'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import LoadingContainer from '../components/LoadingContainer'
import theme from '../themes'

class MusicList extends Component {
  static navigationOptions =({navigation}) => {
    return {
      title: '歌单',
      headerLeft: (
        <HeaderBackButton tintColor={Platform.select({
          ios: '#fff'
        })} onPress={() => navigation.pop()} />
      ),
      headerRight: (
        <RightButton />
      )
    }
  }
  constructor (props) {
    super(props)
    this.state = {
      list: null,
      isEdit: false
    }
  }
  componentDidMount () {
    const {navigation, actions} = this.props
    const {playlist} = navigation.state.params
    actions.getPlaylistDetail(playlist.id, (result) => {
      this.setState({list: [{key: '全部', data: result.tracks}]})
    })
  }
    gotoLogin = () => {
      this.props.navigation.navigate('Login')
    }
    _renderItem=({item, index}) => {
      return (
        <ListItem>
          <Text>{index + 1}</Text>
          <Body>
            <Text>{item.name}</Text>
          </Body>
          <Right>
            <Icon name='ios-more' />
          </Right>
        </ListItem>
      )
    }
    _renderSectionHeader () {
      return (
        <Separator section>
          <Text>全部</Text>
        </Separator>
      )
    }
    _renderlist () {
      const {ui} = this.props
      if (ui.getPlaylistPending || !this.state.list) {
        return <LoadingContainer />
      }
      return (
        <SectionList
          renderItem={this._renderItem}
          keyExtractor={(item) => item.id}
          renderSectionHeader={this._renderSectionHeader}
          ListHeaderComponent={this._renderHeader}
          sections={this.state.list}
        />
      )
    }
    _renderHeader () {
      return (
        <LinearGradient colors={['#000', '#444', '#666']} style={styles.back} />
      )
    }
    render () {
      const {user} = this.props
      return (
        <Container style={{backgroundColor: 'rgb(252,251,254)'}}>
          <StatusBar barStyle='light-content' />
          {this._renderlist()}
        </Container>
      )
    }
}
const parallaxHeight = 300
const styles = StyleSheet.create({
  list: {
    // backgroundColor: '#fff'
  },
  titleWrap: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  back: {
    flex: 1,
    height: parallaxHeight
  },
  iconBtn: {
    marginRight: 5
  }
})
export const LayoutComponent = MusicList
export function mapStateToProps (state) {
  return {
    user: state.user,
    ui: state.musicUI
  }
}
