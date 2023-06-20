import {applyMiddleware, combineReducers, createStore} from "redux";
import userReducer from "./userReducer";
import thunk from "redux-thunk";
import trainerReducer from "./trainerReducer";
import groupReducer from "./groupReducer";
import exerciseReducer from "./exerciseReducer";
import complexReducer from "./complexReducer";

const rootReducer = combineReducers({
    user:userReducer,
    trainers:trainerReducer,
    groups:groupReducer,
    exercise:exerciseReducer,
    complex:complexReducer
})

export const store = createStore(rootReducer,applyMiddleware(thunk))