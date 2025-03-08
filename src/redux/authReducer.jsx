const initialState = {
    isAuthenticated: false,
    user: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            const { email, password } = action.payload;
            // Hardcoded user credentials
            if (email === 'user@example.com' && password === 'password123') {
                return {
                    ...state,
                    isAuthenticated: true,
                    user: { email },
                };
            } else {
                return state;
            }
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };
        default:
            return state;
    }
};

export default authReducer;