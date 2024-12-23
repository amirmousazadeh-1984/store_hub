import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Orders.module.css";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart, addToCart } from "../redux/cartSlice";
import { getImageUrl } from "../services/apiProducts";
import supabase from "../services/supabase";
import { getOrdersApi } from "../services/apiOrders";
import { FormattedNumber, IntlProvider } from "react-intl";
import { HiShoppingCart } from "react-icons/hi";
import { BsCart4 } from "react-icons/bs";
import { MdShoppingCartCheckout } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa";
import PropTypes from "prop-types";

// Separate component for the cart header
const CartHeader = () => (
  <div className={styles.headerContainer}>
    <MdShoppingCartCheckout className={styles.cartIcon} />
    <h1 className={styles.heder}>Shopping Cart</h1>
  </div>
);

// Separate component for empty cart message
const EmptyCart = ({ onNavigate }) => (
  <div className={styles.emptyCartMessagecontainer}>
    <div className={styles.emptyCartContent}>
      <BsCart4 className={styles.emptyCartIcon} />
      <h2 className={styles.emptyCartTitle}>Your Shopping Cart is Empty</h2>
      <p className={styles.emptyCartDescription}>Looks like you haven't added anything to your cart yet.</p>
      <button className={styles.emptyCartMessage} onClick={onNavigate}>
        Continue Shopping
      </button>
    </div>
  </div>
);

EmptyCart.propTypes = {
  onNavigate: PropTypes.func.isRequired,
};

// Separate component for product details
const ProductDetails = ({ car, quantity }) => (
  <div className={styles.mainproperty}>
    <span className={styles.productTitle}>{car.name}</span>
    {car.type === "books" ? (
      <span>
        <span className={styles.span1}>Publisher:</span>
        <span className={styles.span2}> {car.publisher}</span>
      </span>
    ) : (
      <span>
        <span className={styles.span1}>Company Name:</span>
        <span className={styles.span2}> {car.make}</span>
      </span>
    )}
    <PriceDisplay price={car.price} quantity={quantity} />
    <IntlProvider locale="en">
      <span className={styles.totalprice}>
        <span className={styles.span1}>Total Price: </span>
        <span className={styles.number}>
          <FormattedNumber
            value={car.price * quantity}
            style="currency"
            currency="USD"
          />
        </span>
      </span>
    </IntlProvider>
  </div>
);

ProductDetails.propTypes = {
  car: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    publisher: PropTypes.string,
    make: PropTypes.string,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  quantity: PropTypes.number.isRequired,
};

// Separate component for price display
const PriceDisplay = ({ price, quantity }) => (
  <IntlProvider locale="en">
    <span className={styles.unitprice}>
      <span className={styles.span1}>Unit Price: </span>
      <span className={styles.span2}>
        <span className={styles.number}>
          <FormattedNumber value={price} style="currency" currency="USD" />
        </span>
      </span>
    </span>
    <span>
      <span className={styles.span1}>Quantity: </span>
      <span className={styles.span2}> {quantity}</span>
    </span>
  </IntlProvider>
);

PriceDisplay.propTypes = {
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
};

// Separate component for cart instructions
const CartInstructions = ({
  unpaidItems,
  selectedCars,
  totalAmount,
  totalSelectedPrice,
  onPayment,
}) => (
  <div className={styles.checkoutContainer}>
    <div className={styles.discuss}>
      <h2>Important Information</h2>
      <ul className={styles.instructionsList}>
        <li>
          Please review your selections carefully before proceeding with
          checkout
        </li>
        <li>
          Once payment process is initiated, it cannot be interrupted or
          cancelled
        </li>
        <li>
          Your feedback helps us improve - please complete the survey after
          purchase
        </li>
      </ul>
    </div>

    <div className={styles.starButtons}>
      {unpaidItems.length > 0 && (
        <div className={styles.pay_2}>
          <button className={styles.btvtotal}>
            Total: ${totalAmount.toFixed(2)}
          </button>
          <button
            onClick={() => onPayment(unpaidItems)}
            className={styles.btvpay_1}
          >
            Checkout All Items
          </button>
        </div>
      )}

      {selectedCars.length > 0 && (
        <div className={styles.pay_1}>
          <button className={styles.btv}>
            Selected Total: ${totalSelectedPrice.toFixed(2)}
          </button>
          <button
            onClick={() => onPayment(selectedCars)}
            className={styles.btvpayselected}
          >
            Checkout Selected Items
          </button>
        </div>
      )}
    </div>
  </div>
);

