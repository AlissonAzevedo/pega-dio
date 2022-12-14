import api from "../api/api";

export async function getAllKeys() {
  const response = await api.get('/chaves');
  return response.data;
}

export async function getAllReservation() {
  const response = await api.get('/reservas');
  return response.data;
}

export async function createReservation(data) {
  const response = await api.post("/reservas/", data);
  return response;
}

export async function getAllPeoples(){
  const response = await api.get('/pessoas');
  return response.data
}

export async function updateReservation(id, data) {
  const response = await api.patch(`/reservas/${id}/`, data);
  return response;
}

export async function updateKey(id, data){
  const response = await api.patch(`/chaves/${id}/`, data);
}