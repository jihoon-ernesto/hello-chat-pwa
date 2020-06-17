import axios from 'axios';

// TODO: treat target url and chatbot properly.
const target = {
  url: 'fake-url',
  chatbot: 'fake-chatbot',
};

const _sendMsg = msg => {
  return axios.post(target.url, {
    chatbot: target.chatbot,
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
