import api from "../api/api";

export async function getOrderItemById(id) {
  const response = await api.get(`/order_items/${id}`);
  return response.data;
}

export async function createOrderItem(orderItem) {
  const token = localStorage.getItem("token");
  // console.log(token.replace(/"/g, ""));
  const response = await api.post("/order_items/", orderItem, {
    headers: {
      Authorization: `Bearer ${token.replace(/"/g, "")}`,
    },
  });
  console.log(response);
  return response;
}

export async function deleteOrderItem(id) {
  const response = await api.delete("/order_items/" + id);
  return response;
}

export async function getAllPaymentMethods() {
  const response = await api.get("/payment");
  return response.data;
}
