import { useSelector } from "react-redux";
import { Store } from "redux";
import RestaurantsList from './RestaurantsList'

const RestaurantsListProvider = () => {

    const restaurantsState = useSelector((state: RestaurantState): RestaurantState => state)
        
    return (    
        <RestaurantsList {...restaurantsState} />
    )
}

export default RestaurantsListProvider;