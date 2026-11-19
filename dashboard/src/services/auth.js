
import { apiRequest } from "./api";

export async function loginUser(email, password) {
  const data = await apiRequest("/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (data.token) {
    localStorage.setItem("auth_token", data.token);
  }

  if (data.user) {
    localStorage.setItem("user_data", JSON.stringify(data.user));
  }

  return data;
}

export function logoutUser() {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("user_data");
}