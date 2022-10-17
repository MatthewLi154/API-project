import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import sessionReducer from "./session";
import groupReducer from "./groups";

const rootReducer = combineReducers({
  // add reducer functions here
  session: sessionReducer,
  groups: groupReducer,
});

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

// const configureStore = (preloadedState) => {
//   return createStore(persistedReducer, preloadedState, enhancer);
// };

// export const persistor = persistStore(configureStore);

// export const store = createStore(persistedReducer, enhancer);

// export const persistor = persistStore(store);

export default configureStore;
