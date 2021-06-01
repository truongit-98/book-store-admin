import {
    ADD_ROLE,
    ADD_ROLE_SUCCEED,
    ADD_ROLE_FAILED,
} from '../actions/role/action_types';


export default ( state = {
    role: {},
}, action) => {
    switch(action.type) {
        case ADD_ROLE:
            return {
                ...state
            }
        case ADD_ROLE_SUCCEED:
            return {
                ...state
            }
        case ADD_ROLE_FAILED:
            return {
                ...state
            }
        default:
            return {...state}
    }
}