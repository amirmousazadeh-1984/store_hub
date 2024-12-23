import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./PaymentPage.module.css";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useProcessPayment } from "../features/payment/useProcessPayment";
import { FormattedNumber, IntlProvider } from "react-intl";

function PaymentPage() {
  const location = useLocation();
  const { items, totalAmount } = location.state || {
    items: [],
    totalAmount: 0,
  };
  const { processPayment, isProcessingPayment } = useProcessPayment();
  const navigate = useNavigate();

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const user = useSelector((state) => state.user.user);
  const { paymentStatus } = useSelector((state) => state.payment);

  const validateForm = () => {
    if (!items || items.length === 0) {
      setErrorMessage("No items to process payment for.");
      toast.error("No items to process payment for.");
      return false;
    }

    if (!user || !user.id) {
      setErrorMessage("No user information available.");
      toast.error("No user information available.");
      return false;
    }

    return true;
  };

  const handlePayment = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!validateForm()) return;

    const itemsToSend = JSON.parse(JSON.stringify(items));

    try {
      await processPayment({
        total: totalAmount,
        items: itemsToSend,
      });

      navigate("/purchased-products");
    } catch (error) {
      console.error("Error processing payment:", error);
      setErrorMessage("Payment failed: " + error.message);
    }
  };

  // Render order items
  const renderOrderItems = () => {
    return items.map((item) => (
      <div key={item.car.id} className={styles.allcarlist}>
        <p className={styles.productNmae}>
          {`${item.car.type}_name`}: {item.car.name}
        </p>
        <IntlProvider locale="en">
          <p className={styles.unitprice}>
            Unit Price:{" "}
            <span className={styles.number}>
              <FormattedNumber
                value={item.car.price}
                style="currency"
                currency="USD"
              />
            </span>
          </p>
          <p className={styles.quantity}>Quantity: {item.quantity}</p>
          <p className={styles.totalprice}>
            Total Paid Price:{" "}
            <span className={styles.number1}>
              <FormattedNumber
                value={(item.car.price * item.quantity).toFixed(2)}
                style="currency"
                currency="USD"
              />
            </span>
          </p>
        </IntlProvider>
        <br />
      </div>
    ));
  };

  // Payment form
  const renderPaymentForm = () => (
    <form onSubmit={handlePayment} className={styles.payment_form}>
      <div className={styles.btntotalpriceform}>
        <IntlProvider locale="en">
          <span className={styles.totalprice2}>
            Total Amount for Payment:
            <span className={styles.number3}>
              <FormattedNumber
                value={totalAmount}
                style="currency"
                currency="USD"
              />
            </span>
          </span>
        </IntlProvider>
      </div>
      <div className={styles.form_group}>
        <label>Card Number:</label>
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="Enter your 16-digit card number"
          maxLength={16}
          required
        />
      </div>
      <div className={styles.form_group}>
        <label>Expiry Date:</label>
        <input
          type="text"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          placeholder="MM/YY"
          maxLength={5}
          required
        />
      </div>
      <div className={styles.form_group}>
        <label>CVC:</label>
        <input
          type="text"
          value={cvc}
          onChange={(e) => setCvc(e.target.value)}
          placeholder="CVC"
          maxLength={3}
          required
        />
      </div>
      <div className={styles.form_group}>
        <label>Description: </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
      </div>
      <button
        type="submit"
        className={styles.pay_button}
        disabled={isProcessingPayment || paymentStatus === "processing"}
      >
        {isProcessingPayment ? "Processing..." : "Pay"}
      </button>
    </form>
  );

  return (
    <>
      <div className={styles.total}>
        <div className={styles.payment_container}>
          <div className={styles.items}>
            <h2>Items for Payment:</h2>
            {renderOrderItems()}{" "}
            <IntlProvider locale="en">
              <span className={styles.totalprice1}>
                Total Amount for Payment:
                <span className={styles.number3}>
                  <FormattedNumber
                    value={totalAmount}
                    style="currency"
                    currency="USD"
                  />
                </span>
              </span>
            </IntlProvider>
          </div>

          <div className={styles.formPayment}>
            {renderPaymentForm()}
            {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
          </div>

          {paymentStatus === "succeeded" && (
            <div className={styles.success_message}>
              <p>Payment successful!</p>
              <button
                className={styles.success_button}
                onClick={() => navigate("/purchased-products")}
              >
                Go to Purchased Products
              </button>
            </div>
          )}
        </div>
      </div>
      <div className={styles.instruction}>
        <h3>Instructions</h3>
        <p>
          - Since the payment operation will be carried out after selecting the
          payment button So please carefully check all the items you have
          selected in the list on the left as your shopping list.
        </p>
        <p>- Please do not provide your credit card information to others.</p>
        <p>- Please enter all your account information carefully.</p>
      </div>
    </>
  );
}

export default PaymentPage;
