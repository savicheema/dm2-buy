import React from 'react';
import styles from "./home.module.css";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            heroMedia: '',
        };

        this.videoTag = React.createRef();
    }

    componentDidMount() {
        if (this.props.heroMedia && this.props.heroMedia.length) {
            this.setState({heroMedia: this.props.heroMedia[0]['url']});
        }
        this.props.endLoading();
    }

    render() {
        return (
            !this.props.loading
            && <div className={styles.homePage}>
                <div
                    className={styles.bannerContainer}
                    // onClick={() => this.props.updateHomeActive(false)}
                >
                    <video
                        ref={ref => this.videoTag = ref}
                        className={styles.bannerImage}
                        controls={false}
                        autoPlay={true}
                        muted>
                        <source src={this.state.heroMedia} type="video/mp4" />
                        <source src={this.state.heroMedia} type="video/ogg" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        );
    }
}