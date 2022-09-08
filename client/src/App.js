import { useState, useEffect } from 'react';
import Select from 'react-select';
const API_BASE = "http://localhost:3001";
function App() {
    const [list, setList] = useState([]);
    const [popUpActive, setPopUpActive] = useState(false);//popup for add button
    const [newHeading, setNewHeading] = useState("");
    const [newText, setNewText] = useState("");
    const [newPriority, setNewPriority] = useState("");

    useEffect(() => {
        GetData();
    }, []);//Empty Array because so only calls when component loads

    const GetData = async () => {
        fetch(API_BASE + "/todo")
            .then(res => res.json())
            .then(data => setList(data.todo))
            .catch(err => console.error("Error : ", err));

    };

    const taskPriorities = [
        { label: "All", value: 1 },
        { label: "High", value: 2 },
        { label: "Medium", value: 3 },
        { label: "Low", value: 4 },
    ];
    function handleChange(event) {
        //console.log(event.value);
        GetPriortityData(event.value)
    }
    const GetPriortityData = async Priority => {
        console.log(Priority + " jello");
        if (Priority === 1) {
            GetData();
        }
        else {
            if (Priority === 2) {
                Priority = "High";
            } else if (Priority === 2) {
                Priority = "Medium";
            }
            else {
                Priority = "Low";
            }
            fetch(API_BASE + "/todo/getPriority/" + Priority)
                .then(res => res.json())
                .then(data => setList(data.todo))
                .catch(err => console.error("Error : ", err));
        }

    };

    const completeTodo = async id => {
        const data = await fetch(API_BASE + '/todo/complete/' + id)
            .then(res => res.json());
        //if you miss await or async it wouldn't automatically show 
        setList(list => list.map(todo => {
            if (todo._id === data.todo._id) {
                todo.completeFlag = data.todo.completeFlag;
            }
            return todo;
        }));

    }
    const deleteTodo = async (id) => {
        const data = await fetch(API_BASE + '/todo/delete/' + id, { method: "DELETE" })
            .then(res => res.json());

        setList(list => list.filter(todo => todo._id !== data.todo._id));

    }
    const addTodo = async () => {
        if (newHeading, newText, newPriority) {
            const data = await fetch(API_BASE + '/todo/new',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        heading: newHeading,
                        text: newText,
                        priority: newPriority,
                    })

                }).then(res => res.json());

            setList([...list, data.todo]);

        }
        setPopUpActive(false);

        setNewHeading("");
        setNewText("");
        setNewPriority("");

    }
    return (<div className="App">

        <div className="list">
            <h1>Ayaz's Tasks</h1>
            <Select className='drop-down' options={taskPriorities} onChange={handleChange} />
            {
                list.map(todo => (

                    <div className={"todo" + (todo.completeFlag ? " is-complete" : "")} key={todo._id}
                        onClick={() => completeTodo(todo._id)}>
                        <div className="text-heading">{todo.heading}</div>
                        <div className="text-body">{todo.text}</div>
                        <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>X</div>
                    </div>
                ))
            }

            <div className="addPopup" onClick={() => setPopUpActive(true)}>+</div>
            {popUpActive ? (
                <div className="popup">
                    <button type="button" className="closePopup" onClick={() => setPopUpActive(false)}>X</button>
                    <div className="content">
                        <input type="text"
                            placeholder='Enter Task Heading'
                            className='add-todo-input'
                            onChange={e => setNewHeading(e.target.value)}
                            value={newHeading} />
                        <input type="text"
                            className='add-todo-input'
                            placeholder='Enter Task Details'
                            onChange={e => setNewText(e.target.value)}
                            value={newText} />
                        <input type="text"
                            className='add-todo-input'
                            placeholder='Enter Task Priortity'
                            onChange={e => setNewPriority(e.target.value)}
                            value={newPriority} />

                        <button className="button" onClick={addTodo}>Add</button>

                    </div>
                </div>
            ) : ''}
        </div>



    </div >
    );
}


export default App;