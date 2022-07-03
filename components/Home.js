import React from "react";
import styles from "./home.module.css";
import ReactPlayer from "react-player";

const getExtension = (filename) => {
  return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
}

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
    let mediaExtension = getExtension(this.state.heroMedia);
    if (mediaExtension && mediaExtension.length) {
      mediaExtension = mediaExtension[0];
    } else mediaExtension = null;

    const videoBanner = mediaExtension !== 'jpg'
      && mediaExtension !== 'jpeg'
      && mediaExtension !== 'png'
      ? true : false;

    return (
      !this.props.loading && (
        <div className={styles.homePage}>
          <div
            className={styles.bannerContainer}
            // onClick={() => this.props.updateHomeActive(false)}
          >
            {
              !this.state.videoReady && videoBanner
              ? <div style={{backgroundColor: '#ebebeb'}} className={styles.bannerImage}></div>
              : ''
            }
            {
              videoBanner
              ? <ReactPlayer
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
              /> : <img src={`https:${this.state.heroMedia}`} className={styles.bannerImage} alt="Hero Media" />
            }
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
              {/* <div
                onClick={() => this.props.updateHomeActive(false)}
                className={styles.homeDetailsButton}>
                  SHOP NOW
              </div> */}
          </div>
        </div>
      )
    );
  }
}
