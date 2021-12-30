import HennItem from './HennItem';

interface Props {
    henns: Henn[]
}

const HennsList = (props: Props): JSX.Element => {

    const HennListStyle = {
        width: '100%',
        backgroundColor: '#FAFAFA'
    }

    return (
        <div style={HennListStyle}>
            { 
                props.henns.length > 0 ? (
                    props.henns
                    .sort((a: Henn,b: Henn) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
                    .map((henn: Henn) => {
                        console.log("Rendering : :");
                        console.log(henn);
                        return <HennItem {...henn} key={henn._id} />
                    })
                ) : (
                    <span className="row center">No henns</span>
                )
            }
        </div>
    )
}

export default HennsList;