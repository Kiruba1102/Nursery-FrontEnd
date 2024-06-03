import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
  MDBRadio,
} from "mdb-react-ui-kit";
import Swal from "sweetalert2";

const PurchasePage = () => {
  const [cartItem, setCartItem] = useState([]);
  const [cust, setCust] = useState({ address: "", phone: "" });
  const email = sessionStorage.getItem("email");
  const [cart, setCart] = useState([]);

  const [paymentMethod, setPaymentMethod] = useState("Offline");

  const calculateTotalPrice = (cartItems) => {
    return cartItems.reduce(
      (total, product) => total + product.plant.price * product.plant.quantity,
      0
    );
  };

  const handleChange = () => {
    const { value: formValues } = Swal.fire({
      title: "Enter Card details",
      html: `
        <input id="swal-input1" placeholder="Enter Card number" class="swal2-input">
        <input id="swal-input2" placeholder="Enter Cvv number" class="swal2-input">
      `,
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
        ];
      },
    });
    if (formValues) {
      Swal.fire(JSON.stringify(formValues));
    }
  };

  const handleQuantityChange = (item, operation) => {
    const newCartItem = [...cartItem];
    const index = newCartItem.indexOf(item);
    if (operation === "add") {
      newCartItem[index].plant.quantity += 1;
    } else if (operation === "subtract") {
      if (newCartItem[index].plant.quantity > 1) {
        newCartItem[index].plant.quantity -= 1;
      }
    }
    setCartItem(newCartItem);
  };

  useEffect(() => {
    const id = sessionStorage.getItem("cid");

    console.log(email);
    axios
      .get(`http://localhost:8080/api/cart-items/cart/${id}`)
      .then((response) => {
        setCartItem(response.data);
      })
      .catch((error) => {
        console.error("Error fetching:", error);
      });

    axios.get(`http://localhost:8080/api/customers/cust/${id}`).then((res) => {
      console.log(res.data);
      setCust(res.data);
    });
  }, []);

  const placeOrder = (e) => {
    const formData = new FormData();
    formData.append("email", email);
    e.preventDefault();
    axios
      .post(
        `http://localhost:8080/api/shippings/post/${totalPrice}/${paymentMethod}`,
        cartItem
      )
      .then((response) => {
        if (response.data) {
          axios.post(`http://localhost:8080/api/sendmail`, formData);
          deleteCartItems();
          Swal.fire("Success!", "success");
          Swal.fire({
            position: "top",
            icon: "success",
            title:
              "Your order has been placed successfully!   Details has been sent Your mail ID ",

            timer: 1500,
          });
          setTimeout(() => {
            window.location.href = "/";
          }, 2500);
        } else {
          Swal.fire(
            "Error!",
            "Failed to place the order. Please try again later.",
            "error"
          );
        }
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        Swal.fire(
          "Error!",
          "Failed to place the order. You already purchased.",
          "error"
        );
      });
  };

  const deleteCartItems = () => {
    const userId = sessionStorage.getItem("cid");
    axios
      .delete(`http://localhost:8080/api/cart-itemsuser/${userId}`)
      .then((response) => {
        console.log("Cart items deleted successfully:", response.data);

        setCartItem([]);
      })
      .catch((error) => {
        console.error("Error deleting cart items:", error);
      });
  };

  const totalPrice = calculateTotalPrice(cartItem);

  const currentDate = new Date().toLocaleDateString();
  sessionStorage.setItem("date",currentDate);

  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol>
            <MDBCard>
              <MDBCardBody className="p-4">
                <MDBRow>
                  <MDBCol lg="7">
                    <MDBTypography tag="h5">
                      <a href="/home" className="text-body">
                        <MDBIcon fas icon="long-arrow-alt-left me-2" /> Continue
                        shopping
                      </a>
                    </MDBTypography>

                    <hr />

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <p className="mb-1">Shopping cart</p>
                        <p className="mb-0">
                          You have {cartItem.length} items in your cart
                        </p>
                      </div>
                      <div>
                        <p>
                          <span className="text-muted">Price</span>
                          {/* <a href="#!" className="text-body">
                            price
                            <MDBIcon fas icon="angle-down mt-1" />
                          </a> */}
                        </p>
                      </div>
                    </div>

                    {cartItem.map((item, index) => (
                      <MDBCard className="mb-3" key={index}>
                        <MDBCardBody>
                          <div className="d-flex justify-content-between">
                            <div className="d-flex flex-row align-items-center">
                              <div>
                                <MDBCardImage
                                  src={`data:image/jpeg;base64,${item.plant.image}`}
                                  fluid
                                  className="rounded-3"
                                  style={{ width: "65px" }}
                                  alt={item.plant.species}
                                />
                              </div>
                              <div
                                className="ms-3 "
                                style={{ padding: "20px" }}
                              >
                                <MDBTypography tag="h5">
                                  {item.plant.species}
                                </MDBTypography>
                                <p className="small mb-0">{item.variety}</p>
                              </div>
                            </div>
                            <div className="d-flex flex-row align-items-center">
                              <div
                                style={{
                                  width: "50px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  flexDirection: "column",
                                }}
                              >
                                <button
                                  onClick={() =>
                                    handleQuantityChange(item, "subtract")
                                  }
                                >
                                  -
                                </button>
                                <MDBTypography
                                  tag="h5"
                                  className="fw-normal mb-0"
                                >
                                  {item.plant.quantity}
                                </MDBTypography>
                                <button
                                  onClick={() =>
                                    handleQuantityChange(item, "add")
                                  }
                                >
                                  +
                                </button>
                              </div>
                              <div style={{ width: "80px" }}>
                                <MDBTypography tag="h5" className="mb-0">
                                  ₹ {item.plant.price * item.plant.quantity}
                                </MDBTypography>
                              </div>
                            </div>
                          </div>
                        </MDBCardBody>
                      </MDBCard>
                    ))}
                    <MDBTypography tag="h5" className="mb-0">
                      Total Price: ₹ {totalPrice}
                    </MDBTypography>
                  </MDBCol>

                  <MDBCol lg="5">
                    <MDBCard className="bg-info text-white rounded-3">
                      <MDBCardBody>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <MDBTypography tag="h5" className="mb-0">
                            Payment details
                          </MDBTypography>
                          <MDBCardImage
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                            fluid
                            className="rounded-3"
                            style={{ width: "45px" }}
                            alt="Avatar"
                          />
                        </div>

                        <form className="mt-4">
                          <label>Customer Name</label>
                          <MDBInput
                            className="mb-4"
                            label=""
                            type="text"
                            size="lg"
                            value={cust.cname}
                            placeholder="Customer's Name"
                            contrast
                          />

                          <label>Customer Info</label>
                          <MDBInput
                            className="mb-4"
                            label=""
                            type="text"
                            size="lg"
                            minLength="19"
                            maxLength="19"
                            placeholder="Customer Address"
                            value={cust.address}
                            contrast
                          />
                          <MDBInput
                            className="mb-4"
                            label=""
                            type="text"
                            size="lg"
                            minLength="19"
                            maxLength="19"
                            placeholder="Customer Address"
                            value={cust.phone}
                            contrast
                          />
                          <label>Shipping Date</label>
                          <MDBInput
                            className="mb-4"
                            label=""
                            type="text"
                            size="lg"
                            minLength="19"
                            maxLength="19"
                            placeholder="shipping date"
                            value={currentDate}
                            contrast
                          />
                          <label>Payment</label>
                          <MDBRow className="mb-4">
                            <MDBCol md="6">
                              <MDBRadio
                                onClick={() => handleChange()}
                                style={{ marginLeft: "-50px" }}
                                name="flexRadioDefault"
                                id="flexRadioDefault1"
                              />
                              <label>Online</label>
                            </MDBCol>
                            <MDBCol md="6">
                              <MDBRadio
                                style={{ marginLeft: "-50px" }}
                                name="flexRadioDefault"
                                id="flexRadioDefault2"
                                defaultChecked
                              />{" "}
                              <label>Offline</label>
                            </MDBCol>

                            <MDBCol md="6">
                              <label>Total price</label>
                              <MDBInput
                                className="mb-4"
                                label=""
                                type="text"
                                size="lg"
                                minLength="3"
                                maxLength="3"
                                placeholder="Total price"
                                contrast
                                value={totalPrice}
                              />
                            </MDBCol>

                            <MDBCol md="8">
                              <button
                                className="me-1 p-2 mx-auto btn-warning"
                                onClick={placeOrder}
                              >
                                Place Order
                              </button>
                            </MDBCol>
                          </MDBRow>
                        </form>
                      </MDBCardBody>
                    </MDBCard>
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

export default PurchasePage;
