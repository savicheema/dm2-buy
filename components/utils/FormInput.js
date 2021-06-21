import React, { useState, useEffect } from "react";
import styles from "./form-input.module.css";

import InputLoader from "./InputLoader";

class FormInput extends React.Component {
  render() {
    let { isError, inputValue, isFocus, isInvalid, isLoading } = this.state;
    console.log(" FormInput STATE", isError);
    const {
      type,
      placeholder,
      errorMessage,
      maxLength,
      isDisabled,
      inputType,
      invalidMessage,
      userInterface,
      onKeyDown,
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
          {userInterface === "loaded" && isLoading && <InputLoader />}
          {!isLoading && (
            <input
              className={styles.inputStyle}
              placeholder={placeholder}
              value={inputValue}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              maxLength={maxLength}
              disabled={userInterface === "loaded" || isDisabled}
              type={inputType}
              onChange={this.onChange}
              ref={this.inputRef}
              onKeyDown={onKeyDown}
            />
          )}
        </div>
      </div>
    );
  }

  constructor(props) {
    super(props);

    let isError = false;
    let isFocus = false;
    let isInvalid = false;
    let isLoading = false;

    this.state = { isError, isFocus, isInvalid, isLoading };

    this.inputRef = React.createRef();
  }

  componentDidMount() {
    let { value } = this.props;

    this.setState({ inputValue: value });
  }
  componentWillUnmount() {}

  validate = () => {
    let { inputValue, isLoading } = this.state;
    let { regex } = this.props;

    if (isLoading) this.setState({ isLoading: false });

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

      // if (!inputValue) {
      //   this.validate();
      //   return;
      // }

      if (typeof onBlur !== "function") return;
      onBlur(inputValue);
    });
  };

  onChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  setValue = (value) => {
    this.setState({ isLoading: false }, () => {
      this.setState({ inputValue: value });
    });
  };

  focus = () => {
    this.inputRef.current.focus();
  };

  setLoader = (isLoading) => {
    this.setState({ isLoading }, () => {
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 5200);
    });
  };
}

export default FormInput;
