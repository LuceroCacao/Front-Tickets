// --- helpers de persistencia ---
const LS_KEY = "tickets_data_v1";
const LS_ID = "tickets_next_id_v1";

function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}
function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// --- estado inicial (si no existe en localStorage, lo creamos) ---
let tickets = load(LS_KEY, [
  { id: 1, title: "No hay internet", description: "Sucede en CDD Cobán", priority: "high", status: "pending" },
  { id: 2, title: "Impresora sin tóner", description: "CDD Morales", priority: "medium", status: "in_progress" },
]);
let nextId = load(LS_ID, 3);

// asegúrate de guardar el estado inicial si es la primera vez
save(LS_KEY, tickets);
save(LS_ID, nextId);

// --- mock de autenticación ---
export const mockAuth = {
  async login(email, password) {
    localStorage.setItem("token", "mock-token");
    return { token: "mock-token" };
  },
  async me() {
    return { id: 1, name: "Lucero Cacao", email: "lucero@example.com" };
  },
  async logout() {
    localStorage.removeItem("token");
  },
};

// --- mock de tickets con persistencia ---
export const mockTickets = {
  async list(params = {}) {
    // filtros simples opcionales
    let data = [...tickets];
    if (params.status) data = data.filter(t => t.status === params.status);
    if (params.priority) data = data.filter(t => t.priority === params.priority);
    return data;
  },
  async get(id) {
    return tickets.find(t => t.id === Number(id));
  },
  async create(data) {
    const newTicket = { id: nextId++, status: "pending", priority: "medium", ...data };
    tickets.push(newTicket);
    save(LS_KEY, tickets);
    save(LS_ID, nextId);
    return newTicket;
  },
  async transition(id, to) {
    const t = tickets.find(x => x.id === Number(id));
    if (t) {
      t.status = to;
      save(LS_KEY, tickets);
    }
    return t;
  },
  // util dev: limpiar datos si lo necesitas
  async reset() {
    tickets = [];
    nextId = 1;
    save(LS_KEY, tickets);
    save(LS_ID, nextId);
  }
};
