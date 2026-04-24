import { useNavigate } from "react-router-dom";
import { useLoan } from "../context/LoanContext";

export default function HeroDashboard() {
  const { loanData, setLoanData } = useLoan();
  const navigate = useNavigate();

  const handleLearnMore = () => {
    // Set eligible amount as 2x current amount (capped at 50k)
    const eligible = Math.min(loanData.amount * 2, 50000);
    setLoanData({
      amount: loanData.amount,
      rate: loanData.rate,
      duration: loanData.duration,
      eligibleAmount: eligible,
    });
    navigate("/loan-preview");
  };

  return (
    <section id="dashboard" className="pt-[72px] bg-white relative overflow-hidden">
      <div className="style_heroContainer" style={{ opacity: 1, transform: 'scale(1)' }}>
        <div className="style_content">
          <div className="style_info">
            <h1>WAAFI Financials &amp; Loans INC</h1>
            <p>Is your new life-style combining mobile money, loans, communication entertainment &amp; productivity in a unified app.</p>
            <button
              onClick={handleLearnMore}
              className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors cursor-pointer"
            >
              Learn More
            </button>
          </div>
          <div className="style_imgs">
            <div>
              <img alt="" loading="lazy" width="1024" height="1024" src="/images/frame7.webp" className="style_heroImg" />
              <img alt="" loading="lazy" width="270" height="222" src="/images/frame10.svg" className="style_merchantImg" />
            </div>
            <div>
              <img alt="" loading="lazy" width="270" height="144" src="/images/frame9.svg" className="style_calls" />
              <img alt="" loading="lazy" width="270" height="80" src="/images/voice.svg" className="style_voice" />
              <img alt="" loading="lazy" width="283" height="327" src="/images/frame8.svg" className="style_waafiHome" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
