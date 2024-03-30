export default function propsProvider(props) {
  const {
    contactList,
    searchQuery,
    onChangeSearch,
    pageName,
    onSwitchChatPage,
    onInitLoadMessage,
    onBackToHomePage,
    lstMessenger,
    chatroomList,
    chatroom,
    chatSegment,
    userDetails,
    navigation,
    currentChatMessage,
    setCurrentChatMessage,
    handleAddNewMessage,
    t,
    calcMessageArrival,
    filterPositionMessages,
    onLoadMoreMessage
  } = props;
  return {
    pageName,
    listMessageProps: {
      contactList,
      searchQuery,
      onChangeSearch,
      onSwitchChatPage,
      onInitLoadMessage,
      lstMessenger,
      chatroomList,
      t,
      calcMessageArrival,
    },
    messageProps: {
      currentChatMessage,
      setCurrentChatMessage,
      onBackToHomePage,
      chatroom,
      chatSegment,
      userDetails,
      navigation,
      handleAddNewMessage,
      filterPositionMessages,
      onLoadMoreMessage
    },
  };
}
