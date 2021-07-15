import React, { useState, useEffect } from "react";
import styles from "./form-input.module.css";

import InputLoader from "./InputLoader";

class FormInput extends React.Component {
  render() {
    let { isError, inputValue, isFocus, isInvalid, isLoading } = this.state;
    console.log(" FormInput STATE", isError, isInvalid);
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
      textArea,
      name,
      saveInLocalStorage,
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
          {!isLoading &&
            (textArea ? (
              <textarea
                name={name}
                autoComplete="on"
                className={styles.inputStyle}
                placeholder={placeholder}
                value={inputValue}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                maxLength={maxLength}
                disabled={userInterface === "loaded" || isDisabled}
                onChange={this.onChange}
                ref={this.inputRef}
                onKeyDown={onKeyDown}
              />
            ) : (
              <input
                name={name}
                autoComplete="on"
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
            ))}
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
    let { value, name } = this.props;
    let localValue = "";
    if (name) {
      localValue = window.localStorage.getItem(name);
    }
    this.setState({ inputValue: value || localValue || "" });
  }
  componentWillUnmount() {}

  validate = (isFocusAble) => {
    let { inputValue, isLoading } = this.state;
    let { regex } = this.props;

    if (isLoading) this.setState({ isLoading: false });

    return new Promise((resolve) => {
      const { isValid, type, isInvalid, isError } = this.validateMethod({
        regex,
        inputValue,
      });
      if (isValid) {
        if (isError) {
          this.setState({ isError: false }, () => {
            resolve(true);
          });
        }
        if (isInvalid) {
          this.setState({ isInvalid: false }, () => {
            resolve(true);
          });
        }
      } else {
        if (type == "validation") {
          this.setState({ isInvalid: true, isError }, () => {
            this.inputRef.current.focus();
            resolve(false);
          });
          return;
        }
        if (type == "error") {
          this.setState({ isError: true, isInvalid }, () => {
            if (isFocusAble) this.inputRef.current.focus();
            resolve(false);
          });
          return;
        }
      }
      this.setState({ isError: false, isInvalid: false });
      resolve(true);
    });
  };

  validateMethod = ({ regex, inputValue }) => {
    if (!regex && inputValue)
      return {
        isValid: true,
        isError: false,
        isInvalid: false,
      };
    else if (!inputValue) {
      return {
        isValid: false,
        isError: true,
        isInvalid: false,
        type: "error",
      };
    } else if (inputValue && regex && regex.test(inputValue)) {
      return {
        isValid: true,
        type: "validation",
        isError: false,
        isInvalid: false,
      };
    } else if (inputValue && regex && !regex.test(inputValue)) {
      return {
        isValid: false,
        type: "validation",
        isInvalid: true,
        isError: false,
      };
    } else {
      return {
        isValid: false,
        type: "error",
        isError: true,
        isInvalid: true,
      };
    }
  };

  onFocus = () => {
    // this.setState({ isFocus: true, isError: false, isInvalid: false });
    this.setState({ isFocus: true });
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
    const { saveInLocalStorage, name } = this.props;
    this.setState({ inputValue: e.target.value });
    if (saveInLocalStorage && name) {
      window.localStorage.setItem(name, e.target.value);
    }
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