CartInstructions.propTypes = {
  unpaidItems: PropTypes.arrayOf(
    PropTypes.shape({
      car: PropTypes.shape({
        id: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      }).isRequired,
      quantity: PropTypes.number.isRequired,
      paid: PropTypes.bool,
    })
  ).isRequired,
  selectedCars: PropTypes.arrayOf(
    PropTypes.shape({
      car: PropTypes.shape({
        id: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      }).isRequired,
      quantity: PropTypes.number.isRequired,
      paid: PropTypes.bool,
    })
  ).isRequired,
  totalAmount: PropTypes.number.isRequired,
  totalSelectedPrice: PropTypes.number.isRequired,
  onPayment: PropTypes.func.isRequired,
};

function Orders() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [selectedCarIds, setSelectedCarIds] = useState(new Set());
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user?.id) {
      dispatch(clearCart());
      return;
    }

    const fetchOrders = async () => {
      try {
        const ordersData = await getOrdersApi(user.id);
        setOrders(ordersData);

        // Add unpaid items to cart
        const unpaidCars = ordersData.filter((order) => !order?.paid);
        unpaidCars.forEach((order) => {
          if (
            order?.car?.id &&
            !items.some((item) => item?.car?.id === order.car.id)
          ) {
            dispatch(addToCart(order));
          }
        });
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, [user, dispatch, items]);

  const handlePayment = (selectedCars) => {
    const itemsToSend = selectedCars
      .filter((car) => !car.paid)
      .map((car) => ({
        car: car.car,
        quantity: car.quantity,
        totalPrice: car.car.price * car.quantity,
      }));

    const totalAmount = itemsToSend.reduce(
      (total, item) => total + item.totalPrice,
      0
    );

    navigate("/payment", { state: { items: itemsToSend, totalAmount } });
  };

  const handleRemoveFromCart = async (car) => {
    try {
      await supabase
        .from("orders")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", car.id);

      dispatch(removeFromCart(car));
    } catch (error) {
      console.error("Error removing from cart:", error.message);
    }
  };

  const handleSelect = (carId) => {
    setSelectedCarIds((prev) => {
      const newSet = new Set(prev);
      newSet.has(carId) ? newSet.delete(carId) : newSet.add(carId);
      return newSet;
    });
  };

  const unpaidItems = items.filter((item) => !item.paid);
  if (unpaidItems.length === 0) {
    return <EmptyCart onNavigate={() => navigate("/dashboard")} />;
  }

  const selectedCars = unpaidItems.filter((item) =>
    selectedCarIds.has(item.car.id)
  );
  const totalAmount = unpaidItems.reduce(
    (total, item) => total + (item.car.price * item.quantity),
    0
  );
  const totalSelectedPrice = selectedCars.reduce(
    (total, item) => total + item.car.price * item.quantity,
    0
  );

  return (
    <>
      <CartHeader />
      <div className={styles.orders}>
        <div className={styles.wrapper}>
          {unpaidItems.map(({ car, quantity, paid }) => (
            <div
              key={car.id}
              className={`${styles.property} ${
                selectedCarIds.has(car.id) ? styles.selected : ""
              }`}
            >
              <div className={styles.part_1}>
                <div className={styles.part_2}>
                  <div
                    className={styles.part_3}
                    onClick={() => handleSelect(car.id)}
                  >
                    <img src={getImageUrl(car.image)} alt={car.name} />
                  </div>

                  <ProductDetails car={car} quantity={quantity} />

                  <div className={styles.buttonContainer}>
                    <div className={styles.button2}>
                      <button
                        onClick={() => navigate(`/products/${car.id}`)}
                        className={styles.backbutton}
                      >
                        View Details
                      </button>
                      <button
                        className={styles.removebutton}
                        onClick={() => handleRemoveFromCart(car)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.totaldescuss}>
          <CartInstructions
            unpaidItems={unpaidItems}
            selectedCars={selectedCars}
            totalAmount={totalAmount}
            totalSelectedPrice={totalSelectedPrice}
            onPayment={handlePayment}
          />
        </div>
      </div>
    </>
  );
}

export default Orders;
