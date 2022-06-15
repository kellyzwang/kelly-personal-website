import React from 'react';


export function Home() {
    return (
        <div>
            <section>
                <div className="flex-container-home center">
                    <div className="flex-item-card-home">
                        <h1>Welcome to Kelly's Website!</h1>
                        <img src="img/pokemon.png" alt="pokemon"  />
                    </div>
                </div>
            </section>
            <footer>
                <p>&copy; KELLY WANG 2022</p>
            </footer>
        </div>
    );
}