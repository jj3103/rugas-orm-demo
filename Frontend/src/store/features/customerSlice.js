import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {} from "../../services/api";

export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getCustomers();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addCustomer = createAsyncThunk(
  "customers/addCustomer",
  async (customerData, { rejectWithValue }) => {
    try {
      const response = await api.createCustomer(customerData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  customers: [],
  loading: false,
  error: null,
};

const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch customers";
        toast.error(state.error);
      })
      .addCase(addCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customers.push(action.payload);
        toast.success("Customer added successfully");
      })
      .addCase(addCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to add customer";
        toast.error(state.error);
      });
  },
});

export const { clearError } = customerSlice.actions;
export default customerSlice.reducer;
