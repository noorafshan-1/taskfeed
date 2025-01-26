import React, { createContext, useState, useContext } from 'react';

const FeedContext = createContext();

export const FeedProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  return (
    <FeedContext.Provider value={{ posts, setPosts }}>
      {children}
    </FeedContext.Provider>
  );
};

export const useFeed = () => useContext(FeedContext);
