import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Products.css";
import ProductCard from "./ProductCard";
import Cart from "./Cart";
import { generateCartItemsFrom } from "./Cart";



 const Products = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [arr, setarr] = useState([])
  const [load, setload] = useState(true)
  const [filter, setfilter] = useState(false)
  const [myarr, setmyarr] = useState([])
  const [fullarr,setfullarr] = useState([])

  /**
   * 
   * Make API call to get the products list and store it to display the products
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on all available products
   *
   * API endpoint - "GET /products"
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "name": "iPhone XR",
   *          "category": "Phones",
   *          "cost": 100,
   *          "rating": 4,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "v4sLtEcMpzabRyfx"
   *      },
   *      {
   *          "name": "Basketball",
   *          "category": "Sports",
   *          "cost": 100,
   *          "rating": 5,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "upLK9JbQ4rMhTwt4"
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 500
   * {
   *      "success": false,
   *      "message": "Something went wrong. Check the backend console for more details"
   * }
   */
  useEffect(() => {
    performAPICall()
  }, [])

  const performAPICall = async () => {
    try {
      setload(true)
      const res = await axios.get(`${config.endpoint}/products`);
      // setmyarr(res.data)
      setfullarr(res.data)
      setload(false)
      setarr(res.data);
      // console.log(arr[0]);
      // setsome("hi") 
      return res.data;

    }
    catch (err) {

      if (err.response) {
        enqueueSnackbar(err.response.data.message, { variant: "error" });
      }
      else {
        enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON.", { variant: "error" });
      }    }
  }

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Implement search logic
  /**
   * Definition for search handler
   * This is the function that is called on adding new search keys
   *
   * @param {string} text
   *    Text user types in the search bar. To filter the displayed products based on this text.
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on filtered set of products
   *
   * API endpoint - "GET /products/search?value=<search-query>"
   *
   */
  const performSearch = async (text) => {
    try {
      const res = await axios.get(`${config.endpoint}/products/search?value=${text}`)
      // console.log(res.data)
      setarr(res.data)
      setfilter(false)
      return res.data
    }
    catch (err) {
      setfilter(true)
      // console.log(err.response.status)

    }

  };
  // console.log(filter)
  // TODO: CRIO_TASK_MODULE_PRODUCTS - Optimise API calls with debounce search implementation
  /**
   * Definition for debounce handler
   * With debounce, this is the function to be called whenever the user types text in the searchbar field
   *
   * @param {{ target: { value: string } }} event
   *    JS event object emitted from the search input field
   *
   * @param {NodeJS.Timeout} debounceTimeout
   *    Timer id set for the previous debounce call
   *
   */
  const debounceSearch = (event, debounceTimeout) => {
    let timeOutId
    clearTimeout(timeOutId)
    timeOutId = setTimeout(() => { performSearch(event.target.value) }, debounceTimeout)
  };

  /**
   * Perform the API call to fetch the user's cart and return the response
   *
   * @param {string} token - Authentication token returned on login
   *
   * @returns { Array.<{ productId: string, qty: number }> | null }
   *    The response JSON object
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "productId": "KCRwjF7lN97HnEaY",
   *          "qty": 3
   *      },
   *      {
   *          "productId": "BW0jAAeDJmlZCF8i",
   *          "qty": 1
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 401
   * {
   *      "success": false,
   *      "message": "Protected route, Oauth2 Bearer token not found"
   * }
   */

  useEffect(() => {

    if (localStorage.getItem("token") !== null) {
      fetchCart(localStorage.getItem("token"))
    }
    // generateCartItemsFrom(myarr,fullarr)
  }, []
  )
  


  const fetchCart = async (token) => {
    if (!token) return;
    // console.log(token)
    try {
      // TODO: CRIO_TASK_MODULE_CART - Pass Bearer token inside "Authorization" header to get data from "GET /cart" API and return the response data
      const res = await axios.get(`${config.endpoint}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setmyarr(res.data)
      return res.data

      return res.data
    } catch (e) {
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Could not fetch cart details. Check that the backend is running, reachable and returns valid JSON.",
          {
            variant: "error",
          }
        );
      }
      return null;
    }
  };


  // TODO: CRIO_TASK_MODULE_CART - Return if a product already exists in the cart
  /**
   * Return if a product already is present in the cart
   *
   * @param { Array.<{ productId: String, quantity: Number }> } items
   *    Array of objects with productId and quantity of products in cart
   * @param { String } productId
   *    Id of a product to be checked
   *
   * @returns { Boolean }
   *    Whether a product of given "productId" exists in the "items" array
   *
   */
  const isItemInCart = (items, productId) => {
    let isPresent = false;
    items.forEach((item) => {
      if (item.productId === productId) {
        isPresent = true;
      }

    })
    return isPresent;
  };

  /**
   * Perform the API call to add or update items in the user's cart and update local cart data to display the latest cart
   *
   * @param {string} token
   *    Authentication token returned on login
   * @param { Array.<{ productId: String, quantity: Number }> } items
   *    Array of objects with productId and quantity of products in cart
   * @param { Array.<Product> } products
   *    Array of objects with complete data on all available products
   * @param {string} productId
   *    ID of the product that is to be added or updated in cart
   * @param {number} qty
   *    How many of the product should be in the cart
   * @param {boolean} options
   *    If this function was triggered from the product card's "Add to Cart" button
   *
   * Example for successful response from backend:
   * HTTP 200 - Updated list of cart items
   * [
   *      {
   *          "productId": "KCRwjF7lN97HnEaY",
   *          "qty": 3
   *      },
   *      {
   *          "productId": "BW0jAAeDJmlZCF8i",
   *          "qty": 1
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 404 - On invalid productId
   * {
   *      "success": false,
   *      "message": "Product doesn't exist"
   * }
   */
     const addToCart = async (
    token,
    items,
    products,
    productId,
    qty,
    options = { preventDuplicate: false }
  ) => {
    // console.log(fullarr[0]._id)
    console.log("Entered add to card func");
    if (!token) {
      enqueueSnackbar("Login to add an item to the Cart", { variant: 'warning' });
    }
    else if (isItemInCart(items, productId) && options) {
      enqueueSnackbar("Item already in cart. Use the cart sidebar to update quantity or remove item.", { variant: 'warning' });
    }
    else {

      try{
        axios.post(`${config.endpoint}/cart`, {
          'productId': productId,
          'qty': qty
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }).then(res => {
          // console.log(myarr)
          
          setmyarr(res.data);
          // console.log(myarr[0].productId)
        });
      }
      catch(err){
        if(err.response){
          enqueueSnackbar(err.response.data.message, { variant: 'warning' });
        }
        else{
          enqueueSnackbar("xyz", { variant: 'warning' });

        }
      }
      

    }



  };







  // console.log("hhh")


  if (load === true) {

    return (
      <div className="loading">


        <CircularProgress />
        <h4>Loading Products</h4>


      </div>
    );
  }
  else if (load === false) {
    // console.log(localStorage.getItem("token"))

    if (localStorage.getItem("token") !== null) {
      // console.log(localStorage.getItem("token"))
      if (filter === true) {

        return (

          <div>


            <Header hasHiddenAuthButtons={true} children={<TextField

              className="search-desktop"

              size="small"

              variant="outlined"

              InputProps={{

                endAdornment: (

                  <InputAdornment position="end">

                    <Search color="primary" />

                  </InputAdornment>

                ),

              }}

              placeholder="Search for items/categories"

              name="search"
              // onChange={(event) => { performSearch(event.target.value) }}

              onChange={(event) => debounceSearch(event, 500)}

            />}>

            </Header>
            <TextField

              className="search-mobile"

              size="small"

              variant="outlined"

              InputProps={{

                endAdornment: (

                  <InputAdornment position="end">

                    <Search color="primary" />

                  </InputAdornment>

                ),

              }}

              placeholder="Search for items/categories"

              name="search"
              // onChange={(event) => { performSearch(event.target.value) }}

              onChange={(event) => debounceSearch(event, 500)}

            />
            <Grid container>
              <Grid item>

                <Grid container >

                  <Grid container>
                    <Grid item className="product-grid">
                      <Box className="hero">
                        <p className="hero-heading">
                          India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
                          to your door step
                        </p>

                      </Box>
                    </Grid>
                  </Grid>
                  {/* <Grid item> */}
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 6, sm: 6, md: 3 }} >
                    <Grid className="loading" item xs={12} md={12}>

                      <SentimentDissatisfied />



                      <p>No products found</p>

                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid>
                <Cart products={fullarr} items={generateCartItemsFrom(myarr, fullarr)} handleQuantity={addToCart} />
              </Grid>
            </Grid>



            <Footer />
          </div>


        );
      }
      else {
        // console.log(myarr)
        return (

          <div>


            <Header hasHiddenAuthButtons={true} children={<TextField

              className="search-desktop"

              size="small"

              variant="outlined"

              InputProps={{

                endAdornment: (

                  <InputAdornment position="end">

                    <Search color="primary" />

                  </InputAdornment>

                ),

              }}

              placeholder="Search for items/categories"

              name="search"
              onChange={(event) => debounceSearch(event, 500)}

            //  onChange={(event) => debounceSearch(event, 500)}

            />}>

            </Header>

            <TextField

              className="search-mobile"

              size="small"

              fullWidth

              InputProps={{

                endAdornment: (

                  <InputAdornment position="end">

                    <Search color="primary" />

                  </InputAdornment>

                ),

              }}

              placeholder="Search for items/categories"

              name="search"

              onChange={(event) => debounceSearch(event, 500)}

            />
            <Grid container >
              <Grid item xs={12} lg={9}>
                <Grid container >

                  <Grid container>
                    <Grid item className="product-grid">
                      <Box className="hero">
                        <p className="hero-heading">
                          India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
                          to your door step
                        </p>

                      </Box>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 6, sm: 6, md: 3 }} >
                      {arr.map(arritem => {
                        // console.log(arritem);
                        return (
                          <Grid item lg={3} xs={6}>
                            <ProductCard product={arritem} handleAddToCart={() => {addToCart(localStorage.getItem('token'), myarr,fullarr, arritem._id, 1, { preventDuplicate: true })}} />
                          </Grid>
                        )

                      })
                      }
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} lg={3} style={{ backgroundColor: "#E9F5E1" }}>
                <Cart products={fullarr}   items={generateCartItemsFrom(myarr,fullarr)}  handleQuantity={addToCart}/>
              </Grid>
            </Grid>


            <Footer />
          </div>
        );
      }
    }

    else {


      // console.log(localStorage.getItem("token"))

      if (filter === true) {

        return (

          <div>


            <Header hasHiddenAuthButtons={true} children={<TextField

              className="search-desktop"

              size="small"

              variant="outlined"

              InputProps={{

                endAdornment: (

                  <InputAdornment position="end">

                    <Search color="primary" />

                  </InputAdornment>

                ),

              }}

              placeholder="Search for items/categories"

              name="search"
              // onChange={(event) => { performSearch(event.target.value) }}

              onChange={(event) => debounceSearch(event, 500)}

            />}>

            </Header>
            <TextField

              className="search-mobile"

              size="small"

              variant="outlined"

              InputProps={{

                endAdornment: (

                  <InputAdornment position="end">

                    <Search color="primary" />

                  </InputAdornment>

                ),

              }}

              placeholder="Search for items/categories"

              name="search"
              // onChange={(event) => { performSearch(event.target.value) }}

              onChange={(event) => debounceSearch(event, 500)}

            />
            <Grid container>
              <Grid item>

                <Grid container >

                  <Grid container>
                    <Grid item className="product-grid">
                      <Box className="hero">
                        <p className="hero-heading">
                          India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
                          to your door step
                        </p>

                      </Box>
                    </Grid>
                  </Grid>
                  {/* <Grid item> */}
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 6, sm: 6, md: 3 }} >
                    <Grid className="loading" item xs={12} md={12}>

                      <SentimentDissatisfied />



                      <p>No products found</p>

                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

            </Grid>



            <Footer />
          </div>


        );
      }
      else {
        return (

          <div>


            <Header hasHiddenAuthButtons={true} children={<TextField

              className="search-desktop"

              size="small"

              variant="outlined"

              InputProps={{

                endAdornment: (

                  <InputAdornment position="end">

                    <Search color="primary" />

                  </InputAdornment>

                ),

              }}

              placeholder="Search for items/categories"

              name="search"
              onChange={(event) => debounceSearch(event, 500)}



            />}>

            </Header>

            <TextField

              className="search-mobile"

              size="small"

              fullWidth

              InputProps={{

                endAdornment: (

                  <InputAdornment position="end">

                    <Search color="primary" />

                  </InputAdornment>

                ),

              }}

              placeholder="Search for items/categories"

              name="search"

              onChange={(event) => debounceSearch(event, 500)}

            />
            <Grid container >
              <Grid item >
                <Grid container >

                  <Grid container>
                    <Grid item className="product-grid">
                      <Box className="hero">
                        <p className="hero-heading">
                          India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
                          to your door step
                        </p>

                      </Box>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 6, sm: 6, md: 3 }} >
                      {arr.map(arritem => {
                        // console.log(arritem);
                        return (
                          <Grid item lg={3} xs={6}>
                            <ProductCard product={arritem} handleAddToCart={() => { 
                              addToCart(localStorage.getItem('token'), myarr,fullarr, arritem._id, 1, { preventDuplicate: true })
                              }}/>
                          </Grid>
                        )

                      })
                      }
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

            </Grid>


            <Footer />
          </div>
        );
      }

    }
  }

};


export default Products;
