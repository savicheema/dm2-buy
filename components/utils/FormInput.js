import React, { useState, useEffect } from "react";
import styles from "./form-input.module.css";

class FormInput extends React.Component {
  render() {
    let { isError, inputValue } = this.state;
    console.log(" FormInput STATE", isError);
    const { type, placeholder, errorMessage } = this.props;

    const formInputClass =
      type === "full" ? styles.formInput : styles.halfInput;
    return (
      <div className={formInputClass}>
        {isError && <div className={styles.error}>{errorMessage}</div>}
        <input
          className={styles.inputClass}
          placeholder={placeholder}
          value={inputValue}
        />
      </div>
    );
  }

  constructor(props) {
    super(props);

    let isError = false;

    this.state = { isError };
  }

  componentDidMount() {
    let { value } = this.props;
    this.setState({ inputValue: value });
  }
  componentWillUnmount() {}

  validate = () => {
    let { inputValue } = this.state;

    if (inputValue) return;

    this.setState({ isError: true });
  };
}

export default FormInput;
