import variable from './../variables/platform'

export default (variables = variable) => {
  const textTheme = {
    fontSize: variables.DefaultFontSize - 1,
    fontFamily: variables.fontFamily,
    color: variables.textColor,
    '.note': {
      color: '#a7a7a7',
      fontSize: variables.noteFontSize
    },
    '.menu': {
      color: 'rgb(82,82,84)',
      fontSize: 13,
      marginTop: 5
    },
    '.desc': {
      color: '#666',
      fontSize: 12,
      marginTop: 5
    }
  }

  return textTheme
}
