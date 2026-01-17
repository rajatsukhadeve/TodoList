
import { useState } from "react";
import axios from 'axios';

export default function Create({newTodo}){

    let [task,setTask] = useState("");

    let handleInput =(event)=>{
        // console.log(event.target);
        setTask(event.target.value);
    }

    let handleSubmit =async()=>{
        try{
            let res = await axios.post("http://localhost:8080/add",{task:task});
            console.log(res.data);
            newTodo(res.data);
        }catch(err){
            console.log(err);
        }

        setTask("");
        
    }

    return (
        <div className="create_form">
            <input placeholder="Enter Task" value={task} onChange={handleInput}></input>
            <button onClick={handleSubmit}>Add</button>
        </div>
    )
};