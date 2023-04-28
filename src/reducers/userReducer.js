import {
    GOOGLE_REGISTER__REQUEST, GOOGLE_REGISTER__SUCCESS, GOOGLE_REGISTER__FAIL,
    GOOGLE_LOGOUT__REQUEST, GOOGLE_LOGOUT__SUCCESS, GOOGLE_LOGOUT__FAIL,
    CREATE_GROUP__REQUEST, CREATE_GROUP__SUCCESS, CREATE_GROUP__FAIL,
    FETCH_GROUPS__REQUEST, FETCH_GROUPS__SUCCESS, FETCH_GROUPS__FAIL,
    JOIN_GROUP__REQUEST, JOIN_GROUP__SUCCESS, JOIN_GROUP__NOT_SUCCESS, JOIN_GROUP__FAIL,

    BIOMETRIC_NEEDED, BIOMETRIC_NOT_NEEDED,
    CLEAR__ERRORS, CLEAR__MESSAGES,
    BOTTOM_TAB__VISIBLE, BOTTOM_TAB__HIDDEN
} from '../constants/userConstants';



const initialState = { isAuthenticated: false, tabVisible: true, isFingerPrintNeeded: false, groups: [] };
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GOOGLE_REGISTER__REQUEST:
        case GOOGLE_LOGOUT__REQUEST:
        case CREATE_GROUP__REQUEST:
        case FETCH_GROUPS__REQUEST:
        case JOIN_GROUP__REQUEST:
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
                user: null,
                groups: []
            }
        case CREATE_GROUP__SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                groups: [...state.groups, action.payload.group]
            }
        case FETCH_GROUPS__SUCCESS:
            return {
                ...state,
                loading: false,
                groups: action.payload.groups
            }
        case JOIN_GROUP__NOT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            }
        case JOIN_GROUP__SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                groups: [...state.groups, action.payload.group]
            }


        case GOOGLE_REGISTER__FAIL:
        case GOOGLE_LOGOUT__FAIL:
        case CREATE_GROUP__FAIL:
        case FETCH_GROUPS__FAIL:
        case JOIN_GROUP__FAIL:
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