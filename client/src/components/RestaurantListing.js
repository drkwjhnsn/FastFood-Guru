import React from 'react';

export default (props) => {
  var { name, address, id } = props;
  function selectThisRestaurant() {
    props.selectRestaurant({ name, address, id });
  }
  return (
    <div className="listing" onClick={selectThisRestaurant}>
      <h6>{name}</h6>
      <p>{address}</p>
    </div>
  );
}
