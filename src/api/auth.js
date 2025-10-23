import http from "./http";
import { mockAuth } from "../mocks/mockApi";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export const login = (email, password) =>
  USE_MOCK ? mockAuth.login(email, password) : http.post("/api/login", { email, password }).then(r => r.data);

export const me = () =>
  USE_MOCK ? mockAuth.me() : http.get("/api/user").then(r => r.data);

export const logout = () =>
  USE_MOCK ? mockAuth.logout() : http.post("/api/logout").then(r => r.data);
