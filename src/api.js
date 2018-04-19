import axios from "axios";

export default {
  user: {
    login: credentials =>
      axios.post("/api/v1/auth", { credentials }).then(res => res.data.user),
    signup: user =>
      axios.post('/api/v1/users', { user }).then(res => res.data.user)
  }
};
