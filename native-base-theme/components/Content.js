import variable from './../variables/platform'
import {Platform} from 'react-native'

export default (variables = variable) => {
  const contentTheme = {
    '.padder': {
      padding: variables.contentPadding
    },
    flex: 1,
    backgroundColor: 'transparent',
    'NativeBase.Segment': {
      borderWidth: 0,
      backgroundColor: 'transparent'
    }
  }
  return contentTheme
}
