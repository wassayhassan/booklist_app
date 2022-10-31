import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


let user = localStorage.getItem('user');



const initialState = {
    user: user? user: null,
    isLoading : false,
    isError: false,
    isSuccess: false,
    message: '',

}

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        rlogin: (state, action)=> {
            state.user = action.payload;
            localStorage.setItem('user', action.payload)
         },
        logout: (state)=> {
            state.isError = false;
            state.isLoading = false;
            state.message  = '';
            state.user = null;
            localStorage.setItem('user', null)
        }

    },
    
    
});
export const {  logout,rlogin} = AuthSlice.actions;
export default AuthSlice.reducer