import HeroDashboard from "../sections/HeroDashboard";
import StatsBar from "../sections/StatsBar";
import LoanProducts from "../sections/LoanProducts";
import HowItWorks from "../sections/HowItWorks";
import WhyWaafi from "../sections/WhyWaafi";
import AppDownload from "../sections/AppDownload";
import FAQSection from "../sections/FAQSection";

export default function Home() {
  return (
    <>
      <HeroDashboard />
      <StatsBar />
      <LoanProducts />
      <HowItWorks />
      <WhyWaafi />
      <AppDownload />
      <FAQSection />
    </>
  );
}
