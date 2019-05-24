import React, {Component} from 'react';
import styles from './Polaroid.module.css';

class Polaroid extends Component {
    render() {
        const {data}= this.props;

        return (
            <div className={styles.wrapper} onClick={data.listener}>
                {data.img}
                <br/>
                <div style={{fontSize: '0.8rem', marginTop: '0.5rem', textOverflow: 'ellipsis'}}>{data.content}</div>
            </div>
        );
    }
}

export default Polaroid;