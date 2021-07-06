import React from "react";
import styles from "./share-button.module.css";
import Image from "next/image";

import ImageButton from "./ImageButton";

class ShareButton extends React.Component {
  render() {
    let { isShared } = this.state;
    console.log(" ShareButton STATE", isShared);

    const imageButtonType = isShared ? "disabled" : "raised";
    return (
      <ImageButton type={imageButtonType} action={this.share}>
        <Image src="/shape@2x.png" width="20" height="20" />
      </ImageButton>
    );
  }

  constructor(props) {
    super(props);
    const { title } = props.title;
    let isShared = false;
    this.state = { isShared, title };
  }

  componentDidMount() {}
  componentWillUnmount() {}

  share = () => {
    if (navigator.share) {
      navigator
        .share({
          url: window.location.href,
          title: this.state.title | "Dm 2 Buy",
        })
        .then(() => {
          this.setState({ isShared: true });
        });
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).then(() => {
        this.setState({ isShared: true });
      });
    } else {
      alert("Share unavailable!");
    }
  };
}

export default ShareButton;
