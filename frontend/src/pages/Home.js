import { useEffect } from "react"
import { useDiaryContext } from "../hooks/useDiaryContext"


import DiaryDetails from "../components/DiaryDetails"
import DiaryForm from "../components/DiaryForm"


const Home = () => {
    const {diary, dispatch} = useDiaryContext()

    useEffect(() => {
        const fetchDiary = async () => {
            const response = await fetch('http://localhost:5000/api/diary') 
            const json = await response.json()


            if(response.ok) {
                dispatch({type: 'SET_DIARY', payload: json})
            }

        }
        
        fetchDiary()
    }, [dispatch])

    return(
        <div className="home flex flex-col md:flex-row justify-center gap-10 ">
            <div className="md:grid md:grid-rows-2 grid-flow-col gap-4 auto-rows-max">
                {diary && diary.map((diary) => (
                    <DiaryDetails key={diary._id} diary={diary}/>
                ))}
            </div>
            <section className="m-auto md:m-0">
            <DiaryForm />
            </section>
     
        </div>
    )
}

export default Home 
