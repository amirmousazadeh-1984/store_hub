import React, { useState } from "react";
import PropTypes from "prop-types"; // اضافه کردن PropTypes
import { useMutation } from "@tanstack/react-query";
import supabase from "../../services/supabase";

const sendMessageToSupabase = async ({ userId, message }) => {
  const { data, error } = await supabase
    .from("chats") // جدول 'chats' به جای 'messages'
    .insert([{ user_id: userId, message }]); // فرض بر این است که فیلدها user_id و message در جدول 'chats' موجود هستند

  if (error) throw new Error(error.message);
  return data;
};

const SendMessageComponent = ({ userId }) => {
  const [message, setMessage] = useState("");
  const mutation = useMutation({
    mutationFn: sendMessageToSupabase,
    onSuccess: () => {
      console.log("Message sent successfully!");
      setMessage(""); // پیام را پس از ارسال پاک می‌کنیم
    },
    onError: (error) => {
      console.error("Error sending message:", error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      mutation.mutate({ userId, message }); // ارسال پیام به Supabase
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)} // مدیریت ورودی پیام
        placeholder="Type your message..."
        disabled={mutation.isLoading} // غیرفعال کردن دکمه ارسال در حین بارگذاری
      />
      <button type="submit" disabled={mutation.isLoading}>
        Send
      </button>
    </form>
  );
};

// تعریف نوع داده‌های ورودی برای userId
SendMessageComponent.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default SendMessageComponent;
