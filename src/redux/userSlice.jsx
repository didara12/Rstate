import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {

    userData:null,
    data:null,
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
}

 

export const fetchData = createAsyncThunk('user/fetchData', async () => {
    try {
      const response = await axios.get('http://localhost:5000/home');
      return response.data.data;
    } catch (error) {
      throw error;
    }
  });




export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
      signInSuccess: (state,action)=>{
            state.userData = action.payload
            state.status = "succeeded"
            console.log('pyloud::::::',state.userData)
        },
      addData: (state,action)=>{
        state.data.push(action.payload)
      }
    },
    extraReducers: (builder) => {
        // Add extra reducers for handling the async action lifecycle
        builder
          .addCase(fetchData.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchData.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
          })
          .addCase(fetchData.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          });

      },
})

export const {signInSuccess,addData} = userSlice.actions
export default userSlice.reducer