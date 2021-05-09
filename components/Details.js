import React from "react";
import styles from "./details.module.css";

class Details extends React.Component {
  render() {
    let { isOpen } = this.state;
    console.log(" Details STATE", isOpen);

    const { summary, children } = this.props;

    return (
      <div className={styles.details}>
        <details ref={this.detailsRef}>
          <summary>{summary}</summary>
          <p>{children}</p>
        </details>
        <button onClick={this.toggleDetails} className={styles.toggleButton}>
          {isOpen ? "Show Less" : "Show More"}
        </button>
      </div>
    );
  }

  constructor(props) {
    super(props);

    let isOpen = false;

    this.state = { isOpen };

    this.detailsRef = React.createRef();
  }

  componentDidMount() {}
  componentWillUnmount() {}

  toggleDetails = () => {
    let { isOpen } = this.state;
    if (!isOpen) {
      this.setState({ isOpen: true }, () => {
        this.detailsRef.current.setAttribute("open", true);
      });
    } else {
      this.setState({ isOpen: false }, () => {
        this.detailsRef.current.removeAttribute("open");
      });
    }
  };
}

export default Details;
