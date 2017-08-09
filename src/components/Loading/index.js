import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';


class Loading extends Component {

  render() {
    let styles = {};
    styles.onProgress = {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      zIndex: 1000,
      backgroundColor: 'rgba(56, 56, 56, 0.7)',
    };

    styles.circlularArea = {
      textAlign: 'center',
      height: '100vh',
      width: '100vw',
      display: 'table-cell',
      verticalAlign: 'middle'
    };


    let tag = (
      <div style={styles.circlularArea}>
        <CircularProgress size={100}/>
      </div>
    );

    if (this.props.withOverLay) {
      tag = (
        <div style={styles.onProgress}>
          {tag}
        </div>
      )
    }

    return (
      tag
    );
  }
}

Loading.propTypes = {
  withOverLay: PropTypes.bool.isRequired,
};

export default Loading;