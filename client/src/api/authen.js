import ENV from "../env.json";
const API = ENV.API;

const login = async ({ telOrEmail, password }) => {
  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ telOrEmail, password }),
  });
  const { body } = await res.json();
  return { status: res.status, body };
};

export { login };
