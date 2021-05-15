import React from "react";
import styles from "./details.module.css";

class Details extends React.Component {
  render() {
    let { isOpen } = this.state;
    console.log(" Details STATE", isOpen);

    const { summary, children } = this.props;

    const summaryClass = isOpen ? styles.hideSummary : styles.summmary;

    return (
      <div className={styles.details}>
        <div ref={this.detailsRef}>
          {!isOpen && <div className={summaryClass}>{summary}</div>}
          {isOpen && <p>{children}</p>}
        </div>
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

  toggleDetails = (e) => {
    let { isOpen } = this.state;
    if (!isOpen) {
      this.setState({ isOpen: true }, () => {
        this.detailsRef.current.setAttribute("open", true);
        e.target.classList.add("underline-button");
      });
    } else {
      this.setState({ isOpen: false }, () => {
        this.detailsRef.current.removeAttribute("open");
        e.target.classList.remove("underline-button");
      });
    }
  };
}

export default Details;
