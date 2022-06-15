import { React, useState } from 'react';
import { getDatabase, ref, push as firebasePush } from 'firebase/database';


export function Drama() {

    // state variable to track quote entered
    const [quoteEntered, setQuoteEntered] = useState(null);


    const handleQuoteChange = (event) => {
        const enteredValue = event.target.value;
        setQuoteEntered(enteredValue);
    }
    const handleAddQuoteSubmit = (event) => {
        event.preventDefault();
    }


    return (
        <div>
            <section>
                <h1>Add Quotes</h1>
                <div class="flex-container-drama">
                    <div class="flex-item-card-drama">
                        Type in a good quote:

                        <form onSubmit={handleAddQuoteSubmit}>
                            <label>
                                Essay:
                                <textarea value={quoteEntered} onChange={handleQuoteChange} />
                            </label>
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                </div>
            </section>
            <section>
                <p></p>
            </section>
            <footer>
                <p>&copy; KELLY WANG 2022</p>
            </footer>
        </div>
    );
}