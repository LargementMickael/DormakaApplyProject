import { Store } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux"
import * as actionsTypes from '../constants/actionTypes'

const LoadRestaurantsList = () => {

    const dispatch = useDispatch();

    const fetchOrUpdateDatas = async (): Promise<any> => {
        fetch('http://127.0.0.1:5000/restaurants')
        .then((res) => {
            console.log('> res');
            console.log(res);
        })
        
    }

    return <button onClick={() => fetchOrUpdateDatas()}>Load Restaurants</button>
}

export default LoadRestaurantsList;