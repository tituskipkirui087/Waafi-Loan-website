import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface UIContextProps {
  eligibilityOpen: boolean;
  openEligibility: () => void;
  closeEligibility: () => void;
}

const UIContext = createContext<UIContextProps>({
  eligibilityOpen: false,
  openEligibility: () => {},
  closeEligibility: () => {},
});

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [eligibilityOpen, setEligibilityOpen] = useState(false);
  return (
    <UIContext.Provider value={{
      eligibilityOpen,
      openEligibility: () => setEligibilityOpen(true),
      closeEligibility: () => setEligibilityOpen(false),
    }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => useContext(UIContext);
