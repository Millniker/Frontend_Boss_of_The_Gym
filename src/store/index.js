import {applyMiddleware, combineReducers, createStore} from "redux";
import userReducer from "./userReducer";
import thunk from "redux-thunk";
import trainerReducer from "./trainerReducer";
import groupReducer from "./groupReducer";
import exerciseReducer from "./exerciseReducer";
import complexReducer from "./complexReducer";
import trainingReducer from "./trainingReducer";
import sharingReducer from "./sharingReducer";
import likeReducer from "./likeReducer";

const rootReducer = combineReducers({
    user:userReducer,
    trainers:trainerReducer,
    groups:groupReducer,
    exercise:exerciseReducer,
    complex:complexReducer,
    training:trainingReducer,
    sharing:sharingReducer,
    like:likeReducer
})

export const store = createStore(rootReducer,applyMiddleware(thunk))