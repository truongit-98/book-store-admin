import {
    ADD_ROLE,
    ADD_ROLE_SUCCEED,
    ADD_ROLE_FAILED,
} from './action_types';

export default {
    // add role action
    onAddRoleAction: (data) => ({
        type: ADD_ROLE,
        params: {
            data,
        }
    }),
    onAddRoleActionSucceed: (data) => ({
        type: ADD_ROLE_SUCCEED,
        params: {
            data,
        }
    }),
    onAddRoleActionFailed: (err) => ({
        type: ADD_ROLE_FAILED,
        params: {
            err,
        }
    })

    // 
}