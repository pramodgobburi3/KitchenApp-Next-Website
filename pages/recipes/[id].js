import React, { useState, useEffect } from "react";
import { StyleSheet, css } from 'aphrodite';
import { Steps, Spin, Popover, DatePicker, message, InputNumber, Input } from 'antd';
import { Container } from 'reactstrap';
import { useRouter } from 'next/router'
import { useQuery } from "@apollo/client";
import { IoAddSharp } from 'react-icons/io5';
import moment from 'moment';
import axios from '../../axios';

import RecipeIngredient from '../../components/RecipeIngredient';
import RecipeNutrition from "../../components/RecipeNutrition";
import RecipeInfoBar from "../../components/RecipeInfoBar";
import RecipeTagBar from "../../components/RecipeTagBar";

const { Step } = Steps;

import { FULL_RECIPE_QUERY } from '../../gql/queries/recipes';

import { createMeal } from '../../helpers/api/meal';


const Recipe = props => {
  const router = useRouter();
  const { loading, error, data } = useQuery(FULL_RECIPE_QUERY(router.query.id));
  const [showPopover, setShowPopover] = useState(false);
  const [date, setDate] = useState(null);
  const [mealName, setMealName] = useState(null);
  const [mealServing, setMealServing] = useState(null);
  const [showAddMealBtn, setShowAddMealBtn] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setShowAddMealBtn(true);
    }
  }, [])

  const generateUrls = (media) => {
    const urls = [];
    media.forEach(m => {
      urls.push(
        { url: m }
      )
    });
    return urls;
  }

  const disabledDates = (current) => {
    const momentCurrent = moment(current);
    const today = moment().subtract(1, 'day');
    const thirtyDaysFromNow = moment().add(30, 'days');
    return !(momentCurrent.isSameOrAfter(today) && momentCurrent.isSameOrBefore(thirtyDaysFromNow))
  }

  const onNameChange = (e) => {
    setMealName(e.target.value);
  }
  
  const onChange = (date) => {
    setDate(moment(date));
  }

  const makeMealFromRecipe = async () => {
    await createMeal(date, mealName, [ data.recipe.recipe_id ]);
    setDate(null);
    setMealName(data.recipe.name)
    setShowPopover(false);
  }

  const addMealContent = () => (
    <div getPopupContainer={trigger => trigger.parentElement} style={{display: 'flex', flexDirection: 'column'}}>
      <p class={css(styles.popoverFormHeading)}>Name</p>
      <Input placeholder="Meal Name" value={mealName} onChange={onNameChange} style={{marginBottom: 10}} />
      <p class={css(styles.popoverFormHeading)}>Date*</p>
      <DatePicker disabledDate={disabledDates} style={{marginBottom: 10}} getPopupContainer={trigger => trigger.parentElement} onChange={onChange} value={date} />
      {/* <p class={css(styles.popoverFormHeading)}>Servings*</p>
      <InputNumber size="middle" placeholder="Servings" style={{width: '100%'}} min={1} value={mealServing} /> */}
      <input className={css(styles.addMenuBtn)} type="submit" value="Add" onClick={makeMealFromRecipe} />
    </div>
  );

  const getImages = () => {
    if (recipe.media.length > 0) {
      return recipe.media[0].url;
    } else {
      return 'https://assets.materialup.com/uploads/b03b23aa-aa69-4657-aa5e-fa5fef2c76e8/preview.png';
    }
  }

  useEffect(() => {
    if (data && data.recipe) {
      setMealServing(data.recipe.serving_size);
      setMealName(data.recipe.name);
    }
  }, [data])

  if (!loading) {
    if (error) {
      message.error("Unable to fetch recipe");
      return null;
    } else {
      return (
        <Container>
          {showAddMealBtn && (
            <div className={css(styles.bottomActionButtonContainer)}>
              <Popover visible={showPopover} placement="topRight" content={addMealContent()} title={"Add to meal"} getPopupContainer={trigger => trigger.parentElement} >
                <div className={!showPopover ? css(styles.createMealBtn) : css(styles.createMenuBtnClicked)} onClick={() => setShowPopover(!showPopover)}>
                  <IoAddSharp size={40} color="white" />
                </div>
              </Popover>
            </div>
          )}
          <div className={css(styles.info_container)}>
            <div style={{flexDirection: 'row', display: 'flex', alignItems: 'center', float: 'left', width: '100%', paddingLeft: 30}}>
              {data.recipe.media.length > 0 ? (
                <img className={css(styles.recipe_img)} src={data.recipe.media[0].url} alt="recipe_img" />
              ) : (
                <img className={css(styles.recipe_img)} src={"https://assets.materialup.com/uploads/b03b23aa-aa69-4657-aa5e-fa5fef2c76e8/preview.png"} alt="recipe_img" />
              )}
              
              <div style={{minWidth: 500}}>
                <RecipeTagBar tags={data.recipe.tags} />
                <h1>
                  {data.recipe.name}
                </h1>
                <h6 className={css(styles.description)}>
                  {data.recipe.description}
                </h6>
                <RecipeInfoBar time={data.recipe.prep_time} difficulty={data.recipe.difficulty} serving={data.recipe.serving_size} source={data.recipe.author} />
              </div>
            </div>
          </div>
          <div className={css(styles.subContainer)}>
            <div className={css(styles.left)}>
              <div className={css(styles.ingredients)}>
                <div className={css(styles.greyContainer)}>
                  <p className={css(styles.ingredientsHeader)}>Ingredients:</p>
                  {data.recipe.ingredients.map((ingredient, idx) => (
                    <div>
                      <RecipeIngredient index={idx} length={data.recipe.ingredients.length} ingredient={ingredient.raw} />
                    </div>
                  ))}
                </div>
                
              </div>
              <div className={css(styles.ingredients)}>
                <div className={css(styles.nutritionContainer)}>
                  <p className={css(styles.ingredientsHeader)}>Nutrition: (per serving)</p>
                  <RecipeNutrition index={0} length={2} name="Calories" value="100" />
                  <RecipeNutrition index={1} length={2} name="Fats" value="100" />
                </div>
              </div>
            </div>
            <div className={css(styles.right)}>
              <h3>Steps</h3>
              <hr/>
              <div className={css(styles.stepsContainer)}>
              <Steps direction="vertical">
                {
                  data.recipe.steps.map((s) => (
                      <Step status="process" title={s.description} />
                  ))
                }
              </Steps>
              </div>
            </div>
          </div>
        </Container>
          
      );
    }
  } else {
    return (
      <Spin spinning={loading} delay={0} size="large" />
    )
  }

}


