import React from "react";
import styles from "./personal-form.module.css";

import FormInput from "../utils/FormInput";

const PersonalForm = () => (
  <div className={styles.personalForm}>
    <FormInput type="full" placeholder="Full Name" />
    <FormInput type="full" placeholder="Your Instagram" />
    <FormInput type="full" placeholder="Phone" />
  </div>
);

export default PersonalForm;
