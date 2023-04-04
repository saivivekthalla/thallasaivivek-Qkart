import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";
import Products from "./Products";

const ProductCard = ({ product, handleAddToCart }) => {

  // console.log(product)
  return (

    <Card className="card">
      <CardMedia className="card-img" component="img" image={product.image} />
      <CardContent >
        <Typography variant="h5">
          {product.name}
        </Typography>
        <Typography color="textSecondary" variant="subtitle2">
          ${product.cost}
        </Typography>
        <Rating name="read-only" value={product.rating} readOnly />
      </CardContent>
      <CardActions>

        <Button className="card-button" variant="contained" onClick={() => handleAddToCart()}> <AddShoppingCartOutlined />ADD TO CART</Button>

      </CardActions>
    </Card>


  );
};

export default ProductCard;
