import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const ProcessCard = ({ lottieURI, heading, subHeading}) => {
  return (
    <div className={css(styles.cardContainer)}>
      <div className={css(styles.textContainer)}>
        <h4>{heading}</h4>
        <p>{subHeading}</p>
      </div>
    </div>
  )
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 300,
    backgroundColor: 'white',
    padding: 20,
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
  },
  textContainer: {
    paddingLeft: 10,
    paddingRight: 10,
  }
});

export default ProcessCard;