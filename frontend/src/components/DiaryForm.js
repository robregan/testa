import {useState} from "react"
import { useDiaryContext } from "../hooks/useDiaryContext"

const DiaryForm = () => {

    const {dispatch} = useDiaryContext()

    const [item, setItem] = useState('')
    const [calories, setCalories] = useState('')
    const [serving, setServing] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const diary= {item, calories, serving}
        
        const response = await fetch('http://localhost:5000/api/diary', {
            method: 'POST', 
            body: JSON.stringify(diary), 
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
        }
        if(response.ok){
            setError(null)
            setItem('')
            setCalories('')
            setServing('')
            console.log("New Food Added", json)
            dispatch({type: 'CREATE_DIARY', payload: json})
        }
    }

    return (
        <form className="flex flex-col ml-6 mt-10 max-w-md w-52"   onSubmit={handleSubmit}>
        <h3 className="text-2xl font-bold">Add Food To Diary</h3>

        <label className="mt-2">Item:</label> 
        <input 
            type='text'
            onChange= {(e) => setItem(e.target.value)}
            value={item}
            className="outline-red-900 ring-1 ring-blue-500"
        />
        <label className="mt-2">Calories:</label> 
        <input 
            type='text'
            onChange= {(e) => setCalories(e.target.value)}
            value={calories}
            className="outline-red-900 ring-1 ring-blue-500"
        />
        <label className="mt-2">Serving:</label> 
        <input 
            type='text'
            onChange= {(e) => setServing(e.target.value)}
            value={serving}
            className="outline-red-900 ring-1 ring-blue-500"
        />
        <button className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-32 m-auto mb-4">Add Food</button>
        {error && <div>{error}</div>}
        </form>
    )
}

export default DiaryForm