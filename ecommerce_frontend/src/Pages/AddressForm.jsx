import { useState } from "react";
import api from "../api/axiosConfig";

function AddressForm({ userId, onAddressSaved }) {
  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    houseNo: "",
    street: "",
    city: "",
    state: "",
    pincode: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveAddress = async (e) => {
    e.preventDefault();
    const res = await api.post("/addresses", {
      ...form,
      userId
    });
    onAddressSaved(res.data);
    setForm({
      fullName: "",
      phoneNumber: "",
      houseNo: "",
      street: "",
      city: "",
      state: "",
      pincode: ""
    });
  };

  return (
    <form onSubmit={saveAddress}>
      <input name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} />
      <input name="phoneNumber" placeholder="Phone Number" value={form.phoneNumber} onChange={handleChange} />
      <input name="houseNo" placeholder="House No" value={form.houseNo} onChange={handleChange} />
      <input name="street" placeholder="Street" value={form.street} onChange={handleChange} />
      <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
      <input name="state" placeholder="State" value={form.state} onChange={handleChange} />
      <input name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} />
      <button type="submit">Save Address</button>
    </form>
  );
}

export default AddressForm;