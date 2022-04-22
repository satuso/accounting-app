import { createSlice } from "@reduxjs/toolkit"
import entryService from "../services/entries"

const slice = createSlice({
  name: "entry",
  initialState: [],
  reducers: {
    initializeWith(state, { payload }) {
      return payload
    },
    addNew(state, { payload }) {
      return state.concat(payload)
    },
    removeOne(state, { payload }) {
      return state.filter(t => t.id !== payload)
    },
    updateOne(state, { payload }) {
      return state.map(t => (t.id === payload.id ? payload : t))
    },
  },
})

export const initializeEntries = () => {
  return async (dispatch) => {
    entryService.getAll().then((response) => {
      dispatch(initializeWith(response))
    })
  }
}

export const deleteEntry = (id) => {
  return async (dispatch) => {
    entryService.remove(id).then(() => {
      dispatch(removeOne(id))
    })
  }
}

export const createEntry = (thread) => {
  return async (dispatch) => {
    entryService
      .create(thread)
      .then((response) => {
        dispatch(addNew(response))
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

const { initializeWith, addNew, removeOne } = slice.actions
export default slice.reducer