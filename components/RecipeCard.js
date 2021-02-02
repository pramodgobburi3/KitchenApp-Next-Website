import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { useRouter } from 'next/router';

const RecipeCard = ({ recipe, index, length, history }) => {
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);
  const generateDescription = (description) => {
    if (description.length > 62) {
      description = description.substring(0, 59) + '...';
    }
    return description;
  }

  const goToRecipe = () => {
    // history.push('/recipes/recipe');
    router.push('/recipes/' + recipe.recipe_id);
  }

  const getRecipeImage = () => {
    if (recipe.media.length > 0) {
      return recipe.media[0].url;
    } else {
      return 'https://assets.materialup.com/uploads/b03b23aa-aa69-4657-aa5e-fa5fef2c76e8/preview.png';
    }
  }

  return (
    <div className={showDialog ? css(styles.cardContainerWithBoxShadow) : css(styles.cardContainer)}
     onMouseEnter={() => setShowDialog(true)} onMouseLeave={() => setShowDialog(false)}>
      {showDialog && <div className={css(styles.overlayContainer)}>
        <button className={css(styles.redButton)} onClick={() => goToRecipe()}>View Recipe</button>
      </div>
      }
      <img className={css(styles.recipeImg)} src={getRecipeImage()} alt="recipe_img" />
      <div style={{marginLeft: 10, marginRight: 10}}>
        <p className={css(styles.recipeName)}>{recipe.name}</p>
        <p className={css(styles.recipeDescription)}>{generateDescription(recipe.description)}</p>
      </div>
      
      <div className={css(styles.infoContainer)}>
        <div className={css(styles.attributeContainer)}>
          20 min
        </div>
        <div className={css(styles.attributeContainerNoBorder)}>
          Easy
        </div>
      </div>
      <div className={css(styles.userProfileContainer)}>
        Pramod Gobburi
        <img className={css(styles.userProfileImg)} src={"https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg"} />
      </div>
    </div>
  )
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    width: 240,
    marginBottom: 50,
    position: 'relative',
  },
  cardContainerWithBoxShadow: {
    backgroundColor: 'white',
    width: 240,
    marginBottom: 50,
    position: 'relative',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
    transform: 'translateY(-15px)',
    transition: '0.5s',
  },
  recipeImg: {
    height: 275,
    width: 240,
    borderTopRightRadius: 4,
    objectFit: 'cover'
  },
  recipeName: {
    marginTop: 10,
    marginBottom: 0,
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16
  },
  recipeDescription: {
    marginTop: 5,
    fontWeight: 10,
    color: '#808080',
    marginBottom: 10,
    fontSize: 14
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderTop: '1px solid #dddddd',
    borderBottom: '1px solid #dddddd',
  },
  attributeContainerNoBorder: {
    flex: 1,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
  },
  attributeContainer: {
    flex: 1,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRight: '1px solid #dddddd',
    fontSize: 14
  },
  userProfileContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    color: '#808080',
    fontSize: 14,
    borderBottom: '1px solid #dddddd',
  },
  userProfileImg: {
    border: '1px solid #dddddd',
    height: 30,
    width: 30,
    borderRadius: 30,
    objectFit: 'cover',
  },
  overlayContainer: {
    backgroundColor: 'rgb(255,255,255,0.6)',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    position: 'absolute',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  redButton: {
    backgroundColor: '#F43445',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 15,
    border: 'none',
    color: 'white',
  }
});

export default RecipeCard;