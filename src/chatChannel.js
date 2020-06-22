import axios from 'axios';
import config from '@/server.config.js';

const _sendMsg = msg => {
  return axios.post(config.target.url, {
    chatbot: config.target.chatbot,
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
