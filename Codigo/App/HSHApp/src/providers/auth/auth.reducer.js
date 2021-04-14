
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN:
            return {
                ...state,
                isSignout: false,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken,
            };
        case LOG_OUT:
            return {
                ...state,
                ...initialState,
            };
        // case 'RESTORE_TOKEN':
        //   return {
        //     ...state,
        //     isLoading: false,
        //     accessToken: action.accessToken,
        //     refreshToken: action.refreshToken,
        //   };
    }
}

export const initialState = {
    isLoading: true,
    isSignout: false,
    accessToken: null,
    refreshToken: null,
}

export default authReducer;