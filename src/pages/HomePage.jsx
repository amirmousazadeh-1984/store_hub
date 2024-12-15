import { useState } from "react";
import { useSelector } from "react-redux";
import {
  FaStar,
  FaRegStar,
  FaComments,
  FaTelegramPlane,
  FaStarHalfAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSendMessage } from "../features/chat/useChats";
import useSendRating from "../features/chat/useRating"; // هوک ارسال امتیاز
import styles from "./HomePage.module.css";

function HomePage() {
  const user = useSelector((state) => state.user.user); // دریافت اطلاعات کاربر از ریداکس
  const loading = useSelector((state) => state.user.loading); // دریافت وضعیت بارگذاری از ریداکس

  const [message, setMessage] = useState(""); // برای ذخیره پیام
  const [rating, setRating] = useState(0); // برای ذخیره امتیاز ستاره‌ها
  const [showChatBox, setShowChatBox] = useState(false); // برای نمایش چت باکس
  const [messages, setMessages] = useState([]); // ذخیره پیام‌ها

  const { mutate: sendMessage } = useSendMessage();
  const { mutate: sendRating } = useSendRating();

  // بررسی اینکه آیا کاربر وارد شده است یا خیر
  // if (!user || !user.id) {
  //   return <div>Please log in</div>;
  // }

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "User", text: message },
      ]);
      sendMessage({ userId: user.id, message });
      setMessage(""); // پاک کردن تکست باکس بعد از ارسال پیام
    }
  };

  const handleSendRating = () => {
    if (rating) {
      sendRating({ userId: user.id, rating });
      console.log("Rating submitted:", rating);
    }
  };

  const handleStarClick = (index) => {
    setRating(index + 1); // انتخاب ستاره‌ها
  };
  return (
    <main className={styles.homepage}>
      <section>
        <h1>The largest shopping mall and chain store</h1>
        <h2>
          “A shopping mall (or simply mall) is a large indoor shopping center,
          usually anchored by department stores. The term mall originally meant
          a pedestrian promenade with shops along it, but in the late 1960s, it
          began to be used as a generic term for the large enclosed shopping
          centers that were becoming increasingly commonplace.In the United
          Kingdom and other countries, shopping malls may be called shopping
          centres.The International Council of Shopping Centers, based in New
          York City, classifies two types of shopping centers as malls: regional
          malls and superregional malls.Even though malls mostly appeared in
          suburban areas in the U.S., some U.S. cities facilitated the
          construction of enclosed malls downtown as an effort to revive city
          centers and allow them to compete effectively with suburban malls. ”
        </h2>
        <Link to="/dashboard" className={styles.bhome}>
          Visit your shopping center
        </Link>
      </section>

      {user && (
        <div className={styles.chatBoxWrapper}>
          {/* آیکون چت */}
          <button
            className={styles.chatBoxButton}
            onClick={() => setShowChatBox((prev) => !prev)} // تغییر وضعیت چت باکس
          >
            {showChatBox ? <FaComments /> : <FaComments />}
          </button>

          {/* پنجره چت */}
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

                <div
                  className={styles.chatBoxSendButton}
                  onClick={handleSendMessage}
                >
                  <FaTelegramPlane className={styles.sendIcon} />{" "}
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
                  Submit your score
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
