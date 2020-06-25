import axios from 'axios';

const _sendMsg = msg => {
  return axios.post(process.env.VUE_APP_CHAT_SERVER, {
    chatbot: process.env.VUE_APP_CHATBOT_NAME,
    message: msg,
  })
  .then(resp => resp.status === 200 ? resp.data : null)
  .catch(err => {
    throw err;
  });
}

export default {
  async sendMessage(msg) {
    const resp = await _sendMsg(msg);
    if (resp && resp.status === 'ok') {
      return resp.data;
    }
    return null;
  },
};
