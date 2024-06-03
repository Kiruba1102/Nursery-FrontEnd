import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IconButton, Badge, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, Modal, Backdrop, Fade, Box, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import StarIcon from "@mui/icons-material/Star";
import Swal from "sweetalert2";

const HomePage = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [getHistory, setGetHistory] = useState([]);
  const [getHistory1, setGetHistory1] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filterOption, setFilterOption] = useState("all");
  const [filterValue, setFilterValue] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      setSearchResults([]);
      return;
    }
    const results = products.filter((plant) =>
      plant.species.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleLogout = () => {
    window.location.href="/";
  };

  const addToCart = async (product) => {
    const cid = sessionStorage.getItem("cid");
    if (!cid) {
      alert("User ID not found. Please log in.");
      return;
    }
  
    const isAlreadyInCart = cart.some((item) => item.plant.pid === product.pid);
    if (isAlreadyInCart) {
      alert("This item is already in your cart.");
      return;
    }
  
    try {
      const response = await axios.post(
        `http://localhost:8080/api/cart-items?cid=${cid}&pid=${product.pid}`,
        product
      );
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Item added to the cart",
        timer: 1500
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
  
      setCart((prevCart) => [...prevCart, response.data]);
    } catch (error) {
      alert("Failed to add item to cart. Please try again.");
    }
  };
  
  const calculateTotalPrice = (Get) => {
    return Get.reduce((total, product) => total + product.plant.price * product.plant.quantity, 0);
  };
  
  useEffect(() => {
    setTotalPrice(calculateTotalPrice(getHistory1));
  }, [getHistory1]);
  
  const purchase = () => {
    if (getHistory.length === 0) {
      alert("Cart is empty!");
      return;
    }
    navigate("/purchase");
  };
  
  useEffect(() => {
    const id = sessionStorage.getItem("cid");
    axios
     .get(`http://localhost:8080/api/cart-items/cart/${id}`)
     .then((response) => {
        setGetHistory(response.data);
      })
     .catch((error) => {
        console.error("Error fetching:", error);
      });
  }, []);
  
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart"));
    if (cartData) {
      setCart(cartData);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/api/plants/get");
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, []);
  
  const getRandomRating = () => {
    return Math.floor(Math.random() * 5) + 1;
  };
  
  const removeFromCart = async (item) => {
    try {
      await axios.delete(`http://localhost:8080/api/cart-items/delCart/${item.cartId}`);
      const updatedCart = cart.filter((cartItem) => cartItem.cartId !== item.cartId);
      setCart(updatedCart);
      window.location.reload();
    } catch (error) {
      console.error("Error removing item from cart:", error);
      alert("Failed to remove item from cart. Please try again.");
    }
  };
    
  const handleFilterOptionChange = (e) => {
    setFilterOption(e.target.value);
    setFilterValue(""); // Reset filter value when filter option changes
  };
  
  const handleFilterValueChange = (e) => {
    setFilterValue(e.target.value);
  };
  
  const filteredProducts = products.filter((product) => {
    if (filterOption === "all") return true;
    if (filterOption === "maxPrice") {
      return product.price <= parseInt(filterValue);
    } else if (filterOption === "minPrice") {
      return product.price >= parseInt(filterValue);
    } else if (filterOption === "variety") {
      return product.variety.toLowerCase().includes(filterValue.toLowerCase());
    }
  });

  return (
    <div className="container p-0">
      <br/>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#90EE90" }}>
        <div className="container-fluid">
          <h1 className="h1">
            <a href="/" className="logo">
              Plant<span className="span p-1">Zo</span>
            </a>
          </h1>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
           
            <div className="navbar-right d-flex align-items-center">
              <input
                type="text"
                placeholder="Search for plants"
                className="form-control me-2 vw-100"
                style={{marginRight:"250px",width:"290px",marginLeft:"30px",fontSize:"16px",height:"39px",borderRadius:"10px"}}
                value={searchTerm}
                onChange={handleSearch}
              />
              <FormControl style={{marginRight:"20px",width:"200px"}}>
                <InputLabel id="filter-select-label"></InputLabel>
                <Select
                  labelId="filter-select-label"
                  id="filter-select"
                  value={filterOption}
                  onChange={handleFilterOptionChange}
                  style={{height:"39px",fontSize:"15px",borderRadius:"10px"}}
                >
                  <MenuItem value="all" > Filter By All</MenuItem>
                  <MenuItem value="maxPrice">Min Price</MenuItem>
                  <MenuItem value="minPrice">Max Price</MenuItem>
                  <MenuItem value="variety">Variety</MenuItem>
                </Select>
              </FormControl>
              {filterOption !== "all" && (
                <input
                  type={filterOption === "variety" ? "text" : "number"}
                  placeholder={filterOption === "variety" ? " Enter Variety" : " Enter Price"}
                  className="form-control me-2 vh-100"
                  style={{marginRight:"20px",width:"140px"}}
                  value={filterValue}
                  onChange={handleFilterValueChange}
                />
              )}
              <IconButton className="btn btn-secondary me-2 vh-100">
                <PersonIcon color="primary" />
                {sessionStorage.getItem("cname")}
              </IconButton>
              <IconButton className="btn btn-secondary" onClick={() => setShowCart(!showCart)}>
                {showCart ? (
                  <ShoppingCartIcon color="secondary" />
                ) : (
                  <Badge badgeContent={getHistory.length} color="primary">
                    <ShoppingCartIcon />
                  </Badge>
                )}
              </IconButton>
              <IconButton className="btn btn-secondary" onClick={handleLogout}>
                <LogoutIcon color="primary" />
              </IconButton>
            </div>
          </div>
        </div>
      </nav>
      <br />
      <div className="row row-cols-1 row-cols-md-4 g-4 d-flex justify-content-center">
        {searchResults.length > 0 ? (
          searchResults.map((product, index) => (
            <div className="col-md-3" key={product.pid}>
              <Card sx={{ marginBottom: 3 }} >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="200"
                    image={`data:image/jpeg;base64,${product.image}`}
                    alt={product.species}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.species}
                    </Typography>
                    <Typography variant="body5" color="text.secondary">
                      {product.variety}
                    </Typography>
                    <Typography variant="body5" color="text.secondary">
                    ₹ {product.price}
                    </Typography>
                    <div>
                      {Array.from({ length: getRandomRating() }, (_, index) => (
                        <StarIcon key={index}  style={{color:"yellow"}}/>
                      ))}
                    </div>
                  </CardContent>
                </CardActionArea>
                <CardActions >
                  <Button className="btn btn-info" onClick={() => addToCart(product)} disabled={loading}>
                    {loading ? "Adding to cart..." : "Add to cart"}
                  </Button>
                
                </CardActions>
              </Card>
            </div>
          ))
        ) : (
          filteredProducts.map((product, index) => (
            <div className="col-md-3" key={product.pid}>
              <Card sx={{ marginBottom: 3 }} style={{height:"440px"}}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="200"
                    image={`data:image/jpeg;base64,${product.image}`}
                    alt={product.species}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.species}
                    </Typography>
                    <Typography variant="body5" color="text.secondary">
                      {product.variety}
                    </Typography>
                    <Typography variant="body5" color="text.secondary">
                    ₹ {product.price}
                    </Typography>
                    <div>
                      {Array.from({ length: getRandomRating() }, (_, index) => (
                        <StarIcon key={index} style={{color:"gold"}} />
                      ))}
                    </div>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button className="btn btn-info" onClick={() => addToCart(product)} disabled={loading}>
                    {loading ? "Adding to cart..." : "Add to cart"}
                  </Button>
                  {/* <Button className="btn btn-info fs-1" onClick={() => buyNow(product)}>
                    Buy now
                  </Button> */}
                </CardActions>
              </Card>
            </div>
          ))
        )}
      </div>
      <Modal
        open={showCart}
        onClose={() => setShowCart(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={showCart}>
          <Box
            sx={{
              transform: "translateZ(0)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem",
              backgroundColor: "#fff",
              borderRadius: "0.5rem",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <div className="row w-100 d-flex align-items-center justify-content-center">
              {getHistory.map((item) => (
                <div key={item.id} className="col-md-2">
                  <div className="card">
                    <div className="card-body d-flex flex-column align-items-center">
                      <img
                        src={`data:image/jpeg;base64,${item.plant.image}`}
                        style={{ width: "100px" }}
                        alt={item.plant.species}
                      />
                      <p className="card-title">{item.plant.species}</p>
                      <p>{item.variety}</p>
                      <p>{item.price}</p>
                      <p className="card-text">{item.plant.price * item.plant.quantity}</p>
                      <button className="btn btn-danger" onClick={() => removeFromCart(item)}>
                        Remove from Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <h3>Total Price: ₹ {calculateTotalPrice(getHistory)}</h3>
            <button className="btn btn-success" onClick={purchase}>
              Purchase
            </button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default HomePage;
