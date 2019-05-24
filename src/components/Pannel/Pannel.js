import React, {Component} from 'react';

class Pannel extends Component {
    state= {
        visibility: 'block'
    }

    render() {
        const {title, content}= this.props;
        return (
            <div style={{
                backgroundColor: '#2d2d2d',
                boxShadow: '3px 0px 8px 2px #00000077',
                color: '#e9e9e9',
                padding: '1rem',
                borderRadius: '4px',
                display: this.state.visibility,
                marginTop: '1rem',
                marginBottom: '1rem'
            }}>
                <div>
                    <span style={{float: 'right', cursor: 'pointer'}}
                        onClick={()=>{this.setState({
                            ...this.state,
                            visibility: 'none'
                        })}}>
                        [close]
                    </span>
                </div>
                <h3>
                    {title}
                </h3>
                <p>
                    {content}
                </p>
            </div>
        );
    }
}

export default Pannel;