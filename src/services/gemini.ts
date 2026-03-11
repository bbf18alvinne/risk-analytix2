import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface CreditApplicantData {
  age: number;
  sex: "male" | "female";
  job: number;
  housing: "own" | "rent" | "free";
  savingAccounts: "little" | "moderate" | "quite rich" | "rich" | "unknown";
  checkingAccount: "little" | "moderate" | "rich" | "unknown";
  creditAmount: number;
  duration: number;
  purpose: string;
}

export async function predictCreditRisk(data: CreditApplicantData) {
  const prompt = `
    You are a professional credit risk analyst. Based on the following applicant data from the German Credit Dataset context, predict if the credit risk is "Good" or "Bad".
    
    Applicant Data:
    - Age: ${data.age}
    - Sex: ${data.sex}
    - Job Level (0-3): ${data.job}
    - Housing: ${data.housing}
    - Saving Accounts: ${data.savingAccounts}
    - Checking Account: ${data.checkingAccount}
    - Credit Amount: ${data.creditAmount} Ksh
    - Duration: ${data.duration} months
    - Purpose: ${data.purpose}
    
    Provide your response in JSON format with the following structure. Ensure the probability is a nuanced estimate (e.g., 0.72 instead of just 0.7) based on the specific combination of risk factors:
    {
      "risk": "Good" | "Bad",
      "probability": number (a granular float between 0 and 1 reflecting specific risk weights),
      "reasoning": "A brief explanation of why this specific probability was assigned.",
      "recommendation": "A short recommendation for the lender."
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");
    const parsed = JSON.parse(text);
    
    // Ensure probability is a number
    if (typeof parsed.probability === 'string') {
      parsed.probability = parseFloat(parsed.probability);
    }
    
    if (isNaN(parsed.probability)) {
      parsed.probability = 0.5; // Default fallback
    }

    return parsed;
  } catch (error) {
    console.error("Error predicting credit risk:", error);
    throw error;
  }
}
