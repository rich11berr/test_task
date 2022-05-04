import React from "react";
import "./Item.scss";

const Item = (props) => {
    return <div className="item">
        <div className="item__id">
            {props.data.id}
        </div>
        <div className="item__header">
            {props.data.title}
        </div>
        <div className="item__descr">
            {props.data.body}
        </div>
    </div>;
};

export default Item;
