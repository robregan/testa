import { createContext, useReducer } from "react"

export const DiaryContext = createContext()

// state = the previous value before making change to it, in this ex. diary: null // 
export const diaryReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DIARY':
            return {
                diary: action.payload
            }
        case 'CREATE_DIARY':
            return {
                diary: [action.payload, ...state.diary]
            }
        case 'DELETE_DIARY':
            return {
                diary: state.diary.filter((d) => d._id !== action.payload._id )
            }
        default: 
            return state
    }
}

export const DiaryContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(diaryReducer, {
    diary: null
  })


    return(
        <DiaryContext.Provider value={{...state, dispatch }}>
            { children }
        </DiaryContext.Provider>
    )
}