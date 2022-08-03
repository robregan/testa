import { DiaryContext } from "../context/DiaryContext";
import { useContext } from "react";


export const useDiaryContext = () => {
    const context = useContext(DiaryContext)
    
    if(!context) {
        throw Error('useDiaryContext must be used inside a DiaryContextProvider')
    }

    return context
}
