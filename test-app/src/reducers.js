//import {toggleNavMenuState} from './actions'
import { TOGGLE_NAV_MENU_STATE } from './actionTypes'

const initialState = {
    navMenuVisibility: 'menu preload_menu',
    user: null
}

const testApp = (state = initialState, action) => {
    switch(action.type){
        case TOGGLE_NAV_MENU_STATE:
            return {
                ...state,
                navMenuVisibility: action.navState
            }
        default:   
            return state
    }
}

export default testApp