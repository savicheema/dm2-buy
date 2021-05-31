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
        <Image src="/shape-1.png" width="24" height="24" />
      </ImageButton>
    );
  }

  constructor(props) {
    super(props);

    let isShared = false;

    this.state = { isShared };
  }

  componentDidMount() {}
  componentWillUnmount() {}

  share = () => {
    if (navigator.share) {
      navigator
        .share({
          url: window.location.href,
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
