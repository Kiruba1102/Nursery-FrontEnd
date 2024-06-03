import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useParams } from "react-router-dom";

const BuyNowPage = () => {
  const { productId } = useParams(); // Get the plant ID from the route parameter
  const [product, setProduct] = useState(null);
  const [cust, setCust] = useState({ address: "", phone: "" });

  useEffect(() => {
    // Fetch the product details based on the provided plant ID
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/plants/get/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();

    // Fetch customer details or set default values
    const customerId = sessionStorage.getItem("cid");
    axios
      .get(`http://localhost:8080/api/customers/cust/${customerId}`)
      .then((response) => {
        setCust(response.data);
      })
      .catch((error) => {
        console.error("Error fetching customer details:", error);
      });
  }, [productId]);

  const placeOrder = async () => {
    if (!product) {
      return;
    }

    const totalPrice = product.price * product.quantity; // Calculate total price for the single product
    const cartItem = [{ plant: product }]; // Create a cart item array with the single product

    const formData = new FormData();
    formData.append("email", sessionStorage.getItem("email"));

    try {
      const response = await axios.post(`http://localhost:8080/api/shippings/post/${totalPrice}/Offline`, cartItem);
      if (response.data) {
        axios.post(`http://localhost:8080/api/sendmail`, formData);
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Your order has been placed successfully! Details have been sent to your email.",
          timer: 1500,
        });
        // Redirect to home page after successful purchase
        setTimeout(() => {
          window.location.href = "/home";
        }, 1000);
      } else {
        Swal.fire("Error!", "Failed to place the order. Please try again later.", "error");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      Swal.fire("Error!", "Failed to place the order. Please try again later.", "error");
    }
  };

  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol>
            <MDBCard>
              <MDBCardBody className="p-4">
                <MDBRow>
                  <MDBCol lg="7">
                    {/* Product Details */}
                    {product && (
                      <MDBCard className="mb-3">
                        <MDBCardBody>
                          <div className="d-flex justify-content-between">
                            <div className="d-flex flex-row align-items-center">
                              <div>
                                <MDBCardImage
                                  src={`data:image/jpeg;base64,${product.image}`}
                                  fluid
                                  className="rounded-3"
                                  style={{ width: "65px" }}
                                  alt={product.species}
                                />
                              </div>
                              <div className="ms-3 " style={{ padding: "20px" }}>
                                <MDBTypography tag="h5">{product.species}</MDBTypography>
                                <p className="small mb-0">{product.variety}</p>
                              </div>
                            </div>
                            <div className="d-flex flex-row align-items-center">
                              <div style={{ width: "80px" }}>
                                <MDBTypography tag="h5" className="mb-0">
                                  Rs {product.price}
                                </MDBTypography>
                              </div>
                              <a href="#!" style={{ color: "#cecece" }}>
                                <MDBIcon fas icon="trash-alt" />
                              </a>
                            </div>
                          </div>
                        </MDBCardBody>
                      </MDBCard>
                    )}
                  </MDBCol>

                  <MDBCol lg="5">
                    {/* Payment details */}
                    {/* You can reuse the payment details section from the PurchasePage component */}
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default BuyNowPage;
