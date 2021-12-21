import React from 'react'
import { connect } from "react-redux"

interface State {}

class RestaurantItem extends React.Component<Restaurant,State>{    
    constructor(props: Restaurant){
        super(props);
    }

    render(){
        return (
            <div className="RestaurantItem">
                <h1>{this.props.name}</h1>
                <h3>{this.props.address.building}</h3>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
  return {
    restaurants: []
  };
};
const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantItem);