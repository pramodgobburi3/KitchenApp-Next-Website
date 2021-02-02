import axios from '../../axios';
const urls = require('../../urls');


module.exports = {

  // TODO: TEST
  createGroceryList: async(name, items) => {
    try {
      const res = await axios.post(
        urls.GROCERY_LIST_URL +'/create',
        { items: items,
          name: name }
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

  updateGroceryList: async(groceryListId, startDate, endDate) => {
    try {
      const res = await axios.put(
        urls.GROCERY_LIST_URL + '/' + groceryListId + '/update',
        { start_date: startDate,
          end_date: endDate }
      );

      if (res.data.status == 'successful') {
        if (res.data.hasPayload) {
          return res.data.payload
        }
      } else {
        throw new Error(res);
      }

    } catch (error) {
      throw error;
    }
  },

  editGroceryList: async (groceryListId, name) => {
    try {
      const res = await axios.put(
        urls.GROCERY_LIST_URL + '/' + groceryListId + '/edit',
        { name: name }
      );

      if (res.data.status == 'successful') {
        if (res.data.hasPayload) {
          return res.data.payload
        }
      } else {
        throw new Error(res);
      }

    } catch (error) {
      throw error;
    }
  },

  generateGroceryList: async (startDate, endDate) => {
    try {
      const res = await axios.post(
        urls.GROCERY_LIST_URL + '/generate',
        { start_date: startDate,
          end_date: endDate }
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

  deleteGroceryList: async (groceryListId) => {
    try {
      const res = await axios.delete(
        urls.GROCERY_LIST_URL + '/' + groceryListId + '/delete',
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
}