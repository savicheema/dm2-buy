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
          ref={this.instagramInputRef}
        >
          <img
            src="/instagram.png"
            height="20px"
            width="20"
            alt="icon"
            className={styles.decoration}
          />
          <span className={styles.decoration}>@</span>
        </FormInput>
        <FormInput
          type="full"
          placeholder="Phone"
          errorMessage="Incorrect number"
          ref={this.phoneInputRef}
          maxLength={10}
          inputType="number"
        >
          <img
            src="/india.png"
            height="20px"
            width="20"
            alt="icon"
            className={styles.decoration}
          />
          <span className={styles.decoration}>+91</span>
        </FormInput>
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
  }

  componentDidMount() {}
  componentWillUnmount() {}

  validate = () => {
    this.nameInputRef.current.validate();
    this.instagramInputRef.current.validate();
    this.phoneInputRef.current.validate();
  };
}

export default PersonalForm;
