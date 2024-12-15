import React, { useEffect } from "react";
import useChats from "./useChats";
import PropTypes from "prop-types";

const ChatListComponent = ({ userId }) => {
  const { data, error, isLoading } = useChats(userId); // استفاده از hook `useChats`

  useEffect(() => {
    if (userId) {
      console.log(`Displaying chats for userId: ${userId}`);
    }
  }, [userId]);

  if (isLoading) {
    return <div>Loading chats...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Chats</h2>
      <ul>
        {data?.map((chat) => (
          <li key={chat.id}>{chat.message}</li> // فرض کنید `chat.message` حاوی پیام است
        ))}
      </ul>
    </div>
  );
};

// تعریف نوع داده‌های ورودی برای userId
ChatListComponent.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default ChatListComponent;
