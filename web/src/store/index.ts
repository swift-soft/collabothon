import { combineReducers, configureStore } from "@reduxjs/toolkit";
import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { supabase } from "@/api";
import authReducer, { updateUser } from "@/auth/state";
import { toast } from "@/theme";

const rootReducer = combineReducers({
  auth: persistReducer(
    {
      key: "auth",
      storage,
      whitelist: ["profile", "user"],
    },
    authReducer
  ),
});

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  reducer: rootReducer,
});

let rehydrationComplete: ((value?: any) => void) | undefined;
const rehydrationPromise = new Promise((resolve) => {
  rehydrationComplete = resolve;
});
export const rehydration = () => rehydrationPromise;
export const persistor = persistStore(
  store,
  null,
  () => rehydrationComplete && rehydrationComplete()
);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

supabase.auth.onAuthStateChange(async (event, session) => {
  const state = store.getState();
  if (event === "SIGNED_OUT") store.dispatch(updateUser(undefined));

  if (event === "SIGNED_IN" && !state.auth.user) {
    store.dispatch(updateUser(session?.user ?? undefined));
    toast({
      isClosable: true,
      status: "success",
      title: "Zalogowano pomyślnie",
    });
  }
});
(async () => {
  await rehydration();
  const {
    data: { user: initialUser },
  } = await supabase.auth.getUser();
  store.dispatch(updateUser(initialUser ?? undefined));
})();
