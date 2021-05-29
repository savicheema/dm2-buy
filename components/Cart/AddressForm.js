import React from "react";
import styles from "./address-form.module.css";

import FormInput from "../utils/FormInput";

const AddressForm = () => (
  <div className={styles.addressForm}>
    <h2>🏠 Shipping Address</h2>
    <FormInput type="full" placeholder="Address with Landmark" />

    <div className={styles.addressGrid}>
      <FormInput type="half" placeholder="Pincode" />
      <FormInput type="half" placeholder="City" />
      <FormInput type="half" placeholder="State" />
      <FormInput type="half" value="India" placeholder="Country" />
    </div>
  </div>
);

export default AddressForm;
