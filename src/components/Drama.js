import React, { useState } from 'react';
import { Button, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { getDatabase, ref, push as firebasePush } from 'firebase/database';
import { NavLink } from 'react-router-dom';


export function Drama(props) {

    // state variable to track quote entered
    const [quoteEntered, setQuoteEntered] = useState("");
    const [dramaNameEntered, setDramaNameEntered] = useState("");
    const [characterEntered, setCharacterEntered] = useState("");


    const handleQuoteChange = (event) => {
        const enteredValue = event.target.value;
        setQuoteEntered(enteredValue);
    }
    const handleDramaNameChange = (event) => {
        const enteredValue = event.target.value;
        setDramaNameEntered(enteredValue);
    }
    const handleCharacterChange = (event) => {
        const enteredValue = event.target.value;
        setCharacterEntered(enteredValue);
    }

    const [status, setStatus] = useState(undefined);

    const handleAddQuoteSubmit = (event) => {
        event.preventDefault();

        const db = getDatabase();
        const newQuoteData = {
            Quote: quoteEntered,
            DramaName: dramaNameEntered,
            Character: characterEntered
        }
        const allAddedQuoteData = ref(db, "allAddedQuoteData");
        firebasePush(allAddedQuoteData, newQuoteData)
            .then(() => {
                setStatus({ type: 'success' });
            })
            .catch((error) => {
                setStatus({ type: 'error', error });
            });

        // set input data back to "" so it clears after submit
        setQuoteEntered("");
        setDramaNameEntered("");
        setCharacterEntered("");
    }





    const [displayedQuote, setDisplayedQuote] = useState("Click the 'New Quote' button below to see quote of the day! :)");

    const handleNewQuoteSubmit = (event) => {
        event.preventDefault();

        if (props.quoteData === null || props.quoteData === []) {
            setDisplayedQuote("Oh no! There's no quotes in the database, try adding a new quote you like! :)");
        }
        const randomInt = Math.floor(Math.random() * props.quoteData.length);
        const randomQuote = "\"" + props.quoteData[randomInt].Quote + "\" -- " + props.quoteData[randomInt].Character + ", " + props.quoteData[randomInt].DramaName;
        setDisplayedQuote(randomQuote);
    }


    return (
        <div>
            <section className="padding-top-bottom">
                <h1>Quote of the Day</h1>
                <div className="flex-container-drama">
                    <div className="flex-item-card-drama">
                        <p>{displayedQuote}</p>
                        <FormGroup>
                            <div className='center-flex'>
                                <Button
                                    outline color="secondary"
                                    onClick={handleNewQuoteSubmit}>
                                    New Quote
                                </Button>
                            </div>
                        </FormGroup>
                    </div>
                </div>
            </section>

            <section className="padding-top-bottom">
                <h1>Add New Quotes</h1>
                <div className="flex-container-drama">
                    <div className="flex-item-card-drama">

                        <FormGroup>
                            <Label for="addQuote">Type in a quote you like:</Label>
                            <Input type="textarea" name="text" id="addQuote"
                                value={quoteEntered} onChange={handleQuoteChange} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="dramaName">Drama name:</Label>
                            <Input value={dramaNameEntered} onChange={handleDramaNameChange} />
                            <FormFeedback>You will not be able to see this</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label for="dramaCharacter">Drama character (Who said the quote?):</Label>
                            <Input value={characterEntered} onChange={handleCharacterChange} />
                            <FormFeedback>You will not be able to see this</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <div className='center-flex'>
                                <Button
                                    outline color="secondary"
                                    onClick={handleAddQuoteSubmit}>
                                    Add Quote
                                </Button>
                            </div>
                        </FormGroup>
                        <div className='center-flex'>
                            {status?.type === 'success' && <p className="success-message">You have successfully added a new quote!</p>}
                            {status?.type === 'error' && (<p>Oh no! There is an error.</p>)}
                        </div>
                    </div>
                </div>
            </section>


            <section className="padding-top-bottom">
                <h1>Manage Added Quotes</h1>
                <div className="flex-container-drama">
                    <div className="flex-item-card-drama">


                        <div className="center-flex">
                            <NavLink to="/manage-quotes">
                                <Button
                                    outline color="secondary">
                                    View Your Added Quotes or Remove Quotes Here
                                </Button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </section>

            <footer>
                <p>&copy; KELLY WANG 2022</p>
            </footer>
        </div>
    );
}