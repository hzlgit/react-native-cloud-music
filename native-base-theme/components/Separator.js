import variable from './../variables/platform'

export default (variables = variable) => {
  const theme = {
    '.group': {
      height: 50,
      paddingVertical: variables.listItemPadding - 8,
      paddingTop: variables.listItemPadding + 12,
      '.bordered': {
        height: 50,
        paddingVertical: variables.listItemPadding - 8,
        paddingTop: variables.listItemPadding + 12
      }
    },
    '.section': {
      backgroundColor: '#fff'
    },
    '.bordered': {
      '.noTopBorder': {
        borderTopWidth: 0
      },
      '.noBottomBorder': {
        borderBottomWidth: 0
      },
      height: 35,
      paddingTop: variables.listItemPadding + 2,
      paddingBottom: variables.listItemPadding,
      borderBottomWidth: variables.borderWidth,
      borderTopWidth: variables.borderWidth,
      borderColor: variables.listBorderColor
    },
    'NativeBase.Text': {
      fontSize: variables.tabBarTextSize - 2,
      color: '#777'
    },
    '.noTopBorder': {
      borderTopWidth: 0
    },
    '.noBottomBorder': {
      borderBottomWidth: 0
    },
    height: 38,
    backgroundColor: 'rgb(239,240,241)',
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: variables.listItemPadding + 5
  }

  return theme
}
