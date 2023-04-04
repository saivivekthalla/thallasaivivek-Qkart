import {
  AddOutlined,
  RemoveOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Button, IconButton, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import{ addToCart }from "./Products"
import "./Cart.css";

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 * 
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */

/**
 * @typedef {Object} CartItem -  - Data on product added to cart
 * 
 * @property {string} name - The name or title of the product in cart
 * @property {string} qty - The quantity of product added to cart
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} productId - Unique ID for the product
 */

/**
 * Returns the complete data on all products in cartData by searching in productsData
 *
 * @param { Array.<{ productId: String, qty: Number }> } cartData
 *    Array of objects with productId and quantity of products in cart
 * 
 * @param { Array.<Product> } productsData
 *    Array of objects with complete data on all available products
 *
 * @returns { Array.<CartItem> }
 *    Array of objects with complete data on products in cart
 *
 */
export const generateCartItemsFrom = (cartData, productsData) => {
  let list = [];
  productsData.forEach((val) => { cartData.forEach((key) => { if (key.productId === val["_id"]) { list.push({ category: val.category, cost: val.cost, image: val.image, name: val.name, rating: val.rating, _id: key.productId, qty: key.qty, }); } }); });
  return list;

};


/**
 * Get the total value of all products added to the cart
 *
 * @param { Array.<CartItem> } items
 *    Array of objects with complete data on products added to the cart
 *
 * @returns { Number }
 *    Value of all items in the cart
 *
 */
export const getTotalCartValue = (items =[]) => {
  // console.log(items)
  let total = 0
  for(let i=0;i<items.length;i++)
  {
    total = total +( items[i].qty * items[i].cost)
  }
  // console.log(total)
  return total
};
export const getTotalItems = (items =[]) => {
  // console.log(items)
  let total = 0
  for(let i=0;i<items.length;i++)
  {
    total = total +( items[i].qty )
  }
  console.log(total)
  return total
};


/**
 * Component to display the current quantity for a product and + and - buttons to update product quantity on cart
 * 
 * @param {Number} value
 *    Current quantity of product in cart
 * 
 * @param {Function} handleAdd
 *    Handler function which adds 1 more of a product to cart
 * 
 * @param {Function} handleDelete
 *    Handler function which reduces the quantity of a product in cart by 1
 * 
 * 
 */
const ItemQuantity = ({
  value,
  handleAdd,
  handleDelete,
}) => {
  const history = useHistory()
   const [isReadOnly,setisReadOnly]= useState(false)
  return (
    <Stack direction="row" alignItems="center">
      <IconButton size="small" color="primary" onClick={handleDelete}>
        <RemoveOutlined />
      </IconButton>
      <Box padding="0.5rem" data-testid="item-qty">
        {value}
      </Box>
      <IconButton size="small" color="primary" onClick={handleAdd}>
        <AddOutlined />
      </IconButton>
    </Stack>
  );
};


/**
 * Component to display the Cart view
 * 
 * @param { Array.<Product> } products
 *    Array of objects with complete data of all available products
 * 
 * @param { Array.<Product> } items
 *    Array of objects with complete data on products in cart
 * 
 * @param {Function} handleDelete
 *    Current quantity of product in cart
 * 
 * 
 */
const Cart = ({
  isReadOnly,
  products,
  items = [],
  handleQuantity,
}) => {
  // console.log(items)
  const history = useHistory()

  if (!items.length) {
    return (
      <Box className="cart empty" backgroundColor="#ffffff">
        <ShoppingCartOutlined className="empty-cart-icon" />
        <Box color="#aaa" textAlign="center" >
          Cart is empty. Add more items to the cart to checkout.
        </Box>
      </Box>
    );
  }
  // return(<h1>dfghjkl</h1>)
  if(isReadOnly)
  {
    return(<div>
      
          {items.map(item => {

            return (<Box className="cart">
              {/* TODO: CRIO_TASK_MODULE_CART - Display view for each cart item with non-zero quantity */}
              <Box display="flex" alignItems="flex-start" padding="1rem">
                <Box className="image-container">
                  <img
                    // Add product image
                    src={item.image}
                    // Add product name as alt eext
                    alt={item.image}
                    width="100%"
                    height="100%"
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  height="6rem"
                  paddingX="1rem"
                >
                  <div>{item.name}</div>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >

                    {/* value={item.qty} */}
                    <Box padding="0.5rem" fontWeight="700">
                      Qty:{item.qty}
                    </Box>

                    <Box padding="0.5rem" fontWeight="700">
                      ${item.cost}
                    </Box>
                  </Box>
                </Box>
              </Box>



            </Box>);
          })
          }
          <Box
            padding="1rem"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box color="#3C3C3C" alignSelf="center">
              Order total
            </Box>
            <Box
              color="#3C3C3C"
              fontWeight="700"
              fontSize="1.5rem"
              alignSelf="center"
              data-testid="cart-total"
            >
              ${getTotalCartValue(items)}
            </Box>
          </Box>
          <Box className="cart">
              {/* TODO: CRIO_TASK_MODULE_CART - Display view for each cart item with non-zero quantity */}
              <Box display="flex" alignItems="flex-start" padding="1rem">
                
              <Box className="cart empty2" padding="1rem">
          <h1>Order Details</h1>
          <Box display="flex" justifyContent="space-between">
            <p>Products</p>
            <p>{getTotalItems(items)}</p>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <p>Subtotal</p>
            <p>${getTotalCartValue(items)}</p>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <p>Shipping Charges</p>
            <p>$0</p>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <h2>Total</h2>
            <h2>${getTotalCartValue(items)}</h2>
          </Box>
        </Box>
              </Box>



            </Box>

        </div>
    )
  }
  if(!isReadOnly)
  {
return(<div>
  {items.map(item => {
      return(<Box className="cart">
          {/* TODO: CRIO_TASK_MODULE_CART - Display view for each cart item with non-zero quantity */}
          <Box display="flex" alignItems="flex-start" padding="1rem">
            <Box className="image-container">
              <img
                // Add product image
                src={item.image}
                // Add product name as alt eext
                alt={item.image}
                width="100%"
                height="100%"
              />
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              height="6rem"
              paddingX="1rem"
            >
              <div>{item.name}</div>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <ItemQuantity
                // Add required props by checking implementation
                value={item.qty}
                handleAdd={()=>{handleQuantity(localStorage.getItem('token'), items,products, item._id, item.qty+1, { preventDuplicate: true })}}
                handleDelete={()=>{handleQuantity(localStorage.getItem('token'), items,products, item._id, item.qty-1, { preventDuplicate: true })}}

                />
                <Box padding="0.5rem" fontWeight="700">
                  ${item.cost}
                </Box>
              </Box>
            </Box>
          </Box>
          
      
         
        </Box>);
    })
  }
   <Box
            padding="1rem"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box color="#3C3C3C" alignSelf="center">
              Order total
            </Box>
            <Box
              color="#3C3C3C"
              fontWeight="700"
              fontSize="1.5rem"
              alignSelf="center"
              data-testid="cart-total"
            >
              ${getTotalCartValue(items)}
            </Box>
          </Box>
  <Box display="flex" justifyContent="flex-end" className="cart-footer">
            <Button
              color="primary"
              variant="contained"
              startIcon={<ShoppingCart />}
              className="checkout-btn"
              // history.push("/checkout")
              onClick={ ()=>  history.push("/checkout", {from: 'products'})
            }
            >
              Checkout
            </Button>
          </Box>
  </div>
)
          }



};

export default Cart;
