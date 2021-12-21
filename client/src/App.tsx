import React from 'react';
import './App.css';

type Props = {};
type State = {};

class App extends React.Component<Props, State> {
    constructor(props: Props){
        super(props);
    }
    
    render(){
        return (
            <div>
                <h1>Restaurants List</h1>
            </div>
        )
    }
}

export default App;
