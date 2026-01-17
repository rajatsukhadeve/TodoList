import { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';

const label = { slotProps: { input: { 'aria-label': 'Checkbox demo' } } };

export default function Home() {
    let [todos, setTodo] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/get",)
            .then(result => setTodo([...result.data]))
            .catch(err => console.log(err));
    }, []);

    let handleDelete = async (id) => {
        console.log(id);
        const prevtodos = todos;
        setTodo((prevTodos) => {
            return prevTodos.filter(todo => todo._id != id);
        })

        try {
            await axios.delete(`http://localhost:8080/delete/${id}`);
        } catch (err) {
            console.log(err);
            setTodo(prevtodos);
        }


    }

    let addTodo = (newTodo) => {
        setTodo((prevTodos) => [...prevTodos, newTodo]);
    }

    let handleDone = async (event, id) => {
        console.log(event.target.checked);
        let isDone = event.target.checked;

        setTodo((prevTodos) => (
            prevTodos.map(todo => todo._id === id ? { ...todo,isDone: isDone } : todo)
        ))
        console.log(todos);

        try{
            let res = await axios.patch(`http://localhost:8080/done/${id}`,{isDone});
        }catch(err){
            console.log(err);
        }


    }
    // { textDecoration: todo.isDone ? "line-through" : "" }

    return (
        <div className="home">
            <h2>Todo List</h2>
            <Create newTodo={addTodo} />
            {
                todos.map((todo) => (
                    <div className="task" key={todo._id} >
                        <Checkbox {...label} sx={{ color: "white" }} checked={todo.isDone?true:false} onChange={(e) => handleDone(e,todo._id)} size="small" />
                        <div style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{todo.task}</div>

                        <IconButton aria-label="delete" sx={{ color: "white" }} onClick={() => handleDelete(todo._id)} size="small">
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </div>
                ))
            }
        </div>
    )
}