import { combineReducers } from "redux";
import logincheck from "./logincheck";
import special from "./special";
import reserve from "./reserve";

//루트 리듀서 
//리듀서 합치기 combineReducers({객체 형태로})
const rootReducer = combineReducers({ reserve:reserve ,special : special, logincheck : logincheck});

export default rootReducer;