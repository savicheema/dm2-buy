import React from "react";
import styles from "./address-form.module.css";

import FormInput from "../utils/FormInput";

class AddressForm extends React.Component {
  render() {
    let { isValid } = this.state;
    console.log(" AddressForm STATE", isValid);

    return (
      <div className={styles.addressForm}>
        <h2>🏠 Shipping Address</h2>
        <FormInput
          type="full"
          placeholder="Address with Landmark"
          errorMessage="Give us an address"
          ref={this.addressInputRef}
          maxLength={70}
        />

        <div className={styles.addressGrid}>
          <FormInput
            type="half"
            placeholder="Pincode"
            errorMessage="Invalid pin code"
            ref={this.pincodeInputRef}
          />
          <FormInput
            type="half"
            placeholder="City"
            errorMessage="City is needed"
            ref={this.cityInputRef}
          />
          <FormInput
            type="half"
            placeholder="State"
            errorMessage="State is needed"
            ref={this.stateInputRef}
          />
          <FormInput
            type="half"
            value="India"
            placeholder="Country"
            isDisabled={true}
          />
        </div>
      </div>
    );
  }

  constructor(props) {
    super(props);

    let isValid = false;

    this.state = { isValid };

    this.addressInputRef = React.createRef();
    this.pincodeInputRef = React.createRef();
    this.cityInputRef = React.createRef();
    this.stateInputRef = React.createRef();
  }

  componentDidMount() {}
  componentWillUnmount() {}

  validate = () => {
    this.addressInputRef.current.validate();
    this.pincodeInputRef.current.validate();
    this.cityInputRef.current.validate();
    this.stateInputRef.current.validate();
  };
}

export default AddressForm;
