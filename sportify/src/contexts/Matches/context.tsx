import { createContext, useContext, useReducer } from "react";
import { MatchesDispatch, MatchesState } from "./types";
import { matchesState, reducer } from "./reducer";

const MatchesStateContext = createContext<MatchesState | undefined>(undefined);
const MatchesDispatchContext = createContext<MatchesDispatch | undefined>(
	undefined
);

export const useMatchesState = () => useContext(MatchesStateContext);
export const useMatchesDispatch = () => useContext(MatchesDispatchContext);
export const MatchesProvider: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	const [state, dispatch] = useReducer(reducer, matchesState);
	return (
		<MatchesStateContext.Provider value={state}>
			<MatchesDispatchContext.Provider value={dispatch}>
				{children}
			</MatchesDispatchContext.Provider>
		</MatchesStateContext.Provider>
	);
};
