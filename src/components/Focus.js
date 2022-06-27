import React, { useState, useEffect } from 'react';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import DateTimePicker from 'react-datetime-picker';
import TimePicker from 'react-time-picker';

import { getDatabase, ref, set as firebaseSet, onValue, push as firebasePush } from 'firebase/database';

import { NavBar } from './NavBar.js';


export function Focus(props) {

    const [dateSelected, setDateSelected] = useState(new Date());
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [workLength, setWorkLength] = useState('');
    const [taskName, setTaskName] = useState('');

    //when day is clicked   
    const handleDateSelect = (event) => {
        event.preventDefault();
        const enteredValue = event.target.value;
        setDateSelected(enteredValue);
    }

    const handleDateChange = (event) => {
        const enteredValue = event.target.value;
        setDateSelected(enteredValue);
    }

    const handleTaskNameChange = (event) => {
        const enteredValue = event.target.value;
        setTaskName(enteredValue);
    }

    // Calculate time difference
    const calculateWorkLength = function (start, end) {
        const startArr = start.split(':')
        const endArr = end.split(':')
        const minsdiff=parseInt(endArr[0],10)*60+parseInt(endArr[1],10)-parseInt(startArr[0],10)*60-parseInt(startArr[1],10);
        const calculatedWorkLength = String(100+Math.floor(minsdiff/60)).substr(1)+':'+String(100+minsdiff%60).substr(1);
        return calculatedWorkLength;
    }

    const handleEnterButtonClick = (event) => {
        event.preventDefault();
        const timeDiff = calculateWorkLength(startTime, endTime);
        setWorkLength(timeDiff);

        const db = getDatabase();
        const newData = {
            date: dateSelected,
            taskName: taskName,
            workLength: timeDiff,
        }
        const allworkLengthData = ref(db, "allworkLengthData");
        firebasePush(allworkLengthData, newData);

        // set input data back to "" so it clears after submit
        setStartTime("");
        setEndTime("");
        setTaskName("");
        setDateSelected(new Date());
    }




    const [dateSelectedToView, setDateSelectedToView] = useState(new Date());

    const handleDateSelectToView = (event) => {
        event.preventDefault();
        const enteredValue = event.target.value;
        setDateSelectedToView(enteredValue);
    }

    const handleDateChangeToView = (event) => {
        const enteredValue = event.target.value;
        setDateSelectedToView(enteredValue);
    }


    

    return (
        <div>
            <section className="padding-top-bottom">
                <h1>Current Task</h1>
                <div className="flex-container-focus">
                    <div className="flex-item-card-focus">
                        <FormGroup>
                            <Label for="Today">Today's date:</Label>
                            <DatePicker
                                selected={dateSelected}
                                onSelect={handleDateSelect} //when day is clicked
                                onChange={handleDateChange} //only when value has changed
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="dramaName">Task name:</Label>
                            <Input value={taskName} onChange={handleTaskNameChange} />
                            <FormFeedback>You will not be able to see this</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label for="StartTime">Start Time:</Label>
                            <br></br>
                            <TimePicker
                                onChange={setStartTime}
                                value={startTime} />{'  '}
                        </FormGroup>

                        <FormGroup>
                            <Label for="EndTime">End Time:</Label>
                            <br></br>
                            <TimePicker
                                onChange={setEndTime}
                                value={endTime} />
                        </FormGroup>
                        <Button outline color="secondary"
                                onClick={handleEnterButtonClick}>
                            Submit
                        </Button>
                    </div>
                </div>
            </section>


            <section className="padding-top-bottom">
                <h1>View My Tasks</h1>
                <div className="flex-container-focus">
                    <div className="flex-item-card-focus">
                        <FormGroup>
                            <Label for="Today">Select a date:</Label>
                            <DatePicker
                                selected={dateSelectedToView}
                                onSelect={handleDateSelectToView} //when day is clicked
                                onChange={handleDateChangeToView} //only when value has changed
                            />
                        </FormGroup>
                    </div>
                </div>
            </section>
        </div>
    )
}