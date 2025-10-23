import http from "./http";
import { mockTickets } from "../mocks/mockApi";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

// Listar todos los tickets
export const listTickets = (params = {}) =>
  USE_MOCK ? mockTickets.list(params) : http.get("/api/tickets", { params }).then(r => r.data);

// Obtener un ticket específico
export const getTicket = (id) =>
  USE_MOCK ? mockTickets.get(id) : http.get(`/api/tickets/${id}`).then(r => r.data);

// Crear un nuevo ticket
export const createTicket = (data) =>
  USE_MOCK ? mockTickets.create(data) : http.post("/api/tickets", data).then(r => r.data);

// Cambiar estado del ticket
export const transitionTicket = (id, to) =>
  USE_MOCK ? mockTickets.transition(id, to) : http.post(`/api/tickets/${id}/transition`, { to_status: to }).then(r => r.data);
