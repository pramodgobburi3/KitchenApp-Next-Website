import React from 'react';
import { RoundCheckMark } from '../assets/svgs/Icons';
import { StyleSheet, css } from 'aphrodite';

const RecipeIngredient = ({index, length, ingredient}) => {
  return (
    <div className={ index === length - 1 ? css(styles.noBorderBox) : css(styles.borderBox)}>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <span><RoundCheckMark style={{marginRight: 10}}/></span>
        <p>{ingredient}</p>
      </div>
    </div>
  )
}

const styles = StyleSheet.create({
  borderBox: {
    paddingBottom: 0,
    paddingTop: 15,
    borderBottom: '0.5px solid #cecece'
  },
  noBorderBox: {
    paddingBottom: 0,
    paddingTop: 15,
  }
})
export default RecipeIngredient;