const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    // textAlign: 'right',
    paddingRight: 10,
  },
  info_container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 50,
    marginBottom: 50,
  },
  recipe_img: {
    height: 'auto',
    width: 500,
    marginRight: 30,
  },
  ingredients: {
    paddingLeft: 30,
    marginBottom: 20,
  },
  greyContainer: {
    padding: 20,
    backgroundColor: '#F7F7F7',
    borderRadius: 20,
    width: 320,
    float: 'left',
  },
  nutritionContainer: {
    padding: 20,
    border: '1px solid #808080',
    borderRadius: 5,
    width: 320,
    float: 'left',
  },
  ingredientsHeader: {
    color: 'black',
    fontWeight: 200,
    fontSize: 18,
    marginBottom: 5,
  },
  right: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 7,
    paddingLeft: 20,
    minHeight: '30vh'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    lineHeight: 1.6,
    marginBottom: 20,
    marginTop: 10,
  },
  stepsContainer: {
    overflow: 'auto',
    flex: 1,
    marginRight: 100,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    // minHeight: '100%'
  },
  bottomActionButtonContainer: {
    position: 'fixed',
    bottom: 20,
    right: 40,
    display: 'flex',
    zIndex: 1000,
    flexDirection: 'column',
  },
  createMealBtn: {
    transform: 'rotate(0deg)',
    transition: '1s',
    padding: 10,
    backgroundColor: '#F43445',
    borderRadius: 40,
    cursor: 'pointer',
    boxShadow: '0 0 45px rgba(0, 0, 0, 0.1)',
  },
  createMenuBtnClicked: {
    transform: 'rotate(45deg)',
    transition: '1s',
    padding: 10,
    backgroundColor: '#F43445',
    borderRadius: 40,
    cursor: 'pointer',
    boxShadow: '0 0 45px rgba(0, 0, 0, 0.1)',
  },
  addMenuBtn: {
    backgroundColor: '#F43445',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    border: 'none',
    outline: 'none',
    marginTop: 10,
    color: 'white',
    fontWeight: 'bold',
    boxShadow: '0 0 25px rgba(0, 0, 0, 0.1)',
  },
  popoverFormHeading: {
    fontSize: 14,
    marginBottom: 5,
  }
})

export default Recipe;