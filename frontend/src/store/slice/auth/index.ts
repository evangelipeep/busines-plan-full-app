import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    user: {},
    isLogged: true
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        
            iLogin(state, action){
                state.user = action.payload
                state.isLogged = true
                

            }
    
    }
})

export const {iLogin} = authSlice.actions
export default authSlice.reducer
