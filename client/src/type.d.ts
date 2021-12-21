interface Restaurant {
    address: {
        building: string,
    },
    name: string,
    restaurant_id: number
}

type RestaurantState = {
    status: "FETCHING" | "RESOLVED" | "REJECTED",
    restaurants: Restaurant[]
}

type RestaurantAction = {
    type: string
}

type DispatchType = (args: RestaurantAction) => RestaurantAction