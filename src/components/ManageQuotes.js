import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { getDatabase, ref, set as firebaseSet, onValue } from 'firebase/database';


export function ManageQuotes() {


    const [quoteData, setQuoteData] = useState([]);

    // firebase AllBMIData state variable
    const [firebaseQuoteData, setFirebaseQuoteData] = useState([]);

    useEffect(() => {
        // what to do FIRST TIME the component loads

        // hook up listener for when a value changes
        const db = getDatabase();
        const allAddedQuoteDataRef = ref(db, "allAddedQuoteData"); // refers to "allAddedQuoteData" in the database

        // onValue() returns how to turn it back off
        //returns a function that will "unregister" (turn off) the listener
        const unregisterFunction = onValue(allAddedQuoteDataRef, (snapshot) => {
            const newVal = snapshot.val();
            setFirebaseQuoteData(newVal); // keep a copy of firebase allAddedQuoteData


            // need to convert obj into array in order to setLabelArray() and setChartData()
            if (newVal !== null) {
                const keys = Object.keys(newVal);
                const newObjArray = keys.map((keyString) => {
                    return newVal[keyString];
                })
                setQuoteData(newObjArray);
            } else {
                setQuoteData([]);
            }
        })

        //cleanup function for when component is removed
        function cleanup() {
            unregisterFunction(); //call the unregister function
        }
        return cleanup; //effect hook callback returns the cleanup function
    }, [])

    // convert data into rows
    const rows = quoteData.map((quote_item, index) => {
        return <QuoteDataRow key={index} quote_item={quote_item} 
                            firebaseQuoteData={firebaseQuoteData}/>
        });
    

    return (
        <div>
            <section className="padding-top-bottom">
                <h1>All Added Quotes</h1>
                <div className="flex-container-drama">
                    <div className="flex-item-card-drama">
                    <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>Quote</th>
                        <th>Drama Name</th>
                        <th>Character</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
                    </div>
                </div>
            </section>

            <footer>
                <p>&copy; KELLY WANG 2022</p>
            </footer>
        </div>
    );
}


function QuoteDataRow({quote_item, firebaseQuoteData}) { 

     const handleRemoveButton = (event) => {
        event.preventDefault();
        const buttonValueOftheRow = event.target.value;

        const db = getDatabase();

        if (firebaseQuoteData !== null) {
            const firebaseQuoteDataNew = []
            for (const [key, value] of Object.entries(firebaseQuoteData)) {
                let obj = { uniqueKey: key };
                for (const [k, v] of Object.entries(value)) {
                    if (k == "Quote") {
                        obj.Quote = v;
                    } else if (k == "DramaName") {
                        obj.DramaName = v;
                    } else if (k == "Character") {
                        obj.Character = v;
                    }
                }
                firebaseQuoteDataNew.push(obj);
            }

        for (let i = 0; i < firebaseQuoteDataNew.length; i++) {
            if (buttonValueOftheRow === firebaseQuoteDataNew[i].Quote + firebaseQuoteDataNew[i].DramaName + firebaseQuoteDataNew[i].Character) {
                const delUniqueKey = firebaseQuoteDataNew[i].uniqueKey;
                const delRefString = "allAddedQuoteData/" + delUniqueKey;
                const delRef = ref(db, delRefString);
                firebaseSet(delRef, null);
            }
        }
    }
    }
    
    const buttonValue = quote_item.Quote + quote_item.DramaName + quote_item.Character;

    return (
        <tr>
            <td>{quote_item.Quote}</td>
            <td>{quote_item.DramaName}</td>
            <td>{quote_item.Character}</td>
            <td>
                
                <Button outline color="danger" value={buttonValue} onClick={handleRemoveButton}>Remove</Button>
            </td>
        </tr>
    );
}
