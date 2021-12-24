import React from 'react';
import './App.css';

import HennsLoader from './components/HennsLoader';

class App extends React.Component<{},{}> {
    render(){
        return (
            <section>
                <h1>Chicken Coop</h1>
                <HennsLoader />
            </section>
        )
    }
}

export default App;
