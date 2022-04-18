import axios from "axios";
import { SET_CATEG_FR_SSTRG, SORT_BY_CATEGORIES } from "./action.types";

export const sortByCategories = (value) => ({ type: SORT_BY_CATEGORIES, payload: value });
export const setCategoryFrSesStorage = (value) => ({ type: SET_CATEG_FR_SSTRG, payload: value});

export const getSortedCategories = (value1, value2) => async (dispatch) => {
    axios.get(`http://localhost:4000/sort?${new URLSearchParams({
        category: value1,
        subCategory: value2,
    }).toString()}`).then((res) => {
        console.log(res.data.result);
        dispatch(sortByCategories(res.data.result))
    })

}


