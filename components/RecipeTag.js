import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const RecipeTag = ({tag, index, length}) => {
  return (
    <div className={index === length - 1 ? css(styles.tag) : css(styles.tagWithMarginRight)}>
      {tag}
    </div>
  )
}

const styles = StyleSheet.create({
  tag: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    border: '1px solid #F43445',
    color: '#F43445'
  },
  tagWithMarginRight: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    border: '1px solid #F43445',
    color: '#F43445',
    marginRight: 10,
  }
});

export default RecipeTag;