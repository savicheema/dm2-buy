import React, { useEffect } from "react";
import styles from "./product-custom-fields.module.css";
import FormInput from "./utils/FormInput";

export default function ProductCustomFields({ product, selectedCustomAttributes=[] }) {
  const { customAttributes } = product;
  useEffect(() => {
    if(selectedCustomAttributes.length) {
      customAttributes?.map((attribute, index) => {
        attribute.ref.current.state.inputValue = selectedCustomAttributes[index]?.value || '';
      })
    }
  }, [selectedCustomAttributes]);
  return (
    <div className={styles.customFieldsGrid}>
      {customAttributes.map((attribute, index) =>
        attribute?.fields?.Required === "YES" ? (
          <FormInput
            key={attribute?.fields?.Name}
            initialValue={selectedCustomAttributes[index]?.value || ''}
            ref={attribute?.ref}
            saveInLocalStorage={true}
            inputType="text"
            type="half"
            placeholder={attribute?.fields?.Name}
            regex={/^(?!\s*$).+/}
          />
        ) : (
          <FormInput
            key={attribute?.fields?.Name}
            initialValue={selectedCustomAttributes[index]?.value || ''}
            ref={attribute?.ref}
            saveInLocalStorage={true}
            inputType="text"
            type="half"
            placeholder={attribute?.fields?.Name}
            // errorMessage={`${attribute?.fields?.Name} can't be blank`}
          />
        )
      )}
    </div>
  );
}
