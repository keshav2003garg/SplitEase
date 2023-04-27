import {
    GOOGLE_REGISTER__REQUEST, GOOGLE_REGISTER__SUCCESS, GOOGLE_REGISTER__FAIL,
    GOOGLE_LOGOUT__REQUEST, GOOGLE_LOGOUT__SUCCESS, GOOGLE_LOGOUT__FAIL,

    BIOMETRIC_NEEDED, BIOMETRIC_NOT_NEEDED,
    CLEAR__ERRORS, CLEAR__MESSAGES,
    BOTTOM_TAB__VISIBLE, BOTTOM_TAB__HIDDEN
} from '../constants/userConstants';



const initialState = { isAuthenticated: false, tabVisible: true, isFingerPrintNeeded: false };
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GOOGLE_REGISTER__REQUEST:
        case GOOGLE_LOGOUT__REQUEST:
            return {
                ...state,
                loading: true,
            }


        case GOOGLE_REGISTER__SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                message: action.payload.message,
                user: action.payload.user
            }
        case GOOGLE_LOGOUT__SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                message: action.payload.message,
                user: null
            }


        case GOOGLE_REGISTER__FAIL:
        case GOOGLE_LOGOUT__FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }


        case CLEAR__MESSAGES:
            return {
                ...state,
                message: undefined
            }
        case CLEAR__ERRORS:
            return {
                ...state,
                error: undefined
            }

        case BOTTOM_TAB__VISIBLE:
            return {
                ...state,
                tabVisible: true
            }
        case BOTTOM_TAB__HIDDEN:
            return {
                ...state,
                tabVisible: false
            }

        case BIOMETRIC_NEEDED:
            return {
                ...state,
                isFingerPrintNeeded: true
            }
        case BIOMETRIC_NOT_NEEDED:
            return {
                ...state,
                isFingerPrintNeeded: false
            }


        default:
            return state
    }
}



export default userReducer;