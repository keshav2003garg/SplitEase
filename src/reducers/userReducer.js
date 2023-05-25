import {
    GOOGLE_REGISTER__REQUEST, GOOGLE_REGISTER__SUCCESS, GOOGLE_REGISTER__FAIL,
    GOOGLE_LOGOUT__REQUEST, GOOGLE_LOGOUT__SUCCESS, GOOGLE_LOGOUT__FAIL,
    CREATE_GROUP__REQUEST, CREATE_GROUP__SUCCESS, CREATE_GROUP__FAIL,
    FETCH_GROUPS__REQUEST, FETCH_GROUPS__SUCCESS, FETCH_GROUPS__FAIL,
    FETCH_GROUP__REQUEST, FETCH_GROUP__SUCCESS, FETCH_GROUP__FAIL,
    JOIN_GROUP__REQUEST, JOIN_GROUP__SUCCESS, JOIN_GROUP__NOT_SUCCESS, JOIN_GROUP__FAIL,
    FETCH_GROUP_MEMBERS__REQUEST, FETCH_GROUP_MEMBERS__SUCCESS, FETCH_GROUP_MEMBERS__FAIL,
    LEAVE_GROUP__REQUEST, LEAVE_GROUP__SUCCESS, LEAVE_GROUP__FAIL,
    DELETE_GROUP__REQUEST, DELETE_GROUP__SUCCESS, DELETE_GROUP__FAIL,
    UPDATE_GROUP__REQUEST, UPDATE_GROUP__SUCCESS, UPDATE_GROUP__FAIL,
    FETCH_USER_DETAILS__REQUEST, FETCH_USER_DETAILS__SUCCESS, FETCH_USER_DETAILS__FAIL,
    UPDATE_USER_DETAILS__REQUEST, UPDATE_USER_DETAILS__SUCCESS, UPDATE_USER_DETAILS__FAIL,
    UPDATE_PAYMENT_DETAILS__REQUEST, UPDATE_PAYMENT_DETAILS__SUCCESS, UPDATE_PAYMENT_DETAILS__FAIL,
    ADD_EXPENSE__REQUEST, ADD_EXPENSE__SUCCESS, ADD_EXPENSE__FAIL,
    FETCH_BALANCE__REQUEST, FETCH_BALANCE__SUCCESS, FETCH_BALANCE__FAIL,
    FETCH_CATEGORIES_CHART__REQUEST, FETCH_CATEGORIES_CHART__SUCCESS, FETCH_CATEGORIES_CHART__FAIL,
    FETCH_GROUP_CHART__REQUEST, FETCH_GROUP_CHART__SUCCESS, FETCH_GROUP_CHART__FAIL,
    FETCH_SPENDS_CHART__REQUEST, FETCH_SPENDS_CHART__SUCCESS, FETCH_SPENDS_CHART__FAIL,
    ADD_SETTLEMENT__REQUEST, ADD_SETTLEMENT__SUCCESS, ADD_SETTLEMENT__FAIL,
    FETCH_SETTLEMENTS__REQUEST, FETCH_SETTLEMENTS__SUCCESS, FETCH_SETTLEMENTS__FAIL,

    BIOMETRIC_NEEDED, BIOMETRIC_NOT_NEEDED,
    CLEAR__ERRORS, CLEAR__MESSAGES,
    BOTTOM_TAB__VISIBLE, BOTTOM_TAB__HIDDEN,
    ADD_ACTIVITY,
} from '../constants/userConstants';



