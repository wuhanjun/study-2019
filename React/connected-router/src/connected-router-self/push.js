import {CALL_HISTORY_METHOD} from './constant';
export default function (path) {
    return {
        type: CALL_HISTORY_METHOD,
        payload: {
            method: 'push',
            path
        }
    }
}