import axiosClient from '../axios';
export default {
  requestGetAllMessage: () => axiosClient.get('chat'),
  requestGetChatroom: () => axiosClient.get('chatroom'),
  requestGetMessageByChatroomId: ({id,Page, PageSize }) =>
    axiosClient.get(`chat/getAllMessenger/${id}?Page=${Page}&PageSize=${PageSize}`),
  requestCreateChatroom: data => {
    const {payload} = data;
    return axiosClient.post(`chatroom`, payload);
  },
  requestSendMessage: data => {
    const {payload} = data;
    return axiosClient.post(`chat`, payload);
  },
  requestUpdateLastMessage: data => {
    const {chatroom_id, message} = data;
    return axiosClient.put(
      `/chatroom/lastMessage/${chatroom_id}?lastMessage=${message}`,
    );
  },
};
