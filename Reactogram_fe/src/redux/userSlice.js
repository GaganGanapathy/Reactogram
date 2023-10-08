import { createSlice } from "@reduxjs/toolkit"

const initialValue = {
  user: {},
}

export const userSlice = createSlice({
  name: "user",
  initialState: initialValue,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload
    },
    loginError: (state, action) => {
      state.user = {}
    },
  },
})

export const { loginSuccess, loginError } = userSlice.actions
export default userSlice.reducer
