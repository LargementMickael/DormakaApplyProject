const RestaurantsList = ({ restaurants }: RestaurantState) => {
    return (
        <div>
            {
                restaurants.map((item: Restaurant, index: number) => {
                    return <p key={index}>{item.name}</p>
                })
            }
        </div>
    )
}

export default RestaurantsList;