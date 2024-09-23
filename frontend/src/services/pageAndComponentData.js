import axios from "axios";
import { categories } from "./api";
import toast from "react-hot-toast";

const {CATALOGPAGEDATA_API} = categories

export const getCatalogPageData = async(categoryId) =>{
        let result = [];
        try {
            const response = await axios.post(CATALOGPAGEDATA_API, {categoryId})

            if(!response?.data?.success){
                throw new Error('Could not Fetch Category page data')
            }
             result = response?.data?.data
        } catch (error) {
            console.log(error)
            toast.error(error.message)

        }
        return result;
}