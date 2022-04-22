import entryReducer from "./reducers/entryReducer"
import userReducer from "./reducers/userReducer"
import notificationReducer from "./reducers/notificationReducer"
import { configureStore } from "@reduxjs/toolkit"

const store = configureStore({
  reducer: {
    entries: entryReducer,
    users: userReducer,
    notification: notificationReducer
  }
})

export default store