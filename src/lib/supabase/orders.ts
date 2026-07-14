"use client";

import { createClient } from "./client";

export type OrderRow = {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  governorate: string;
  city: string;
  address: string;
  landmark: string;
  shipping_fee: number;
  discount: number;
  subtotal: number;
  total: number;
  payment_method: string;
  status: "new" | "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  notes: string;
  created_at: string;
  updated_at: string;
};

export type OrderItemRow = {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  product_price: number;
  quantity: number;
};

export async function createOrder(order: {
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  governorate: string;
  city: string;
  address: string;
  landmark?: string;
  shipping_fee: number;
  discount?: number;
  subtotal: number;
  total: number;
  payment_method?: string;
  notes?: string;
  items: { product_id?: string; product_name: string; product_price: number; quantity: number }[];
}) {
  const supabase = createClient();

  const { data: orderData, error: orderError } = await supabase
    .from("orders")
    .insert({
      customer_name: order.customer_name,
      customer_phone: order.customer_phone,
      customer_email: order.customer_email || "",
      governorate: order.governorate,
      city: order.city,
      address: order.address,
      landmark: order.landmark || "",
      shipping_fee: order.shipping_fee,
      discount: order.discount || 0,
      subtotal: order.subtotal,
      total: order.total,
      payment_method: order.payment_method || "cod",
      notes: order.notes || "",
    })
    .select()
    .single();

  if (orderError) throw orderError;

  const items = order.items.map((item) => ({
    order_id: orderData.id,
    product_id: item.product_id || null,
    product_name: item.product_name,
    product_price: item.product_price,
    quantity: item.quantity,
  }));

  const { error: itemsError } = await supabase.from("order_items").insert(items);
  if (itemsError) throw itemsError;

  for (const item of order.items) {
    if (item.product_id) {
      const { data: prod } = await supabase.from("products").select("stock").eq("id", item.product_id).single();
      if (prod) {
        await supabase.from("products").update({ stock: Math.max(0, prod.stock - item.quantity) }).eq("id", item.product_id);
      }
    }
  }

  return orderData as OrderRow;
}

export async function getOrders() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as OrderRow[];
}

export async function getOrderById(id: string) {
  const supabase = createClient();
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (orderError) throw orderError;

  const { data: items, error: itemsError } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", id);

  if (itemsError) throw itemsError;

  return { order: order as OrderRow, items: items as OrderItemRow[] };
}

export async function updateOrderStatus(id: string, status: OrderRow["status"]) {
  const supabase = createClient();
  const { data, error } = await supabase.from("orders").update({ status }).eq("id", id).select().single();
  if (error) throw error;
  return data as OrderRow;
}

export async function getOrdersStats() {
  const supabase = createClient();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { data: allOrders, error } = await supabase.from("orders").select("*");
  if (error) throw error;

  const orders = allOrders as OrderRow[];
  const todayOrders = orders.filter((o) => new Date(o.created_at) >= today);
  const todayRevenue = todayOrders.reduce((s, o) => s + o.total, 0);

  return {
    totalOrders: orders.length,
    todayOrders: todayOrders.length,
    todayRevenue,
    totalRevenue: orders.reduce((s, o) => s + o.total, 0),
    pendingOrders: orders.filter((o) => o.status === "new" || o.status === "processing").length,
  };
}
