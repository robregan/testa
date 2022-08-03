import { useDiaryContext } from "../hooks/useDiaryContext"

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const DiaryDetails = ({diary}) => {

    const {dispatch} = useDiaryContext()

    const handleClick = async () => {
        const response = await fetch('http://localhost:5000/api/diary/' + diary._id, {
            method: 'DELETE', 
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_DIARY', payload: json})
        }
    }


    return (
        <div className="flex flex-col m-auto md:ml-6 mt-6 shadow-lg shadow-slate-500/20 rounded-xl relative w-60" >
            <h1 className="text-3xl font-semibold pt-2 pl-2" key={diary._id}> {diary.item}</h1>
            <h3 className="italic  pt-2 pl-2"> Calories: {diary.calories}</h3>
            <h3 className="text-slate-600 pt-2 pl-2"> Serving: {diary.serving}</h3>
            <h3 className="text-slate-600 pt-2 pl-2"> {formatDistanceToNow(new Date(diary.createdAt), { addSuffix: true })}</h3>
            <span className="material-symbols-outlined cursor cursor-pointer absolute top-2 right-2" onClick={handleClick}>Delete</span>
    </div>
    )
}

export default DiaryDetails
