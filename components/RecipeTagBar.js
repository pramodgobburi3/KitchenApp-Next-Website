import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import RecipeTag from './RecipeTag';

const RecipeTagBar = ({tags}) => {
  return (
    <div className={css(styles.tagContainer)}>
      {tags.map((tag, index) => (
        <RecipeTag tag={tag} index={index} length={tags.length} />
      ))}
    </div>
  )
}

const styles = StyleSheet.create({
  tagContainer: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'auto',
    marginBottom: 15,
    maxWidth: 600,
  },
});

export default RecipeTagBar;