import { SET_LOADING } from "../actions/types";

export default (state = { loading: false}, action) => {
    switch (action.type) {
        case SET_LOADING:
            return { loading: action.payload.loading};
        default:
            return state;
    }
}
