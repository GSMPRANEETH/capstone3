import { createContext, useContext, useReducer } from "react";
import { reducer, preferencesState } from "./reducer";
import { PreferencesState, PreferencesDispatch } from "./types";

const PreferencesStateContext = createContext<PreferencesState | undefined>(
	undefined
);
const PreferencesDispatchContext = createContext<
	PreferencesDispatch | undefined
>(undefined);

export const usePreferencesState = () => useContext(PreferencesStateContext);
export const usePreferencesDispatch = () =>
	useContext(PreferencesDispatchContext);

export const PreferencesProvider: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	const [state, dispatch] = useReducer(reducer, preferencesState);
	return (
		<PreferencesStateContext.Provider value={state}>
			<PreferencesDispatchContext.Provider value={dispatch}>
				{children}
			</PreferencesDispatchContext.Provider>
		</PreferencesStateContext.Provider>
	);
};
