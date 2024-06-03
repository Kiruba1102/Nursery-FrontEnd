import React from "react";
import { Button } from '@mui/material';

const CartItem = ({ item, addToCart, removeFromCart }) => {
  const handleAddToCart = () => {
    // Increase quantity by 1
    addToCart({ ...item, quantity: item.quantity + 1 });
  };

  const handleRemoveFromCart = () => {
    // Decrease quantity by 1, but ensure it doesn't go below 1
    const newQuantity = Math.max(1, item.quantity - 1);
    removeFromCart(item.productId, newQuantity);
  };

  return (
    <div style={{ /* Add your styles inline here */ }}>
      <div>
        <h3>{item.species}</h3>
        <div className="information">
          <p>Price: ${item.price}</p>
          <p>Total: ${(item.quantity * item.price).toFixed(2)}</p>
        </div>
        <div className="buttons">
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={handleRemoveFromCart}
          >
            -
          </Button>
          <p>{item.quantity}</p>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={handleAddToCart}
          >
            +
          </Button>
        </div>
      </div>
      <img src={`data:image/jpeg;base64,${item.image}`} alt={item.species} />
    </div>
  );
};

export default CartItem;
