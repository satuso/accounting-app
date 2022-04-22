const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case "SET_NOTIFICATION":
    return action.data
  case "CLEAR_NOTIFICATION":
    return null
  default:
    return state
  }
}

export const setNotification = (msg, style) => {
  window.clearTimeout(window.timeout)
  return async (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      data: { msg, style }
    })
    window.timeout = setTimeout(
      () => dispatch(clearNotification()),
      5000
    )
  }
}

export const clearNotification = () => {
  return {
    type: "CLEAR_NOTIFICATION"
  }
}

export default notificationReducer