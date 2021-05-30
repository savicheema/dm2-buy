import React, { useState, useEffect } from "react";
import styles from "./form-input.module.css";

class FormInput extends React.Component {
  render() {
    let { isError, inputValue, isFocus } = this.state;
    console.log(" FormInput STATE", isError);
    const {
      type,
      placeholder,
      errorMessage,
      maxLength,
      isDisabled,
      inputType,
    } = this.props;

    const formInputClass =
      type === "full" ? styles.formInput : styles.halfInput;

    const inputClass = isFocus ? styles.focusInput : styles.inputClass;
    return (
      <div className={formInputClass}>
        {isError && <div className={styles.error}>{errorMessage}</div>}
        <div className={inputClass}>
          {this.props.children}
          <input
            className={styles.inputStyle}
            placeholder={placeholder}
            value={inputValue}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            maxLength={maxLength}
            disabled={isDisabled}
            type={inputType}
            onChange={this.onChange}
          />
        </div>
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
    this.setState({ isFocus: true, isError: false });
  };

  onBlur = () => {
    this.setState({ isFocus: false }, () => {
      let { onBlur } = this.props;
      let { inputValue } = this.state;

      if (!inputValue) {
        this.validate();
        return;
      }
      onBlur(inputValue);
    });
  };

  onChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  setValue = (value) => {
    this.setState({ inputValue: value }, () => {});
  };
}

export default FormInput;
