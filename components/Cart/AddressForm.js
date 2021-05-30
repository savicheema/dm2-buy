import React from "react";
import styles from "./address-form.module.css";

import FormInput from "../utils/FormInput";

class AddressForm extends React.Component {
  render() {
    let { isValid, address } = this.state;
    console.log(" AddressForm STATE", isValid);

    return (
      <div className={styles.addressForm}>
        <h2 className={styles.shippingText}>
          <span className={styles.homeIcon}>🏠</span> Shipping Address
        </h2>
        <FormInput
          type="full"
          placeholder="Address with Landmark"
          errorMessage="Give us an address"
          ref={this.addressInputRef}
          maxLength={70}
          name
        />

        <div className={styles.addressGrid}>
          <FormInput
            type="half"
            placeholder="Pincode"
            errorMessage="Invalid pin code"
            ref={this.pincodeInputRef}
            onBlur={(pincode) => {
              this.fetchAddress(pincode);
            }}
          />
          <FormInput
            type="half"
            placeholder="City"
            errorMessage="City is needed"
            ref={this.cityInputRef}
            isDisabled={true}
          />
          <FormInput
            type="half"
            placeholder="State"
            errorMessage="State is needed"
            ref={this.stateInputRef}
            isDisabled={true}
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
    let address = null;

    this.state = { isValid, address };

    this.addressInputRef = React.createRef();
    this.pincodeInputRef = React.createRef();
    this.cityInputRef = React.createRef();
    this.stateInputRef = React.createRef();
  }

  componentDidMount() {}
  componentWillUnmount() {}

  validate = () => {
    const isAddressValid = this.addressInputRef.current.validate();
    const isPincodeValid = this.pincodeInputRef.current.validate();
    const isCityValid = this.cityInputRef.current.validate();
    const isStateValid = this.stateInputRef.current.validate();

    return isAddressValid && isPincodeValid && isCityValid && isStateValid;
  };

  fetchAddress = (pincode) => {
    fetch(`https://api.postalpincode.in/pincode/${pincode}`)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        if (!data) return;

        if (data[0].Status.toLowerCase().includes("error")) {
          this.pincodeInputRef.current.setValue("");
          this.pincodeInputRef.current.validate();
          return;
        }

        this.setState({ address: data[0].PostOffice[0] }, () => {
          let { address } = this.state;
          this.cityInputRef.current.setValue(address.District);
          this.stateInputRef.current.setValue(address.State);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  focus = () => {
    this.addressInputRef.current.focus();
  };
}

export default AddressForm;
