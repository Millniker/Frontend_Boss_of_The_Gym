import {applyMiddleware, combineReducers, createStore} from "redux";
import userReducer from "./userReducer";
import thunk from "redux-thunk";
import trainerReducer from "./trainerReducer";
import groupReducer from "./groupReducer";
import exerciseReducer from "./exerciseReducer";
import complexReducer from "./complexReducer";
import trainingReducer from "./trainingReducer";

const rootReducer = combineReducers({
    user:userReducer,
    trainers:trainerReducer,
    groups:groupReducer,
    exercise:exerciseReducer,
    complex:complexReducer,
    training:trainingReducer
})

export const store = createStore(rootReducer,applyMiddleware(thunk))