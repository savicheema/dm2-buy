import React, { useState, useEffect } from "react";
import styles from "./form-input.module.css";

class FormInput extends React.Component {
  render() {
    let { isError, inputValue, isFocus, isInvalid } = this.state;
    console.log(" FormInput STATE", isError);
    const {
      type,
      placeholder,
      errorMessage,
      maxLength,
      isDisabled,
      inputType,
      invalidMessage,
    } = this.props;

    const formInputClass =
      type === "full" ? styles.formInput : styles.halfInput;

    const inputClass = isFocus ? styles.focusInput : styles.inputClass;
    return (
      <div className={formInputClass}>
        {isError && <div className={styles.error}>{errorMessage}</div>}
        {isInvalid && <div className={styles.error}>{invalidMessage}</div>}
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
            ref={this.inputRef}
          />
        </div>
      </div>
    );
  }

  constructor(props) {
    super(props);

    let isError = false;
    let isFocus = false;
    let isInvalid = false;

    this.state = { isError, isFocus, isInvalid };

    this.inputRef = React.createRef();
  }

  componentDidMount() {
    let { value } = this.props;

    this.setState({ inputValue: value });
  }
  componentWillUnmount() {}

  validate = () => {
    let { inputValue } = this.state;
    let { regex } = this.props;

    if (!regex && inputValue) return true;
    else if (inputValue && regex && regex.test(inputValue)) {
      return true;
    } else if (inputValue && regex && !regex.test(inputValue)) {
      this.setState({ isInvalid: true });
    } else {
      this.setState({ isError: true });
    }
  };

  onFocus = () => {
    this.setState({ isFocus: true, isError: false, isInvalid: false });
  };

  onBlur = () => {
    this.setState({ isFocus: false }, () => {
      let { onBlur } = this.props;
      let { inputValue } = this.state;

      if (!inputValue) {
        this.validate();
        return;
      }

      if (typeof onBlur !== "function") return;
      onBlur(inputValue);
    });
  };

  onChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  setValue = (value) => {
    this.setState({ inputValue: value }, () => {});
  };

  focus = () => {
    this.inputRef.current.focus();
  };
}

export default FormInput;
