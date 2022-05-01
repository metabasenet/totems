import {
    baseGet,
    basePost
} from "./base";

export default {
   /* newblock(params) {
        return baseGet("/newblock/", params);
    }
    */
    getUniswap(params){
        return baseGet("/getUniswap", params);
    }
}