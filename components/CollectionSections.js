import React from 'react';
import styles from './collection-section.module.css';

import ReactPlayer from "react-player";

export default class CollectionSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videoReady: false
        };
    }

    componentDidMount() {}

    render() {
        return (
            <div style={{
                marginTop: '45px'
            }}>
                {
                    this?.props?.title
                    ? <div className={styles.title} style={{textAlign: this.props.collectionSection.alignment}}>{this.props.title}</div>
                    : ''
                }
                <div>
                    {
                        this.props.collections.map((collection, index) => {
                            return (
                                collection?.fields?.header[0]?.url.split('.').pop() === 'jpeg'
                                || collection?.fields?.header[0]?.url.split('.').pop() === 'jpg'
                                || collection?.fields?.header[0]?.url.split('.').pop() === 'png'
                                ? <div
                                    onClick={() => {
                                        window.history.pushState("object or string", "Title", `shop?collection=${collection?.fields?.Name}`);
                                        window.location.reload();
                                    }} 
                                    key={collection?.fields?.Name + index}
                                    style={{
                                        backgroundImage: `url(${collection?.fields?.header[0]?.url})`
                                    }}
                                    className={styles.collectionCard}>
                                        <div className={styles.cardContainer}>
                                        </div>
                                        <span className={styles.cardText}>{collection?.fields?.title}</span>
                                </div>
                                : <div
                                    onClick={() => {
                                        window.history.pushState("object or string", "Title", `shop?collection=${collection?.fields?.Name}`);
                                        window.location.reload();
                                    }} 
                                    key={collection?.fields?.Name + index}
                                    className={styles.collectionCard}>
                                    <div className={styles.cardContainer}>
                                    </div>
                                    {
                                        collection?.fields?.title
                                        ? <span className={styles.cardText}>{collection?.fields?.title}</span>
                                        : ''
                                    }
                                    <ReactPlayer
                                        className={styles.collectionVideoCard}
                                        style={!this.state.videoReady ? {display: 'none'} : {}}
                                        width={'100%'}
                                        height={'calc(var(--max-width) - 200px)'}
                                        muted
                                        onReady={() => this.setState({videoReady: true})}
                                        loop={true}
                                        playsinline={true}
                                        playing={true}
                                        url={collection?.fields?.header[0]?.url}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}