import React from "react";
import styles from "./product-custom-fields.module.css";
import FormInput from "./utils/FormInput";

export default function ProductCustomFields({ product }) {
  const { customAttributes } = product;
  return (
    <div className={styles.customFieldsGrid}>
      {customAttributes.map((attribute) =>
        attribute?.fields?.Required === "YES" ? (
          <FormInput
            key={attribute?.fields?.Name}
            ref={attribute?.ref}
            saveInLocalStorage={true}
            type="half"
            placeholder={attribute?.fields?.Name}
            errorMessage={`${attribute?.fields?.Name} can't be blank`}
            regex={/^(?!\s*$).+/}
          />
        ) : (
          <FormInput
            key={attribute?.fields?.Name}
            ref={attribute?.ref}
            saveInLocalStorage={true}
            type="half"
            placeholder={attribute?.fields?.Name}
            errorMessage={`${attribute?.fields?.Name} can't be blank`}
          />
        )
      )}
    </div>
  );
}
