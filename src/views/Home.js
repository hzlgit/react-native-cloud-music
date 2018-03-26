import React, { Component } from 'react'
import { StyleSheet, View, Image, StatusBar, TouchableOpacity, Dimensions } from 'react-native'
import { formatTenThousand } from '../utils'
import { SafeAreaView} from 'react-navigation'
import {Icon, Text, Container, Content, Row, Col} from 'native-base'
import Swiper from 'react-native-swiper'
import SearchButton from '../components/SearchButton'
import RightButton from '../components/header/RightButton'

class Home extends Component {
    static navigationOptions = {
      title: '发现',
      tabBarLabel: '发现',
      tabBarIcon: ({ focused, tintColor }) =>
        <Image style={{width: 55, height: 55}} source={focused ? require('../../images/tab/discover_selected.png') : require('../../images/tab/discover_prs.png')} />,
      headerTitle: (<SearchButton placeholder='Oops 很好听哦' />),
      headerRight: (<RightButton />)
      // header:()=>{
      //     return (
      //         <Header searchBar rounded>
      //             <Item>
      //                 <SearchButton placeholder='Oops 很好听哦'/>
      //             </Item>
      //             <RightButton style={{marginRight:0}}/>
      //         </Header>
      //     )
      // }
    }
    constructor (props) {
      super(props)
      this.state = {
        showSwiper: false
      }
    }
    componentDidMount () {
      setTimeout(() => {
        this.setState({showSwiper: true})
      }, 10)
      this.props.actions.getBanner()
      this.props.actions.getPersonalized()
    }

    gotoDetail = () => {
      this.props.navigation.navigate('Detail')
    }
    _renderBanner () {
      const {base} = this.props
      const {banners = []} = base
      if (banners && banners.length > 0 && this.state.showSwiper) {
        return banners.map(item => {
          return (
            <TouchableOpacity key={item.targetId} activeOpacity={1} style={styles.bannerContainer}>
              <Image style={{width: '100%', height: width * 0.39}} source={{uri: item.pic}} />
            </TouchableOpacity>
          )
        })
      }
      return (
        <View style={styles.bannerContainer}>
          <Icon name='ios-image-outline' style={{fontSize: 40, color: '#ccc'}} />
        </View>
      )
    }
    _renderPersonalized () {
      const {base, baseUI} = this.props
      const {personalized = []} = base
      if (personalized && personalized.length > 0) {
        return personalized.map((item, i) => {
          const marLeft = (i + 1) % 3 === 0 ? 0 : 3
          return (
            <TouchableOpacity key={item.id} activeOpacity={1} style={[styles.listCol, {marginRight: marLeft}]}>
              <Image style={{width: '100%', height: width * 0.39}} source={{uri: item.picUrl}} />
              <View style={styles.colText}>
                <Text desc numberOfLines={2}>{item.name}</Text>
              </View>
              <View style={styles.playCountWrap}>
                <Icon name='ios-headset' style={{color: '#fff', fontSize: 15}} />
                <Text style={{color: '#fff', fontSize: 12}}>{formatTenThousand(item.playCount)}</Text>
              </View>
            </TouchableOpacity>
          )
        })
      }
    }
    render () {
      const date = new Date().getDate()
      const colWidth = (width - 24) / 4
      const left = (colWidth - 55) / 2
      return (
        <Container>
          {/* <SafeAreaView> */}
          <StatusBar barStyle='light-content' />
          <Content>
            <Swiper
              style={styles.wrapper}
              dotStyle={{bottom: 0, width: 5, height: 5}}
              activeDotStyle={{width: 5, height: 5}}
              paginationStyle={{bottom: 5}}
              activeDotColor='#444'
              dotColor='#fff'
            >
              {this._renderBanner()}
            </Swiper>
            <Row style={styles.menuWrapper}>
              <Col style={styles.col}>
                <Image style={styles.btnIcon} source={require('../../images/fm_normal.png')} />
                <Text menu>私人FM</Text>
              </Col>
              <Col style={styles.col}>
                <Image style={styles.btnIcon} source={require('../../images/dailly_normal.png')} />
                <View style={{position: 'absolute', top: 15, left: left, width: 55}}>
                  <Text style={{fontSize: 22, color: 'rgb(82,82,84)', alignSelf: 'center'}}>{date}</Text>
                </View>
                <Text menu>每日推荐</Text>
              </Col>
              <Col style={styles.col}>
                <Image style={styles.btnIcon} source={require('../../images/upbill.png')} />
                <Text menu>歌单</Text>

              </Col>
              <Col style={styles.col}>
                <Image style={styles.btnIcon} source={require('../../images/upbill.png')} />
                <Text menu>排行榜</Text>
              </Col>
            </Row>
            <View style={styles.driverWrap}>
              <View style={styles.line} />
              <Text style={{color: color1}}>推荐歌单</Text> <Icon type='Entypo' name='chevron-thin-right' style={{color: color1, fontSize: 15}} />
            </View>
            <Row style={styles.listWrapper}>
              {this._renderPersonalized()}
            </Row>
          </Content>

          {/* </SafeAreaView> */}
        </Container>
      )
    }
}
const {width, height} = Dimensions.get('window')
const color1 = 'rgb(102,102,104)'
const styles = StyleSheet.create({
  wrapper: {
    width: width,
    height: width * 0.39
  },
  menuWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#c9c9c9',
    paddingHorizontal: 12,
    paddingVertical: 20
  },
  bannerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'

  },
  driverWrap: {
    paddingVertical: 12,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center'
  },
  line: {
    width: 1,
    backgroundColor: color1,
    height: 15,
    marginRight: 5
  },
  col: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: 32,
    height: 32,
    tintColor: '#fff'
  },
  btnIcon: {
    width: 55,
    height: 55,
    tintColor: 'rgb(82,82,84)'
  },
  listCol: {
    width: (width - 6) / 3,
    // marginLeft: 3,
    marginBottom: 15
  },
  colText: {
    paddingHorizontal: 3
  },
  listWrapper: {
    flexWrap: 'wrap',
    backgroundColor: '#fff'
  },
  playCountWrap: {
    position: 'absolute',
    top: 2,
    right: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
})
export const LayoutComponent = Home
export function mapStateToProps (state) {
  return {
    user: state.user,
    base: state.base,
    baseUI: state.baseUI
  }
}
