import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "";
console.log(API_URL, "API_URL");

// Async thunk for submitting contact form
export const submitContactForm = createAsyncThunk(
  "contact/submit",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/v1/contacts/new`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Async thunk for fetching contact page content
export const fetchContactContent = createAsyncThunk(
  "contact/fetchContent",
  async (_, { rejectWithValue }) => {
    try {
      // You can create an API endpoint for page content
      const response = await axios.get(`${API_URL}/api/v1/contacts`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    formStatus: "idle", // idle, loading, succeeded, failed
    formData: null,
    error: null,
    content: {
      title: "Let's Work Together!",
      subtitle: "Contact Me",
      description:
        "I design and code beautifully simple things and I love what I do. Just simple like that!",
      contactInfo: [
        { icon: "📞", label: "Phone", value: "+01 123 654 8096" },
        { icon: "✉️", label: "Email", value: "mnishithareddy8765@gmail.com" },
        {
          icon: "📍",
          label: "Address",
          value: "Sr nagar, Hyderabad, Telangana, India",
        },
      ],
      services: [
        "Responsive Design",
        "CMS Development",
        "API Integration",
        "Website Redesign",
      ],
    },
    contentLoading: false,
    contentError: null,
  },
  reducers: {
    resetFormStatus: (state) => {
      state.formStatus = "idle";
      state.formData = null;
      state.error = null;
    },
    updateContactContent: (state, action) => {
      state.content = { ...state.content, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // Submit contact form cases
      .addCase(submitContactForm.pending, (state) => {
        state.formStatus = "loading";
        state.error = null;
      })
      .addCase(submitContactForm.fulfilled, (state, action) => {
        state.formStatus = "succeeded";
        state.formData = action.payload;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.formStatus = "failed";
        state.error = action.payload?.error || "Failed to submit form";
      })

      // Fetch contact content cases
      .addCase(fetchContactContent.pending, (state) => {
        state.contentLoading = true;
        state.contentError = null;
      })
      .addCase(fetchContactContent.fulfilled, (state, action) => {
        state.contentLoading = false;
        state.content = action.payload;
      })
      .addCase(fetchContactContent.rejected, (state, action) => {
        state.contentLoading = false;
        state.contentError = action.payload?.error || "Failed to load content";
      });
  },
});

export const { resetFormStatus, updateContactContent } = contactSlice.actions;
export default contactSlice.reducer;
