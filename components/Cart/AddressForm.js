import React from "react";
import debouncePromise from 'awesome-debounce-promise';
import styles from "./address-form.module.css";

import FormInput from "../utils/FormInput";

class AddressForm extends React.Component {
  render() {
    let { isValid } = this.state;
    console.log(" AddressForm STATE", isValid);

    return (
      <div className={styles.addressForm}>
        <h2 className={styles.shippingText}>
          <span className={styles.homeIcon}>🏠</span> Shipping Address
        </h2>
        <FormInput
          saveInLocalStorage={true}
          textArea
          name="address_line_1"
          type="full"
          placeholder="Address with Landmark"
          errorMessage="Give us an address"
          ref={this.addressInputRef}
          maxLength={70}
        />

        <div className={styles.addressGrid}>
          <FormInput
            saveInLocalStorage={true}
            name="pincode"
            type="half"
            isError={this.state.isError}
            placeholder="Pincode"
            errorMessage="Invalid pin code"
            ref={this.pincodeInputRef}
            onKeyDown={() => {
              this.setAddressLoader(true);
            }}
            inputType="number"
            regex={/^[0123456789]{6}$/}
            onChange={async (pincode) => {
              this.searchPincode(pincode);
            }}
          />
          <FormInput
            saveInLocalStorage={true}
            name="city"
            type="half"
            placeholder="City"
            errorMessage="City is needed"
            ref={this.cityInputRef}
            userInterface="loaded"
          />
          <FormInput
            saveInLocalStorage={true}
            name="state"
            type="half"
            placeholder="State"
            errorMessage="State is needed"
            ref={this.stateInputRef}
            userInterface="loaded"
          />
          <FormInput
            name="country"
            type="half"
            value="India"
            placeholder="Country"
            userInterface="loaded"
          />
        </div>
      </div>
    );
  }

  constructor(props) {
    super(props);

    let isValid = false;
    let address = null;
    let isError = false;

    this.state = { isValid, address, isError };

    this.addressInputRef = React.createRef();
    this.pincodeInputRef = React.createRef();
    this.cityInputRef = React.createRef();
    this.stateInputRef = React.createRef();
    this.fetchAddressDebounced = debouncePromise(this.fetchAddress, 500);
  }

  componentDidMount() {
    this.cityInputRef.current.setValue(window.localStorage.getItem("city"));
    this.stateInputRef.current.setValue(window.localStorage.getItem("state"));
  }
  componentWillUnmount() {}

  setAddressLoader = (isLoading) => {
    this.cityInputRef.current.setLoader(isLoading);
    this.stateInputRef.current.setLoader(isLoading);
  };
  searchPincode = async (pincode) => {
    await this.fetchAddressDebounced(pincode);
  }
  getValues = () => {
    return {
      complete_address: this.addressInputRef.current.state.inputValue,
      pincode: this.pincodeInputRef.current.state.inputValue,
      city: this.cityInputRef.current.state.inputValue,
      state: this.stateInputRef.current.state.inputValue,
    };
  };

  validate = async () => {
    const allValidations = [
      this.addressInputRef.current,
      this.pincodeInputRef.current,
      this.cityInputRef.current,
      this.stateInputRef.current,
    ];

    let isValid = true;
    let isFocusAble = true;

    for (let i = 0; i < allValidations.length; i++) {
      const isInputValid = await allValidations[i].validate(isFocusAble);

      isValid = isInputValid && isValid;
      if (!isValid) isFocusAble = false;
    }

    return isValid;
  };

  fetchAddress = async (pincode) => {
    window.localStorage.setItem("city", "");
    window.localStorage.setItem("state", "");
    this.stateInputRef.current.setValue("");
    this.cityInputRef.current.setValue("");
    const validated = await this.pincodeInputRef.current.validate();
    if(!validated) {
      this.setState({ isError: true });
      return;
    }
    this.setAddressLoader(true);
    if (pincode.trim() === "") {
      this.setState({ isError: false });
      this.setAddressLoader(false);
      return;
    }
    const url = new URL(
      `${window.location.protocol}//${window.location.host}/api/pincode?pincode=${pincode}`
    );
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (!data) return;
        if (data.hasOwnProperty("error")) {
          this.setState({ isError: true });
          window.localStorage.setItem("city", "");
          window.localStorage.setItem("state", "");
          this.stateInputRef.current.setValue("");
          this.cityInputRef.current.setValue("");
          return;
        }
        this.setState({ address: data, isError: false }, () => {
          let { address } = this.state;
          this.cityInputRef.current.setValue(address.city);
          this.stateInputRef.current.setValue(address.state);

          window.localStorage.setItem("city", address.city);
          window.localStorage.setItem("state", address.state);
        });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        this.setAddressLoader(false);
      });
  };

  focus = () => {
    this.addressInputRef.current.focus();
  };
}

export default AddressForm;
