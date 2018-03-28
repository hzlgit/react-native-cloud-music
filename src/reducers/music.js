import * as types from '../constants/ActionTypes'

const initialState = {
  list: []
}
function indexOf (id, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      return i
    }
  }
  return -1
}
function remove (id, arr) {
  let index = arr.indexOf(id)
  let result = arr.concat([])
  if (index > -1) {
    result.splice(index, 1)
  }
  return result
}

export default function (state = initialState, action) {
  const {payload, error, meta = {}, type} = action
  const {sequence = {}} = meta
  if (sequence.type === 'start' || error) {
    return state
  }
  switch (type) {
    case types.ADD_MUSIC_TO_LIST:
      return {
        ...state,
        list: state.index.concat(payload)
      }
    case types.REMOVE_MUSIC:
      return {
        ...state,
        list: remove(payload.music.id, state.list)
      }
    default:
      return state
  }
}
