import React from "react";
import styles from "./home.module.css";
import ReactPlayer from "react-player";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heroMedia: "",
      videoReady: false
    };

    this.videoTag = React.createRef();
  }

  componentDidMount() {
    if (this.props.heroMedia) {
      this.setState({ heroMedia: this.props.heroMedia?.fields?.file?.url });
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
            {
              !this.state.videoReady
              ? <div style={{backgroundColor: '#ebebeb'}} className={styles.bannerImage}></div>
              : ''
            }
            <ReactPlayer
              className={styles.bannerImage}
              style={!this.state.videoReady ? {display: 'none'} : {}}
              width={'100%'}
              height={'calc(var(--max-width) * 1.5)'}
              muted
              onReady={() => this.setState({videoReady: true})}
              loop={true}
              playsinline={true}
              playing={true}
              url={this.state.heroMedia}
            />
          </div>
          <div className={styles.homeDetailsContainer}>
              <div
                className={styles.homeDetailsTitle}
                dangerouslySetInnerHTML={{ __html: this.props.heroTitle }}>
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
