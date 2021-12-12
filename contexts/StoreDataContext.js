import { createContext, useContext } from "react";

const StoreContext = createContext({});
StoreContext.display = 'StoreContext'

export function AppWrapper({ sharedState, children }) {
  // let sharedState = {/* whatever you want */}

  return (
    <StoreContext.Provider value={sharedState}>
      {children}
    </StoreContext.Provider>
  );
}
  
export function useStoreContext() {
  return useContext(StoreContext);
}