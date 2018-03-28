import * as types from '../constants/ActionTypes'

const initialState = {
  getPlaylistPending: false
}

export default function (state = initialState, action) {
  const { type, meta = {} } = action
  const { sequence = {} } = meta

  switch (type) {
    case types.GET_PLAYLIST_DETAIL:
      return {
        ...state,
        getPlaylistPending: sequence.type === 'start'
      }
    default:
      return state
  }
}
