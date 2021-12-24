import { useEffect, useState } from "react";
import HennItem from './HennItem';
import HennForm from "./HennForm";
import { hennsService } from '../services/henns.service';

const HennsList = (): JSX.Element => {

    // Use loading status to display datas availability
    const [henns, setHenns] = useState<Henn[] | []>([]);
    const [loadingState, setLoadingState] = useState<string>('LOADING');
    
    /**
     * Load henns from GET /henns 
     * Adding setTimeout to seeing the 'loading' status
     * Fill henns<Henns> State, and update loading status 
     * 
    */ 
    const loadHennsData = () => {
        hennsService.loadHenns()
        .then((res) => {
            window.setTimeout(() => {
                setHenns(res);
                setLoadingState('RESOLVED');
            },500)
        })
        .catch(() => {
            setLoadingState('REJECTED');
        });
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
            <div style={HennListStyle}>
                {  
                    (loadingState === 'LOADING' && henns.length === 0) && 
                        <article>Loading ...</article>
                }
                {
                    ( loadingState === 'RESOLVED' && henns.length > 0 ) && 
                        henns.map((henn, index) => {
                            return <HennItem {...henn} key={index} cbFn={() => loadHennsData()} />
                        })
                }
                {
                    loadingState === 'REJECTED' && 
                        <article>Error loading henns<br/><button onClick={() => loadHennsData()}>Retry</button></article>
                }
            </div>
            <div style={{float:'left', width: '100%'}}>
                <HennForm cbFn={() => loadHennsData()} />
            </div>
            
        </section>
    )
}

export default HennsList;