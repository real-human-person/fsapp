import { TOGGLE_NAV_MENU_STATE } from "./actionTypes"

const toggleNavMenuState = menuState => {
    return {
        type: TOGGLE_NAV_MENU_STATE,
        navState: menuState
    }   
}

export {toggleNavMenuState}