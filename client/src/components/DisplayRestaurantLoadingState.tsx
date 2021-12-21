import { useSelector } from 'react-redux'

const DisplayRestaurantLoadingState = () => {

    const restaurantsFetchingStatus = useSelector((state: RestaurantState) => state.status === 'RESOLVED')

    return <p>Restaurants are loaded : {restaurantsFetchingStatus ? 'Yes' : 'No'}</p>
}

export default DisplayRestaurantLoadingState;