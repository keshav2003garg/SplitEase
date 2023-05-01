const GOOGLE_REGISTER__REQUEST = "GOOGLE_REGISTER__REQUEST";
const GOOGLE_REGISTER__SUCCESS = "REGISTER__SUCCESS";
const GOOGLE_REGISTER__FAIL = "GOOGLE_REGISTER__FAIL";

const GOOGLE_LOGOUT__REQUEST = "GOOGLE_LOGOUT__REQUEST";
const GOOGLE_LOGOUT__SUCCESS = "GOOGLE_LOGOUT__SUCCESS";
const GOOGLE_LOGOUT__FAIL = "GOOGLE_LOGOUT__FAIL";

const CREATE_GROUP__REQUEST = "CREATE_GROUP__REQUEST";
const CREATE_GROUP__SUCCESS = "CREATE_GROUP__SUCCESS";
const CREATE_GROUP__FAIL = "CREATE_GROUP__FAIL";

const FETCH_GROUPS__REQUEST = "FETCH_GROUPS__REQUEST";
const FETCH_GROUPS__SUCCESS = "FETCH_GROUPS__SUCCESS";
const FETCH_GROUPS__FAIL = "FETCH_GROUPS__FAIL";

const FETCH_GROUP__REQUEST = "FETCH_GROUP__REQUEST";
const FETCH_GROUP__SUCCESS = "FETCH_GROUP__SUCCESS";
const FETCH_GROUP__FAIL = "FETCH_GROUP__FAIL";

const JOIN_GROUP__REQUEST = "JOIN_GROUP__REQUEST";
const JOIN_GROUP__SUCCESS = "JOIN_GROUP__SUCCESS";
const JOIN_GROUP__NOT_SUCCESS = "JOIN_GROUP__NOT_SUCCESS";
const JOIN_GROUP__FAIL = "JOIN_GROUP__FAIL";

const FETCH_GROUP_MEMBERS__REQUEST = "FETCH_GROUP_MEMBERS__REQUEST";
const FETCH_GROUP_MEMBERS__SUCCESS = "FETCH_GROUP_MEMBERS__SUCCESS";
const FETCH_GROUP_MEMBERS__FAIL = "FETCH_GROUP_MEMBERS__FAIL";

const LEAVE_GROUP__REQUEST = "LEAVE_GROUP__REQUEST";
const LEAVE_GROUP__SUCCESS = "LEAVE_GROUP__SUCCESS";
const LEAVE_GROUP__FAIL = "LEAVE_GROUP__FAIL";

const DELETE_GROUP__REQUEST = "DELETE_GROUP__REQUEST";
const DELETE_GROUP__SUCCESS = "DELETE_GROUP__SUCCESS";
const DELETE_GROUP__FAIL = "DELETE_GROUP__FAIL";

const UPDATE_GROUP__REQUEST = "UPDATE_GROUP__REQUEST";
const UPDATE_GROUP__SUCCESS = "UPDATE_GROUP__SUCCESS";
const UPDATE_GROUP__FAIL = "UPDATE_GROUP__FAIL";

const FETCH_USER_DETAILS__REQUEST = "FETCH_USER_DETAILS__REQUEST";
const FETCH_USER_DETAILS__SUCCESS = "FETCH_USER_DETAILS__SUCCESS";
const FETCH_USER_DETAILS__FAIL = "FETCH_USER_DETAILS__FAIL";

const UPDATE_USER_DETAILS__REQUEST = "UPDATE_USER_DETAILS__REQUEST";
const UPDATE_USER_DETAILS__SUCCESS = "UPDATE_USER_DETAILS__SUCCESS";
const UPDATE_USER_DETAILS__FAIL = "UPDATE_USER_DETAILS__FAIL";

const UPDATE_PAYMENT_DETAILS__REQUEST = "UPDATE_PAYMENT_DETAILS__REQUEST";
const UPDATE_PAYMENT_DETAILS__SUCCESS = "UPDATE_PAYMENT_DETAILS__SUCCESS";
const UPDATE_PAYMENT_DETAILS__FAIL = "UPDATE_PAYMENT_DETAILS__FAIL";



const BIOMETRIC_NEEDED = "BIOMETRIC_NEEDED";
const BIOMETRIC_NOT_NEEDED = "BIOMETRIC_NOT_NEEDED";

const CLEAR__MESSAGES = "CLEAR__MESSAGES";
const CLEAR__ERRORS = "CLEAR__ERRORS";

const BOTTOM_TAB__VISIBLE = "BOTTOM_TAB__VISIBLE";
const BOTTOM_TAB__HIDDEN = "BOTTOM_TAB__HIDDEN";

export {
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
    
    BIOMETRIC_NEEDED, BIOMETRIC_NOT_NEEDED,
    CLEAR__MESSAGES, CLEAR__ERRORS,
    BOTTOM_TAB__VISIBLE, BOTTOM_TAB__HIDDEN
};