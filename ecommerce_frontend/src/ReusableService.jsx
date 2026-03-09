import api from "./api/axiosConfig";

export const addToCart = async function(productId){
        try{
            api.post(`/cart/add/${productId}`);
        }
        catch(err){
            alert("please longin first");
        }
    }