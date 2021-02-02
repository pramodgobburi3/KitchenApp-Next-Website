import { AiFillCodeSandboxCircle } from 'react-icons/ai';
import axios from '../../axios';
const urls = require('../../urls');


module.exports = {

  createListItem: async(groceryListId, quantity, unit, name, note) => {
    try {
      const res = await axios.post(
        urls.GROCERY_LIST_URL + '/' + groceryListId + urls.LIST_ITEMS_URL + '/create',
        { quantity: quantity,
          unit: unit,
          name: name,
          note: note }
      );

      if (res.data.status == 'successful') {
        if (res.data.hasPayload) {
          return res.data.payload;
        }
      } else {
        throw new Error(res);
      }
    } catch (error) {
      throw error;
    } 
  },

  updateListItem: async(groceryListId, itemId, quantity, unit, name, note) => {
    try {
      const res = await axios.put(
        urls.GROCERY_LIST_URL + '/' + groceryListId + urls.LIST_ITEMS_URL + '/' + itemId + '/update',
        { quantity: quantity,
          unit: unit,
          name: name,
          note: note }
      );

      if (res.data.status == 'successful') {
        if (res.data.hasPayload) {
          return res.data.payload;
        }
      } else {
        throw new Error(res);
      }
    } catch (error) {
      throw error;
    }
  },

  toggleListItem: async(groceryListId, itemId) => {
    try {
      const res = await axios.put(
        urls.GROCERY_LIST_URL + '/' + groceryListId + urls.LIST_ITEMS_URL + '/' + itemId + '/toggle',
        {}
      );
    
      if (res.data.status == 'successful') {
        if (res.data.hasPayload) {
          return res.data.payload;
        }
      } else {
        throw new Error(res);
      }

    } catch (error) {
      throw error;
    }
  },

  // TODO: TEST
  deleteListItem: async(groceryListId, itemId) => {
    try {
      const res = await axios.delete(
        urls.GROCERY_LIST_URL + '/' + groceryListId + urls.LIST_ITEMS_URL + '/' + itemId +'/delete',
        {}
      );

      if (res.data.status == 'successful') {
        if (res.data.hasPayload) {
          console.log(res.data.payload)
          return res.data.payload;
        }
      } else {
        throw new Error(res);
      }

    } catch (error) {
      throw error;
    }
  }
};
