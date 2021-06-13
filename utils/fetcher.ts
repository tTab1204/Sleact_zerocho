import axios from 'axios';

const fetcher = (url: string) =>
  axios.get(url, { withCredentials: true }).then((response) => response.data);
// withCredentials -> get요청에서는 2번째 자리, post요청에서는 3번째 자리에 넣어야 함.
// withCredentials 안 넣어주면 쿠키가 없을 것이다!
export default fetcher;
