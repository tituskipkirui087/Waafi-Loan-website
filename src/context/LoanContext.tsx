import { createContext, useContext, useState, useMemo } from "react";
import type { ReactNode } from "react";

export const FIXED_RATE = 12.5;

interface LoanData {
  amount: number;
  rate: number;
  duration: number;
  eligibleAmount: number;
}

interface CalculatedData {
  monthlyPayment: number;
  totalInterest: number;
  totalRepayment: number;
}

interface LoanContextProps {
  loanData: LoanData;
  calculated: CalculatedData;
  setLoanData: (data: Partial<LoanData>) => void;
}

const LoanContext = createContext<LoanContextProps | undefined>(undefined);

export const LoanProvider = ({ children }: { children: ReactNode }) => {
  const [loanData, setLoanDataState] = useState<LoanData>({
    amount: 5000,
    rate: FIXED_RATE,
    duration: 12,
    eligibleAmount: 50000,
  });

  const calculated: CalculatedData = useMemo(() => {
    const r = loanData.rate / 100 / 12;
    const n = loanData.duration;
    const monthlyPayment = r === 0 ? loanData.amount / n : (loanData.amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalRepayment = monthlyPayment * n;
    const totalInterest = totalRepayment - loanData.amount;
    return { monthlyPayment, totalInterest, totalRepayment };
  }, [loanData.amount, loanData.rate, loanData.duration]);

  const setLoanData = (data: Partial<LoanData>) => {
    setLoanDataState(prev => {
      // Rate is fixed, always use FIXED_RATE
      const newData = { ...prev, ...data, rate: FIXED_RATE };
      // Ensure amount doesn't exceed eligible amount
      if (data.amount !== undefined) {
        newData.amount = Math.min(data.amount, prev.eligibleAmount);
      }
      return newData;
    });
  };

  return (
    <LoanContext.Provider value={{ loanData, calculated, setLoanData }}>
      {children}
    </LoanContext.Provider>
  );
};

export const useLoan = () => {
  const context = useContext(LoanContext);
  if (!context) {
    throw new Error("useLoan must be used within a LoanProvider");
  }
  return context;
};
