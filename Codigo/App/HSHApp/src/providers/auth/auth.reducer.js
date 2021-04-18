
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN:
            return {
                ...state,
                isLoggedIn: true,
                userLogged: action.userLogged,
            };
        case LOG_OUT:
            return {
                ...state,
                ...initialState,
            };
    }
}

export const initialState = {
    isLoading: true,
    isLoggedIn: false,
    userLogged: null,
}

export default authReducer;