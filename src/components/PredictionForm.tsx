import React, { useState } from 'react';
import { CreditApplicantData, predictCreditRisk } from '../services/gemini';
import { Loader2, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { cn } from '../lib/utils';

interface PredictionResult {
  risk: 'Good' | 'Bad';
  probability: number;
  reasoning: string;
  recommendation: string;
}

export default function PredictionForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<CreditApplicantData>({
    age: 30,
    sex: 'male',
    job: 2,
    housing: 'own',
    savingAccounts: 'little',
    checkingAccount: 'little',
    creditAmount: 2000,
    duration: 12,
    purpose: 'car',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const prediction = await predictCreditRisk(formData);
      setResult(prediction);
    } catch (err) {
      setError('Failed to generate prediction. Please check your API key and try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' || name === 'job' || name === 'creditAmount' || name === 'duration' 
        ? Number(value) 
        : value
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-black/5">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Info className="w-6 h-6 text-emerald-600" />
          Applicant Information
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Sex</label>
              <select
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Job Level (0-3)</label>
              <input
                type="number"
                name="job"
                min="0"
                max="3"
                value={formData.job}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Housing</label>
              <select
                name="housing"
                value={formData.housing}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              >
                <option value="own">Own</option>
                <option value="rent">Rent</option>
                <option value="free">Free</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Savings Account</label>
              <select
                name="savingAccounts"
                value={formData.savingAccounts}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              >
                <option value="little">Little</option>
                <option value="moderate">Moderate</option>
                <option value="quite rich">Quite Rich</option>
                <option value="rich">Rich</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Checking Account</label>
              <select
                name="checkingAccount"
                value={formData.checkingAccount}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              >
                <option value="little">Little</option>
                <option value="moderate">Moderate</option>
                <option value="rich">Rich</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Credit Amount (Ksh)</label>
              <input
                type="number"
                name="creditAmount"
                value={formData.creditAmount}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Duration (Months)</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Purpose</label>
            <select
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            >
              <option value="car">Car</option>
              <option value="furniture/equipment">Furniture/Equipment</option>
              <option value="radio/TV">Radio/TV</option>
              <option value="domestic appliances">Domestic Appliances</option>
              <option value="repairs">Repairs</option>
              <option value="education">Education</option>
              <option value="business">Business</option>
              <option value="vacation/others">Vacation/Others</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing Risk...
              </>
            ) : (
              'Predict Credit Risk'
            )}
          </button>
        </form>
      </div>

      <div className="flex flex-col gap-6">
        {error && (
          <div className="bg-red-50 border border-red-200 p-6 rounded-2xl flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-red-600 shrink-0" />
            <div>
              <h3 className="font-semibold text-red-900">Error</h3>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        {result ? (
          <div className={cn(
            "p-8 rounded-2xl border transition-all animate-in fade-in slide-in-from-bottom-4 duration-500",
            result.risk === 'Good' 
              ? "bg-emerald-50 border-emerald-200" 
              : "bg-amber-50 border-amber-200"
          )}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={cn(
                "text-2xl font-bold flex items-center gap-2",
                result.risk === 'Good' ? "text-emerald-900" : "text-amber-900"
              )}>
                {result.risk === 'Good' ? (
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                ) : (
                  <AlertCircle className="w-8 h-8 text-amber-600" />
                )}
                {result.risk} Credit Risk
              </h3>
              <div className="text-right">
                <span className="text-sm font-medium opacity-60 uppercase tracking-wider">Confidence</span>
                <p className="text-2xl font-mono font-bold">
                  {typeof result.probability === 'number' && !isNaN(result.probability) 
                    ? (result.probability * 100).toFixed(1) 
                    : '0.0'}%
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider opacity-60 mb-2">Analysis Reasoning</h4>
                <p className="text-gray-800 leading-relaxed">{result.reasoning}</p>
              </div>
              
              <div className="pt-6 border-t border-black/5">
                <h4 className="text-sm font-semibold uppercase tracking-wider opacity-60 mb-2">Recommendation</h4>
                <p className="text-gray-800 font-medium italic">"{result.recommendation}"</p>
              </div>
            </div>
          </div>
        ) : !loading && (
          <div className="flex-1 bg-gray-50 border border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center p-12 text-center text-gray-500">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Info className="w-8 h-8 opacity-40" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Ready for Analysis</h3>
            <p className="max-w-xs text-sm">
              Enter applicant details and click predict to see the AI-powered risk assessment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
