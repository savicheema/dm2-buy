import React, { useState, useEffect } from "react";
import styles from "./form-input.module.css";

class FormInput extends React.Component {
  render() {
    let { isError, inputValue, isFocus } = this.state;
    console.log(" FormInput STATE", isError);
    const { type, placeholder, errorMessage, maxLength } = this.props;

    const formInputClass =
      type === "full" ? styles.formInput : styles.halfInput;

    const inputClass = isFocus ? styles.focusInput : styles.inputClass;
    return (
      <div className={formInputClass}>
        {isError && <div className={styles.error}>{errorMessage}</div>}
        <input
          className={inputClass}
          placeholder={placeholder}
          value={inputValue}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          maxLength={maxLength}
        />
      </div>
    );
  }

  constructor(props) {
    super(props);

    let isError = false;
    let isFocus = false;

    this.state = { isError, isFocus };
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

  onFocus = () => {
    this.setState({ isFocus: true });
  };

  onBlur = () => {
    this.setState({ isFocus: false });
  };
}

export default FormInput;
