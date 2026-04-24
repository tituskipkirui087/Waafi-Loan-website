import { useState } from "react";
import { Link } from "react-router-dom";

const countries = [
  { code: "US", name: "United States", phone: "+1", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", phone: "+44", flag: "🇬🇧" },
  { code: "CA", name: "Canada", phone: "+1", flag: "🇨🇦" },
  { code: "AU", name: "Australia", phone: "+61", flag: "🇦🇺" },
  { code: "DE", name: "Germany", phone: "+49", flag: "🇩🇪" },
  { code: "FR", name: "France", phone: "+33", flag: "🇫🇷" },
  { code: "KE", name: "Kenya", phone: "+254", flag: "🇰🇪" },
  { code: "NG", name: "Nigeria", phone: "+234", flag: "🇳🇬" },
  { code: "GH", name: "Ghana", phone: "+233", flag: "🇬🇭" },
  { code: "UG", name: "Uganda", phone: "+256", flag: "🇺🇬" },
  { code: "TZ", name: "Tanzania", phone: "+255", flag: "🇹🇿" },
  { code: "ET", name: "Ethiopia", phone: "+251", flag: "🇪🇹" },
  { code: "RW", name: "Rwanda", phone: "+250", flag: "🇷🇼" },
  { code: "ZA", name: "South Africa", phone: "+27", flag: "🇿🇦" },
  { code: "IN", name: "India", phone: "+91", flag: "🇮🇳" },
  { code: "CN", name: "China", phone: "+86", flag: "🇨🇳" },
  { code: "JP", name: "Japan", phone: "+81", flag: "🇯🇵" },
  { code: "KR", name: "South Korea", phone: "+82", flag: "🇰🇷" },
  { code: "BR", name: "Brazil", phone: "+55", flag: "🇧🇷" },
  { code: "MX", name: "Mexico", phone: "+52", flag: "🇲🇽" },
];

export default function Login() {
  const [selectedCountry, setSelectedCountry] = useState(countries[6]); // Default to Kenya
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleCountrySelect = (country: typeof countries[0]) => {
    setSelectedCountry(country);
    setShowDropdown(false);
  };

  return (
    <div className="min-h-[calc(100vh-144px)] bg-ghost-white py-20 px-4">
      <div className="max-w-[400px] mx-auto">
        <div className="bg-white rounded-[20px] card-shadow p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-waafi-soft-purple flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-waafi-purple">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112.057 21l-2.036-3.054a2.25 2.25 0 00-1.063-1.594l-2.251-2.241a2.25 2.25 0 00-3.198 0l-2.251 2.241a2.25 2.25 0 00-1.063 1.594L4.501 20.118z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Login to Waafi</h2>
            <p className="text-slate-500">Access your account to continue with your loan application</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Email or Phone */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email or Phone Number</label>
              <input
                type="text"
                required
                className="w-full h-12 pl-4 pr-8 rounded-xl border border-slate-200 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-waafi-purple/30 focus:border-waafi-purple transition-all"
                placeholder="Enter your email or phone"
              />
            </div>

            {/* Country Selector with Phone Code */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
              <div className="flex gap-2">
                {/* Country Selector */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="h-12 px-3 rounded-xl border border-slate-200 bg-white hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-waafi-purple/30 focus:border-waafi-purple transition-all flex items-center gap-2 min-w-[120px]"
                  >
                    <span className="text-lg">{selectedCountry.flag}</span>
                    <span className="text-sm font-medium text-slate-900">{selectedCountry.phone}</span>
                    <svg className="w-4 h-4 text-slate-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown */}
                  {showDropdown && (
                    <div className="absolute top-full left-0 mt-1 w-[280px] max-h-[300px] overflow-y-auto bg-white border border-slate-200 rounded-xl shadow-lg z-50">
                      {countries.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() => handleCountrySelect(country)}
                          className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-50 transition-colors ${
                            selectedCountry.code === country.code ? "bg-waafi-soft-purple" : ""
                          }`}
                        >
                          <span className="text-lg">{country.flag}</span>
                          <span className="text-sm font-medium text-slate-900 flex-1 text-left">{country.name}</span>
                          <span className="text-sm text-slate-500">{country.phone}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Phone Number Input */}
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 15))}
                  className="flex-1 h-12 pl-4 pr-4 rounded-xl border border-slate-200 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-waafi-purple/30 focus:border-waafi-purple transition-all"
                  placeholder="Phone number"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
              <input
                type="password"
                required
                className="w-full h-12 pl-4 pr-8 rounded-xl border border-slate-200 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-waafi-purple/30 focus:border-waafi-purple transition-all"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-slate-500">
                <input type="checkbox" className="h-4 w-4 text-waafi-purple focus:ring-waafi-purple border-gray-300 rounded" />
                <span className="ml-2">Remember me</span>
              </label>
              <Link to="#" className="text-sm text-waafi-purple hover:text-waafi-dark">Forgot password?</Link>
            </div>

            <button
              type="submit"
              className="w-full h-[52px] bg-waafi-purple hover:bg-[#7C3AED] text-white font-semibold rounded-2xl btn-shadow transition-colors duration-200 cursor-pointer"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center text-slate-500">
            <p>Don't have an account? <Link to="#" className="text-waafi-purple hover:text-waafi-dark">Sign up</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
