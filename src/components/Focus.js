import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import TimePicker from 'react-time-picker';

import { getDatabase, ref, onValue } from 'firebase/database';

import { NavBar } from './NavBar.js';


export function Focus(props) {

    const [dateSelected, setDateSelected] = useState(new Date());
    const [startTime, setStartTime] = useState('10:00');
    const [endTime, setEndTime] = useState('');

    //when day is clicked   
    const handleDateSelect = (event) => {
        event.preventDefault();


    }

    const handleDateChange = (event) => {
        const enteredValue = event.target.value;
        setDateSelected(enteredValue);
    }

    const handleStartTimeChange = (event) => {
        const enteredValue = event.target.value;
        setStartTime(enteredValue);
    }
    const handleEndTimeChange = (event) => {
        const enteredValue = event.target.value;
        setEndTime(enteredValue);
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
                            <Label for="StartTime">Start Time:</Label>
                            <br></br>
                            <TimePicker
                                onChange={handleStartTimeChange}
                                value={startTime} />{'  '}
                        </FormGroup>

                        <FormGroup>
                            <Label for="EndTime">End Time:</Label>
                            <br></br>
                            <TimePicker
                                onChange={handleEndTimeChange}
                                value={endTime} />
                        </FormGroup>
                    </div>
                </div>
            </section>
        </div>
    )
}