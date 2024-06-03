import React, { useEffect, useState } from "react";
import axios from "axios";
import { Backdrop, Box, Fade, Modal, TextField } from "@mui/material";
import Swal from "sweetalert2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "0.25em",
  bgcolor: "background.paper",
  border: "2px solid gray",
  boxShadow: 24,
  p: 4,
};

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Add Product------------------------
  const [species, setSpecies] = useState("");
  const [variety, setVariety] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("species", species);
    formData.append("variety", variety);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/plants/imageupload",
        formData
      );
      console.log(response.data);
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Product Added Successfully",
        
        timer: 1500,
      });
      setTimeout(()=>{
        window.location.reload();
      },1000)
      window.location.reload();
      setModalIsOpen(false); 
      fetchProducts(); 
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/plants/get");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleModal = () => {
    setModalIsOpen(true);
  };

  const handleFindClose = () => {
    setModalIsOpen(false);
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/api/plants/${productId}`);
      alert("Product deleted Successfully");
      fetchProducts(); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <br />
     
      <Modal
        open={modalIsOpen}
        onClose={handleFindClose}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalIsOpen}>
          <Box sx={{ ...style, width: "90%", maxWidth: "500px" }} className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title" id="transition-modal-title">Add Plant</h5>
                <button type="button" className="btn-close" onClick={handleFindClose}></button>
              </div>
              <div className="modal-body" style={{fontSize:"32px"}}>
                <div className="mb-3">
                  <TextField 
                    autoFocus
                    type="text"
                    margin="normal"
                    required
                    fullWidth
                    label="Species"
                    value={species}
                    onChange={(event) => setSpecies(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <TextField
                    autoFocus
                    type="text"
                    margin="normal"
                    required
                    fullWidth
                    label="Variety"
                    id="variety"
                    value={variety}
                    onChange={(event) => setVariety(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <TextField
                    autoFocus
                    margin="normal"
                    required
                    fullWidth
                    label="Price"
                    id="price"
                    type="number"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <TextField
                    autoFocus
                    type="number"
                    margin="normal"
                    required
                    fullWidth
                    label="Quantity"
                    id="quantity"
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                  />
                </div>
                <br />
                <div className="mb-3">
                  <TextField
                    id="image"
                    type="file"
                    onChange={(event) => setImage(event.target.files[0])}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleFindClose}>Close</button>
                <button type="submit" className="btn btn-primary">Add plant</button>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>

      <div>
        <button onClick={handleModal} className="btn btn-succcess " style={{color:"green",fontSize:"30px"}}>Add Plant</button>
       <button  className="btn btn- " style={{color:"green",fontSize:"20px"}}> <a href="/adashboard"> Back</a></button>
        <br />
        <br />
        <table className="table table-bordered table table-hover ">
          <thead  className="thead-dark">
            <tr>
              <th>Product Id</th>
              <th>Species Name</th>
              <th>Variety</th>
              <th>Price</th>
              {/* <th>Quantities</th> */}
              <th>Action</th>
            
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.pid}>
                <td>{product.pid}</td>
                <td>{product.species}</td>
                <td>{product.variety}</td>
                <td>{product.price}</td>
                {/* <td>{product.quantity}</td> */}
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(product.pid)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
