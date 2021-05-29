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
        />
        <FormInput
          type="full"
          placeholder="Your Instagram"
          errorMessage="Need your instagram"
          ref={this.instagramInputRef}
        />
        <FormInput
          type="full"
          placeholder="Phone"
          errorMessage="Incorrect number"
          ref={this.phoneInputRef}
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
