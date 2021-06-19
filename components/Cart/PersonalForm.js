import React from "react";
import styles from "./personal-form.module.css";

import FormInput from "../utils/FormInput";

class PersonalForm extends React.Component {
  render() {
    let { isValid } = this.state;
    console.log(" PersonalForm STATE", isValid);

    return (
      <div className={styles.personalForm}>
        <FormInput
          type="full"
          placeholder="Full Name"
          errorMessage="We need your name"
          ref={this.nameInputRef}
          maxLength={50}
        />
        <FormInput
          type="full"
          placeholder="Your Instagram"
          errorMessage="Need your instagram"
          invalidMessage="Instagram handle doesn't seem correct"
          ref={this.instagramInputRef}
          regex={
            /([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)/
          }
        >
          {/* <img
            src="/instagram.png"
            height="20px"
            width="20"
            alt="icon"
            className={styles.imageDecoration}
          /> */}
          <span className={styles.decoration}>@</span>
        </FormInput>
        <FormInput
          type="full"
          placeholder="Phone"
          errorMessage="A number is needed"
          invalidMessage="Incorrect number"
          ref={this.phoneInputRef}
          maxLength={10}
          inputType="number"
          regex={/^[789]\d{9}$/}
        >
          <img
            src="/india.png"
            height="16px"
            width="16px"
            alt="icon"
            className={styles.imageDecoration}
          />
          <span className={styles.numberCode}>+91</span>
        </FormInput>
        <FormInput
          type="full"
          placeholder="Email ID"
          errorMessage="Tell us your email"
          ref={this.emailInputRef}
          invalidMessage="Incorrect email"
          regex={
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
          }
        />
      </div>
    );
  }

  constructor(props) {
    super(props);

    let isValid = false;

    this.state = { isValid };

    this.nameInputRef = React.createRef();
    this.instagramInputRef = React.createRef();
    this.phoneInputRef = React.createRef();
    this.emailInputRef = React.createRef();
  }

  componentDidMount() {}
  componentWillUnmount() {}

  validate = () => {
    const isNameValid = this.nameInputRef.current.validate();
    const isInstagramValid = this.instagramInputRef.current.validate();
    const isPhoneValid = this.phoneInputRef.current.validate();
    const isEmailValid = this.emailInputRef.current.validate();
    return isNameValid && isInstagramValid && isPhoneValid && isEmailValid;
  };

  focus = () => {
    this.nameInputRef.current.focus();
  };
}

export default PersonalForm;
