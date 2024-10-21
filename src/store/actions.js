import { createAsyncThunk } from "@reduxjs/toolkit";

// Ejemplo de thunk para obtener productos desde una API
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("/api/products");
    const data = await response.json();
    return data;
  }
);