const initialState = { isAuthenticated: false, tabVisible: true, isFingerPrintNeeded: false, groups: [], balance: [], activity: [], categoriesChartData: [], groupChartData: [], spendsChartData: [], settlements: [] };
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GOOGLE_REGISTER__REQUEST:
        case GOOGLE_LOGOUT__REQUEST:
        case CREATE_GROUP__REQUEST:
        case JOIN_GROUP__REQUEST:
        case LEAVE_GROUP__REQUEST:
        case DELETE_GROUP__REQUEST:
        case ADD_EXPENSE__REQUEST:
        case ADD_SETTLEMENT__REQUEST:
            return {
                ...state,
                loading: true,
            }
        case FETCH_GROUPS__REQUEST:
            return {
                ...state,
                pulseLoading: true,
            }
        case FETCH_GROUP__REQUEST:
        case FETCH_USER_DETAILS__REQUEST:
            return {
                ...state,
                localLoading: true,
            }
        case FETCH_GROUP_MEMBERS__REQUEST:
            return {
                ...state,
                memberLoading: true,
            }
        case UPDATE_GROUP__REQUEST:
        case UPDATE_USER_DETAILS__REQUEST:
        case UPDATE_PAYMENT_DETAILS__REQUEST:
            return {
                ...state,
                spinLoading: true,
            }
        case FETCH_BALANCE__REQUEST:
        case FETCH_SETTLEMENTS__REQUEST:
            return {
                ...state,
                tabLoading: true,
            }
        case FETCH_CATEGORIES_CHART__REQUEST:
        case FETCH_GROUP_CHART__REQUEST:
        case FETCH_SPENDS_CHART__REQUEST:
            return {
                ...state,
                chartLoading: true,
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
                pulseLoading: false,
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
        case FETCH_GROUP_MEMBERS__SUCCESS:
            return {
                ...state,
                memberLoading: false,
                groupMembers: action.payload.groupMembers
            }
        case LEAVE_GROUP__SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                groups: state.groups.filter(group => group.groupID !== action.payload.groupID)
            }
        case DELETE_GROUP__SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                groups: state.groups.filter(group => group.groupID !== action.payload.groupID)
            }
        case UPDATE_GROUP__SUCCESS:
            return {
                ...state,
                spinLoading: false,
                message: action.payload.message,
            }
        case FETCH_GROUP__SUCCESS:
            return {
                ...state,
                localLoading: false,
                groupInfo: action.payload.group
            }
        case FETCH_USER_DETAILS__SUCCESS:
            return {
                ...state,
                localLoading: false,
                user: { ...state.user, ...action.payload.user }
            }
        case UPDATE_USER_DETAILS__SUCCESS:
            return {
                ...state,
                spinLoading: false,
                message: action.payload.message,
                user: { ...state.user, ...action.payload.user }
            }
        case UPDATE_PAYMENT_DETAILS__SUCCESS:
            return {
                ...state,
                spinLoading: false,
                message: action.payload.message,
                user: { ...state.user, ...action.payload.user }
            }
        case ADD_EXPENSE__SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
            }
        case FETCH_BALANCE__SUCCESS:
            return {
                ...state,
                tabLoading: false,
                balance: action.payload.balance,
                total: action.payload.total,
                totalGroupSpent: action.payload.totalGroupSpent,
                you_paid: action.payload.you_paid,
                your_share: action.payload.your_share,
            }
        case FETCH_CATEGORIES_CHART__SUCCESS:
            return {
                ...state,
                chartLoading: false,
                categoriesChartData: action.payload.chartData,
            }
        case FETCH_GROUP_CHART__SUCCESS:
            return {
                ...state,
                chartLoading: false,
                groupChartData: action.payload.chartData,
            }
        case FETCH_SPENDS_CHART__SUCCESS:
            return {
                ...state,
                chartLoading: false,
                spendsChartData: action.payload.chartData,
            }
        case ADD_SETTLEMENT__SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
            }
        case FETCH_SETTLEMENTS__SUCCESS:
            return {
                ...state,
                tabLoading: false,
                settlements: action.payload.settlements,
            }





        case GOOGLE_REGISTER__FAIL:
        case GOOGLE_LOGOUT__FAIL:
        case CREATE_GROUP__FAIL:
        case JOIN_GROUP__FAIL:
        case LEAVE_GROUP__FAIL:
        case DELETE_GROUP__FAIL:
        case ADD_EXPENSE__FAIL:
        case ADD_SETTLEMENT__FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case FETCH_GROUPS__FAIL:
            return {
                ...state,
                pulseLoading: false,
                error: action.payload
            }
        case FETCH_GROUP__FAIL:
        case FETCH_USER_DETAILS__FAIL:
            return {
                ...state,
                localLoading: false,
                error: action.payload
            }
        case FETCH_GROUP_MEMBERS__FAIL:
            return {
                ...state,
                memberLoading: false,
                error: action.payload
            }
        case UPDATE_GROUP__FAIL:
        case UPDATE_USER_DETAILS__FAIL:
        case UPDATE_PAYMENT_DETAILS__FAIL:
            return {
                ...state,
                spinLoading: false,
                error: action.payload
            }
        case FETCH_BALANCE__FAIL:
        case FETCH_SETTLEMENTS__FAIL:
            return {
                ...state,
                tabLoading: false,
                error: action.payload
            }
        case FETCH_CATEGORIES_CHART__FAIL:
        case FETCH_GROUP_CHART__FAIL:
        case FETCH_SPENDS_CHART__FAIL:
            return {
                ...state,
                chartLoading: false,
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
        case ADD_ACTIVITY:
            return {
                ...state,
                activity: [...state.activity, action.payload]
            }


        default:
            return state
    }
}



export default userReducer;