import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Orders.module.css";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart, addToCart } from "../redux/cartSlice";
import { getImageUrl } from "../services/apiProducts";
import supabase from "../services/supabase";
import { getOrdersApi } from "../services/apiOrders";
import { FormattedNumber, IntlProvider } from "react-intl";
import { FiShoppingCart } from "react-icons/fi";

function Orders() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [selectedCarIds, setSelectedCarIds] = useState(new Set());

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.id) {
      dispatch(clearCart());
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (user?.id) {
      const fetchOrders = async () => {
        try {
          const ordersData = await getOrdersApi(user.id);
          setOrders(ordersData);
          console.log("Orders from table:", ordersData);
        } catch (err) {
          setError(err.message);
        }
      };
      fetchOrders();
    }
  }, [user]);

  useEffect(() => {
    if (orders.length > 0) {
      const unpaidCars = orders.filter((order) => order?.paid !== true); // اطمینان از اینکه order موجود باشد
      unpaidCars.forEach((order) => {
        if (order?.car && order.car.id) {
          // بررسی موجود بودن car و id
          const alreadyInCart = items.some(
            (item) => item?.car?.id === order.car.id
          ); // بررسی car و id در items
          if (!alreadyInCart) {
            dispatch(addToCart(order)); // اضافه کردن به سبد خرید
          }
        }
      });
    }
  }, [orders, items, dispatch]);

  const handlePayment = (selectedCars) => {
    const itemsToSend = selectedCars
      .map((car) => {
        if (car.paid) {
          console.log(`Car ${car.car.name} is already paid.`);
          return null;
        }
        const totalPrice = car.car.price * car.quantity;
        return {
          car: car.car,
          quantity: car.quantity,
          totalPrice: totalPrice,
        };
      })
      .filter((item) => item !== null);

    const totalAmount = itemsToSend.reduce(
      (total, item) => total + item.totalPrice, // جمع کل مبلغ برای همه آیتم‌ها
      0
    );

    navigate("/payment", {
      state: {
        items: itemsToSend,
        totalAmount,
      },
    });
  };

  if (items.length === 0) {
    return (
      <div className={styles.emptyCartMessagecontainer}>
        <button
          className={styles.emptyCartMessage}
          onClick={() => navigate(`/dashboard`)}
        >
          Order List Is Empty / Back to Dashboard Page
        </button>
      </div>
    );
  }

  const totalAmount = items.reduce((total, item) => total + item.totalPrice, 0);

  // Handle selection of cars
  const handleSelectCar = (carId) => {
    setSelectedCarIds((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(carId)) {
        newSelection.delete(carId);
      } else {
        newSelection.add(carId);
      }
      return newSelection;
    });
  };

  // Filter unpaid items
  const unpaidItems = items.filter((item) => !item.paid);

  // Prepare data for selected cars
  const selectedCars = unpaidItems.filter((item) =>
    selectedCarIds.has(item.car.id)
  );

  const totalSelectedPrice = selectedCars.reduce((total, item) => {
    return total + item.car.price * item.quantity; // Total price for selected cars
  }, 0);

  const handleRemoveFromCart = async (car) => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", car.id);

      console.log(
        "Delete request sent with user_id:",
        user.id,
        "and product_id:",
        car.id
      );

      if (error) {
        console.error("Error removing from database:", error.message);
        return;
      }

      if (data && data.length === 0) {
        console.log("No matching order found to remove.");
      } else {
        dispatch(removeFromCart(car));
      }
    } catch (error) {
      console.error("Error removing from cart:", error.message);
    }
  };

  return (
    <>
      {unpaidItems.length > 0 && (
        <h1 className={styles.heder}>
          {" "}
          Products selected and added to Shopping Cart
        </h1>
      )}{" "}
      <div className={styles.orders}>
        <div className={styles.wrapper}>
          {unpaidItems.length === 0 ? (
            <div className={styles.emptyCartMessagecontainer}>
              <button
                className={styles.emptyCartMessage}
                onClick={() => navigate(`/dashboard`)}
              >
                Order List Is Empty / Back to Dashboard Page
              </button>
            </div>
          ) : (
            unpaidItems.map(({ car, quantity, paid }) => (
              <div
                key={car.id}
                className={`${styles.property} ${
                  selectedCarIds.has(car.id) ? styles.selected : ""
                } ${paid ? styles.paid_item : ""}`} // استایل متفاوت برای محصولات پرداخت‌شده
              >
                <div className={styles.part_1}>
                  <div className={styles.part_2}>
                    <div className={styles.checkinput}>
                      {" "}
                      <div>
                        <input
                          type="checkbox"
                          id={`checkbox-${car.id}`} // شناسه یکتا برای چک باکس
                          className={styles.checkbox}
                          checked={selectedCarIds.has(car.id)} // وضعیت انتخاب
                          onChange={() => handleSelectCar(car.id)} // تابع برای انتخاب
                        />
                        <div>
                          <label
                            htmlFor={`checkbox-${car.id}`}
                            className={styles.checkboxLabel}
                          >
                            {car.name}
                          </label>
                        </div>
                      </div>
                      <div className={styles.iconLink}>
                        <FiShoppingCart
                          size={30}
                          className={`${styles.icon} ${styles.cartIcon}`}
                        />
                      </div>
                    </div>
                    <div className={styles.part_3}>
                      <img src={getImageUrl(car.image)} alt={car.name} />
                    </div>
                    <div className={styles.mainproperty}>
                      {car.type === "books" ? (
                        <>
                          <span>
                            <span className={styles.span1}>Publisher:</span>
                            <span className={styles.span2}>
                              {" "}
                              {car.publisher}
                            </span>
                          </span>
                        </>
                      ) : (
                        <>
                          <span>
                            <span className={styles.span1}>Company Name:</span>
                            <span className={styles.span2}> {car.make}</span>
                          </span>
                        </>
                      )}

                      <IntlProvider locale="en">
                        <span className={styles.unitprice}>
                          <span className={styles.span1}>Unit Price: </span>
                          <span className={styles.span2}>
                            {" "}
                            <span className={styles.number}>
                              <FormattedNumber
                                value={car.price}
                                style="currency"
                                currency="USD"
                              />
                            </span>
                          </span>
                        </span>
                        <span>
                          <span className={styles.span1}>Quantity: </span>
                          <span className={styles.span2}> {quantity}</span>
                        </span>
                      </IntlProvider>
                    </div>
                    <div className={styles.buttonContainer}>
                      {" "}
                      <IntlProvider locale="en">
                        <span className={styles.totalprice}>
                          <span className={styles.span1}>
                            Total Paid Price:{" "}
                          </span>
                          <span className={styles.number}>
                            <span className={styles.span2}>
                              <FormattedNumber
                                value={car.price * quantity}
                                style="currency"
                                currency="USD"
                              />
                            </span>
                          </span>
                        </span>
                      </IntlProvider>
                      <div className={styles.button2}>
                        {" "}
                        <button
                          onClick={() => navigate(`/products/${car.id}`)}
                          className={styles.backbutton}
                        >
                          Back to detail page
                        </button>
                        <button
                          className={styles.removebutton}
                          onClick={() => handleRemoveFromCart(car)}
                        >
                          Remove from Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className={styles.totaldescuss}>
          <div className={styles.discuss}>
            <h2>Instructions</h2>
            <p>- Please be careful in choosing the product.</p>
            <p>
              - After moving to the payment page, you cannot return to this page
              and you have to do the steps again from the beginning.
            </p>
            <p>
              - If you are satisfied with our store, please fill out the survey
              form.
            </p>
          </div>
          <div className={styles.paiedButton}>
            {unpaidItems.length > 0 && (
              <div className={styles.pay_2}>
                <button className={styles.btvtotal}>
                  Total Orders Price: ${totalAmount.toFixed(2)}
                </button>
                <button
                  onClick={() => handlePayment(unpaidItems)}
                  className={styles.btvpay_1}
                >
                  Transfer to the payment (All orders) gateway
                </button>
              </div>
            )}

            {selectedCars.length > 0 && (
              <>
                <div className={styles.pay_1}>
                  <button className={styles.btv}>
                    Total Selected Price: ${totalSelectedPrice.toFixed(2)}
                  </button>
                  <button
                    onClick={() => handlePayment(selectedCars)}
                    className={styles.btvpayselected}
                  >
                    Transfer to the payment (Selected orders) gateway
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Orders;
