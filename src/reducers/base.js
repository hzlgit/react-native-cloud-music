import * as types from '../constants/ActionTypes';
const initialState = {
    personalized:[],
    banners: []
};
export default function (state = initialState, action) {
    const {payload, error, meta = {}, type} = action;
    const {sequence = {},mobile,account} = meta;
    if (sequence.type === 'start' || error) {
        return state;
    }
    switch (type) {
        case types.GET_BANNER:
            return {
                ...state,
                banners: payload.banners
            };
        case types.GET_PERSONALIZED:
            return {
                ...state,
                personalized: payload.result
            };
        default:
            return state;
    }
}
