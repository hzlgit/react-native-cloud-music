import * as types from '../constants/ActionTypes'
import AppNavigator, {routerReducer} from '../configs/Routers'

const firstAction = AppNavigator.router.getActionForPathAndParams('Main')
// const tempNavState = AppNavigator.router.getStateForAction(firstAction)
// const secondAction = AppNavigator.router.getActionForPathAndParams('Login')
const initialNavState = AppNavigator.router.getStateForAction(
  firstAction
)

export default function (state = initialNavState, action) {
  let newState = routerReducer(state, action)
  // if (action.type === NavigationActions.BACK) {
  //
  //     let backRouteIndex = null;
  //     if (action.key) {
  //         const backRoute = state.routes.find(route => route.routeName === action.key);
  //         backRouteIndex = state.routes.indexOf(backRoute);
  //     }
  //     if (backRouteIndex == null) {
  //         return StateUtils.pop(state);
  //     }
  //     if (backRouteIndex >= 0) {
  //         return {
  //             ...state,
  //             routes: state.routes.slice(0, backRouteIndex+1),
  //             index: backRouteIndex,
  //         };
  //     }
  // }
  return newState || state
}
