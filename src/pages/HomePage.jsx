import { useState } from "react";
import { useSelector } from "react-redux";
import {
  FaStar,
  FaRegStar,
  FaComments,
  FaTelegramPlane,
  FaShoppingBag,
  FaPercent,
  FaTruck,
  FaHeadset
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSendMessage } from "../features/chat/useChats";
import useSendRating from "../features/chat/useRating";
import styles from "./HomePage.module.css";

function HomePage() {
  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.user.loading);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [showChatBox, setShowChatBox] = useState(false);
  const [messages, setMessages] = useState([]);

  const { mutate: sendMessage } = useSendMessage();
  const { mutate: sendRating } = useSendRating();

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages((prevMessages) => [...prevMessages, { sender: "User", text: message }]);
      sendMessage({ userId: user.id, message });
      setMessage("");
    }
  };

  const handleSendRating = () => {
    if (rating) {
      sendRating({ userId: user.id, rating });
    }
  };

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const features = [
    {
      icon: <FaShoppingBag />,
      title: "Wide Selection",
      description: "Discover thousands of products from top brands"
    },
    {
      icon: <FaPercent />,
      title: "Best Deals",
      description: "Enjoy exclusive discounts and special offers"
    },
    {
      icon: <FaTruck />,
      title: "Fast Delivery",
      description: "Quick and reliable shipping to your doorstep"
    },
  ];

  return (
    <main className={styles.homepage}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Welcome to StoreHub</h1>
          <p>Your One-Stop Destination for Smart Shopping</p>
          <Link to="/dashboard" className={styles.ctaButton}>
            Start Shopping Now
          </Link>
        </div>
      </div>

      <section className={styles.features}>
        {features.map((feature, index) => (
          <div key={index} className={styles.featureCard}>
            <div className={styles.featureIcon}>{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </section>

      <section className={styles.categories}>
        <h2>Popular Categories</h2>
        <div className={styles.categoryGrid}>
          <div 
            className={styles.categoryCard} 
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3')" 
            }}
          >
            <h3>Electronics</h3>
          </div>
          <div 
            className={styles.categoryCard} 
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3')" 
            }}
          >
            <h3>Automobile</h3>
          </div>
          <div 
            className={styles.categoryCard} 
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3')" 
            }}
          >
            <h3>Home & Living</h3>
          </div>
          <div 
            className={styles.categoryCard} 
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3')" 
            }}
          >
            <h3>Sports & Fitness</h3>
          </div>
          <div 
            className={styles.categoryCard} 
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3')" 
            }}
          >
            <h3>Books & Media</h3>
          </div>
        </div>
      </section>

      {user && (
        <div className={styles.chatBoxWrapper}>
          <button
            className={styles.chatBoxButton}
            onClick={() => setShowChatBox((prev) => !prev)}
          >
            {showChatBox ? <FaComments /> : <FaComments />}
          </button>

          {showChatBox && (
            <div className={styles.chatBox}>
              <div className={styles.chatBoxMessageList}>
                {messages.map((message, index) => (
                  <div key={index} className={styles.chatBoxMessage}>
                    <strong>{message.sender}:</strong> {message.text}
                  </div>
                ))}
              </div>

              <div className={styles.chatInputWrapper}>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className={styles.chatBoxInput}
                />
                <div className={styles.chatBoxSendButton} onClick={handleSendMessage}>
                  <FaTelegramPlane className={styles.sendIcon} />
                </div>
              </div>

              <div className={styles.chatBoxStarRating}>
                <div className={styles.star}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {[...Array(5)].map((_, index) => (
                      <span
                        key={index}
                        onClick={() => handleStarClick(index)}
                        className={index < rating ? "selected" : ""}
                      >
                        {index < rating ? <FaStar /> : <FaRegStar />}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleSendRating}
                  className={styles.chatBoxSubmitButtonRating}
                >
                  Submit Rating
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
}

export default HomePage;
