const duration = 3000;
import {msgType} from "../../const";

export default {
    namespaced: true,
    state: {
        notices: []
    },
    mutations: {
        ADD_NOTICE(state, notice) {
            state.notices.push(notice);
            setTimeout(() => {
                state.notices.splice(state.notices.indexOf(notice), 1);
            }, duration);
        }
    },
    actions: {
        addNotice(
            {commit},
            {
                msg = '',
                isSuccess = false,
                isError = false,
                isWarning = false
            }
        ) {
            const type = isSuccess ? msgType.success :
                isError ? msgType.error :
                isWarning ? msgType.info :
                msgType.info;
            commit('ADD_NOTICE', {type, msg});
        }
    },
    getters: {
        notices: state => state.notices
    }
}