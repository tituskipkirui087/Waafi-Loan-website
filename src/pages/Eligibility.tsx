import { useLoan } from "../context/LoanContext";
import { useNavigate } from "react-router-dom";
import EligibilityChecker from "../sections/EligibilityChecker";

export default function Eligibility() {
  const { setLoanData } = useLoan();
  const navigate = useNavigate();

  const handleStartApplication = (loanData: any) => {
    setLoanData(loanData);
    navigate("/calculator");
  };

  return (
    <>
      <EligibilityChecker onStartApplication={handleStartApplication} />
    </>
  );
}