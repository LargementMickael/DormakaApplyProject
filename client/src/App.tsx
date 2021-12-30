import React, { useEffect, useState } from 'react';

import HennForm from "./components/HennForm";
import HennsList from './components/HennsList';

import { hennsService } from './services/henns.service';

const App = () => {

    // Use loading status to display datas availability
    const [henns, setHenns] = useState<Henn[] | []>([]);
    const [loadingState, setLoadingState] = useState<string>('LOADING');
    
    /**
     * Load henns from GET /henns 
     * Adding setTimeout to seeing the 'loading' status
     * Fill henns<Henns> State, and update loading status 
    */ 
    const loadHennsData = () => {
        hennsService.loadHenns()
        .then((res) => {
            setHenns(res);
            setLoadingState('RESOLVED');
        })
        .catch(() => {
            setLoadingState('REJECTED');
        });
    }

    const addHennHandler = (henn: Henn) => {
        setHenns([...henns, henn]);
    }

    // Use useEffect to load datas on component display
    useEffect(() => {
        loadHennsData();
    }, [])

    return (
        <section>
            <h1>Chicken Coop</h1>
            <HennForm addHennCb={addHennHandler} />
            {loadingState === 'RESOLVED' ? (
                <HennsList henns={henns} />
            ) : (
                <p className="row center">
                    Error while getting henns list <button onClick={() => loadHennsData()}>try again</button>
                </p>
            )}
        </section>
    )
}

export default App;
