import React from 'react';
import './App.css';

import HennsList from './components/HennsList';

class App extends React.Component<{},{}> {
    render(){
        return (
            <section>
                <h1>Chicken Coop</h1>
                <HennsList />
            </section>
        )
    }
}

export default App;
