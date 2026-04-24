import { useState } from "react";
import { useLoan } from "../context/LoanContext";
import { Link } from "react-router-dom";

const formatCurrency = (val: number) =>
  "$" + val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function LoanPreview() {
  const { loanData, calculated, setLoanData } = useLoan();
  const [editAmount, setEditAmount] = useState(loanData.amount.toString());
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  const { rate, duration, eligibleAmount } = loanData;
  const { monthlyPayment, totalInterest, totalRepayment } = calculated;

  const handleAmountChange = (value: string) => {
    setEditAmount(value);
    setError("");
  };

  const handleAmountSave = () => {
    const newAmount = parseFloat(editAmount);
    if (isNaN(newAmount) || newAmount <= 0) {
      setError("Please enter a valid amount");
      return;
    }
    if (newAmount > eligibleAmount) {
      setError(`Amount cannot exceed eligible amount of ${formatCurrency(eligibleAmount)}`);
      return;
    }
    if (newAmount < 1000) {
      setError("Minimum loan amount is $1,000");
      return;
    }
    setLoanData({ amount: newAmount });
    setIsEditing(false);
    setError("");
  };

  return (
    <div className="min-h-[calc(100vh-144px)] bg-ghost-white py-20 px-4">
      <div className="max-w-[800px] mx-auto">
        <div className="bg-white rounded-[20px] card-shadow p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-waafi-soft-purple flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-waafi-purple">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.07 60.07 0 00-11.053-6.368M7.5 14.25L5.106 5.062M15.75 14.25l-3.477 2.258" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Your Loan Preview</h2>
            <p className="text-slate-500">Here are the details of your potential loan</p>
          </div>

          {/* Loan Details */}
          <div className="space-y-6">
            <div className="border-l-4 border-waafi-purple bg-gradient-to-r from-waafi-soft-purple/50 to-transparent rounded-r-xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm text-slate-500 mb-1">Loan Amount</p>
                  {isEditing ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 text-xl">$</span>
                        <input
                          type="number"
                          value={editAmount}
                          onChange={(e) => handleAmountChange(e.target.value)}
                          className="text-2xl font-bold text-slate-900 bg-transparent border-b-2 border-waafi-purple focus:outline-none w-full"
                          autoFocus
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={handleAmountSave}
                          className="px-4 py-1 bg-waafi-purple text-white text-sm rounded-lg hover:bg-[#15803d] transition-colors cursor-pointer"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setIsEditing(false);
                            setEditAmount(loanData.amount.toString());
                            setError("");
                          }}
                          className="px-4 py-1 border border-slate-300 text-sm rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <p className="text-2xl font-bold text-slate-900">{formatCurrency(loanData.amount)}</p>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="text-waafi-purple hover:text-[#15803d] transition-colors cursor-pointer"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                      </button>
                    </div>
                  )}
                  {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
                  <p className="text-xs text-slate-400 mt-1">Eligible up to: {formatCurrency(eligibleAmount)}</p>
                </div>
                <div className="flex gap-6">
                  <div>
                    <p className="text-xs text-slate-500">Interest Rate</p>
                    <p className="text-sm font-semibold text-slate-700">{rate}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Duration</p>
                    <p className="text-sm font-semibold text-slate-700">{duration} months</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-waafi-purple bg-gradient-to-r from-waafi-soft-purple/50 to-transparent rounded-r-xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Monthly Payment</p>
                  <p className="text-2xl font-bold text-slate-900">{formatCurrency(monthlyPayment)}</p>
                </div>
                <div className="flex gap-6">
                  <div>
                    <p className="text-xs text-slate-500">Total Interest</p>
                    <p className="text-sm font-semibold text-slate-700">{formatCurrency(totalInterest)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Total Repayment</p>
                    <p className="text-sm font-semibold text-slate-700">{formatCurrency(totalRepayment)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 space-y-4">
            <Link 
              to="/login" 
              className="w-full h-[52px] bg-waafi-purple hover:bg-[#15803d] text-white font-semibold rounded-2xl btn-shadow transition-colors duration-200 cursor-pointer flex items-center justify-center"
            >
              Confirm and Proceed to Login
            </Link>
            
            <Link
              to="/calculator"
              className="w-full h-[52px] border border-slate-300 hover:border-slate-400 text-slate-900 font-semibold rounded-2xl transition-colors duration-200 cursor-pointer flex items-center justify-center"
            >
              Back to Calculator
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}