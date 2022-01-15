import React from "react";
import styles from "./home.module.css";
import ReactPlayer from "react-player";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heroMedia: "",
    };

    this.videoTag = React.createRef();
  }

  componentDidMount() {
    if (this.props.heroMedia && this.props.heroMedia.length) {
      this.setState({ heroMedia: this.props.heroMedia[0]["url"] });
    }
    this.props.endLoading();
  }

  render() {
    return (
      !this.props.loading && (
        <div className={styles.homePage}>
          <div
            className={styles.bannerContainer}
            // onClick={() => this.props.updateHomeActive(false)}
          >
            <ReactPlayer
              className={styles.bannerImage}
              width={'100%'}
              height={'calc(var(--max-width) * 1.5)'}
              muted
              loop={true}
              playsinline={true}
              playing={true}
              url={this.state.heroMedia}
            />
          </div>
          <div className={styles.homeDetailsContainer}>
              <div className={styles.homeDetailsTitle}>
                  {this.props.heroTitle}
              </div>
              <div
                className={styles.homeDetailsDesc}
                dangerouslySetInnerHTML={{ __html: this.props.heroDescription }}>
              </div>
              <div
                onClick={() => this.props.updateHomeActive(false)}
                className={styles.homeDetailsButton}>
                  SHOP NOW
              </div>
          </div>
        </div>
      )
    );
  }
}
