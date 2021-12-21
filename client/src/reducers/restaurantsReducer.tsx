import * as actionTypes from '../constants/actionTypes'

const initState: RestaurantState = {
    status: 'FETCHING',
    restaurants: []
}

const restaurantsReducer = (state: RestaurantState = initState, action: any): any  => {
    switch(action.type){
        case actionTypes.LOAD :
            return {
                ...state,
                isLoaded: true,
                restaurants: [
                    {
                        restaurant_id: 1,
                        name: "Restaurant TEST Loaded",
                        address: {
                            building: "A Building"
                        }
                    }
                ]
            }
        break;
        default:
            return state;
    }
};

export default restaurantsReducer;