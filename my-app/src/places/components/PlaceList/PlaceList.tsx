import React from "react";
import Card from "../../../shared/components/UIElements/Card/Card";
import PlaceItem, { IPlaceItem } from "../PlaceItem/PlaceItem";

import './PlaceList.css'

interface IPlaceList {
    items: IPlaceItem[];
}

const PlaceList = (props:IPlaceList) => {
    if (props.items.length === 0){
        return (
            <div className="place-list center">
                <Card>
                    <h2>No places found. Maybe create one?</h2>
                    <button>Share Place</button>
                </Card>
            </div>
        );
    }

    return (
    <ul className="place-list">
        {props.items.map(place => 
        (<PlaceItem 
            key={place.id} 
            id={place.id} 
            image={place.image} 
            title={place.title} 
            description={place.description} 
            address={place.address} 
            creatorId={place.creatorId} 
            location={place.location}/>))}
    </ul>
    )

}

export default PlaceList;