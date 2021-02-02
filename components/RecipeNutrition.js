import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const RecipeNutrition = ({index, length, name, value}) => {
  return (
    <div className={ index === length - 1 ? css(styles.noBorderBox) : css(styles.borderBox)}>
      <p style={{marginBottom: 0}}><span className={css(styles.nameTxt)}>{name + ":"}</span><span className={css(styles.valueTxt)}>{value}</span></p>
    </div>
  )
}

const styles = StyleSheet.create({
  borderBox: {
    paddingBottom: 10,
    paddingTop: 10,
    borderBottom: '0.5px solid #cecece'
  },
  noBorderBox: {
    paddingBottom: 10,
    paddingTop: 10,
  },
  nameTxt: {
    color: 'black',
    marginRight: 5,
  },
  valueTxt: {
    color: '#808080',
    float: 'right',
    marginRight: 10,
  }
})
export default RecipeNutrition;