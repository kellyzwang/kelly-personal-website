import React, { useState, useEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { getDatabase, ref, push as firebasePush, set as firebaseSet, onValue } from 'firebase/database';



export function ToDo() {

    const [ToDoData, setToDoData] = useState([{}]);


    const [firebaseToDoData, setFirebaseToDoData] = useState([{}]);

    useEffect(() => {
        // what to do FIRST TIME the component loads
        // hook up listener for when a value changes
        const db = getDatabase();
        const allAddedToDoDataRef = ref(db, "allAddedToDoData"); // refers to "allAddedToDoData" in the database

        // onValue() returns how to turn it back off
        //returns a function that will "unregister" (turn off) the listener
        const unregisterFunction = onValue(allAddedToDoDataRef, (snapshot) => {
            const newVal = snapshot.val();
            setFirebaseToDoData(newVal); // keep a copy of firebase allAddedQuoteData

            // need to convert obj into array in order to setLabelArray() and setChartData()
            if (newVal !== null) {
                const keys = Object.keys(newVal);
                const newObjArray = keys.map((keyString) => {
                    return newVal[keyString];
                })
                setToDoData(newObjArray);
            }
        })

        //cleanup function for when component is removed
        function cleanup() {
            unregisterFunction(); //call the unregister function
        }
        return cleanup; //effect hook callback returns the cleanup function
    }, [])



    const handleCompleteButton = (event) => {
        event.preventDefault();
        const indexOfTheTask = event.target.value;
        const newTodoData = [...ToDoData];
        newTodoData[indexOfTheTask].isDone = true;
        setToDoData(newTodoData);
    }

    const handleRemoveButton = (event) => {
        event.preventDefault();
        const indexOfTheTask = event.target.value;
        const db = getDatabase();

        if (firebaseToDoData !== null) {
            const firebaseToDoDataNew = []
            for (const [key, value] of Object.entries(firebaseToDoData)) {
                let obj = { uniqueKey: key };
                for (const [k, v] of Object.entries(value)) {
                    if (k == "isDone") {
                        obj.isDone = v;
                    } else if (k == "text") {
                        obj.text = v;
                    }
                }
                firebaseToDoDataNew.push(obj);
            }
            const delUniqueKey = firebaseToDoDataNew[indexOfTheTask].uniqueKey;
            const delRefString = "allAddedToDoData/" + delUniqueKey;
            const delRef = ref(db, delRefString);
            firebaseSet(delRef, null);
        }

        const newTodoData = [...ToDoData];
        newTodoData.splice(indexOfTheTask, 1);
        setToDoData(newTodoData);
    }

    let DisplayedTodos = <div></div>
    if (ToDoData.length !== 0) {
         DisplayedTodos = ToDoData.map((todo, index) => (
            <Card key={index}>
                <Card.Body key={index}>
                    <div className="flex-to-do">
                        <div key={index} style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{todo.text}</div>
                        <div>
                            <Button variant="outline-success" value={index} onClick={handleCompleteButton}>Complete</Button>{' '}
                            <Button variant="outline-danger" value={index} onClick={handleRemoveButton}>Remove</Button>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        ))
    } 

    return (
        <div>
            <section className="padding-top-bottom">
                <div className="flex-container-to-do">
                    <div className="flex-item-card-to-do">
                        <h1>To Do List</h1>
                        <FormTodo />
                        <div>
                            {DisplayedTodos}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}


function FormTodo(props) {

    const [toDoTaskEntered, setToDoTaskEntered] = useState("");

    const handleAddNewTaskInput = (event) => {
        const enteredValue = event.target.value;
        setToDoTaskEntered(enteredValue);
    }

    const [status, setStatus] = useState(undefined);

    const handleNewTaskSubmit = (event) => {
        event.preventDefault();
        const db = getDatabase();
        const newToDoData = {
            text: toDoTaskEntered,
            isDone: false
        }
        const allAddedToDoData = ref(db, "allAddedToDoData");
        firebasePush(allAddedToDoData, newToDoData)
            .then(() => {
                setStatus({ type: 'success' });
            })
            .catch((error) => {
                setStatus({ type: 'error', error });
            });

        // set input data back to "" so it clears after submit
        setToDoTaskEntered("");
    };

    return (
        <Form>
            <Form.Group>
                <Form.Label>Add To-do:</Form.Label>
                <Form.Control type="text" className="input"
                    value={toDoTaskEntered} onChange={handleAddNewTaskInput}
                    placeholder="Add a new task!" />
            </Form.Group>
            <div className="submit-button">
                <Button variant="outline-secondary mb-3"
                    onClick={handleNewTaskSubmit}
                    type="submit">
                    Add New Task
                </Button>
            </div>
            <div className='center-flex'>
                {status?.type === 'success' && <p className="success-message">You have successfully added a new quote!</p>}
                {status?.type === 'error' && (<p>Oh no! There is an error.</p>)}
            </div>
        </Form>
    );
}