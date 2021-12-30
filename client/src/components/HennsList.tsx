import { useEffect, useState } from "react";
import HennItem from './HennItem';
import HennForm from "./HennForm";
import { hennsService } from '../services/henns.service';

const HennsLoader = (): JSX.Element => {

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
        let newHennsList: Henn[] = [...henns, henn];
        setHenns(newHennsList);
    }

    // Use useEffect to load datas on component display
    useEffect(() => {
        loadHennsData();
    }, [])

    const HennListStyle = {
        width: '100%',
        backgroundColor: '#FAFAFA'
    }

    return (
        <section>
            <div style={{float:'left', width: '100%'}}>
                <HennForm addHennCb={addHennHandler} />
            </div>
            <div style={HennListStyle}>
                {  
                    ( loadingState === 'LOADING' && henns.length === 0) && 
                        <article>Loading ...</article>
                }
                {
                    ( loadingState === 'RESOLVED' && henns.length > 0 ) && 
                        henns
                        .sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
                        .map((henn) => {
                            return <HennItem {...henn} key={henn._id} />
                        })
                }
                {
                    loadingState === 'REJECTED' && 
                        <article>Error loading henns<br/><button onClick={() => loadHennsData()}>Retry</button></article>
                }
            </div>
        </section>
    )
}

export default HennsLoader;