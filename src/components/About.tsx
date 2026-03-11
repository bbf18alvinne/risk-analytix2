import React from 'react';

export default function About() {
  return (
    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-black/5 max-w-4xl mx-auto">
      <div className="prose prose-slate max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Project Description</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-4">AI-Powered Credit Risk Prediction System</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            This website presents an Artificial Intelligence application designed to predict the credit risk of loan applicants using machine learning techniques. The system demonstrates how modern AI technologies can assist financial institutions in making faster, smarter, and more reliable lending decisions. The application was developed using advanced AI development tools including <strong>Google AI Studio</strong> and <strong>Gemini</strong>, which provide powerful capabilities for building intelligent data-driven systems.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Credit risk assessment is a critical task for banks, financial institutions, and lending organizations. Before approving a loan, lenders must determine whether an applicant is likely to repay the borrowed amount within the agreed period. Poor credit risk evaluation may lead to loan defaults, resulting in financial losses for institutions. Traditional methods of evaluating loan applicants often involve manual analysis of financial records, employment history, and other demographic information. While this process can be effective, it is often time-consuming, subjective, and prone to human error.
          </p>
        </section>

        <section className="mb-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Purpose and Methodology</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            The purpose of this project is to develop an automated credit risk prediction system that uses machine learning to analyze historical financial data and identify patterns associated with reliable or risky borrowers. By applying artificial intelligence techniques, the system can learn from past data and make predictions about new loan applicants with a high degree of accuracy.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            The system is trained using the German Credit Dataset, a widely used dataset in financial risk analysis research. This dataset contains detailed information about individuals who previously applied for loans, including factors such as age, employment status, housing type, loan amount, loan duration, savings accounts, and checking account status. These variables provide valuable indicators that help machine learning models distinguish between applicants who are likely to repay their loans and those who may default.
          </p>
        </section>

        <section className="mb-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Interactive Experience</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            This website provides an interactive interface that allows users to explore the project and interact with the predictive model. Users can input relevant financial information about a potential loan applicant, and the system will analyze the data and generate a credit risk prediction. The goal is to demonstrate how artificial intelligence can support data-driven decision-making in financial environments.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            In addition to prediction functionality, the website also presents insights derived from the dataset, including visualizations that highlight patterns and relationships between financial attributes and credit risk outcomes. These insights help users understand the factors that influence creditworthiness and illustrate the analytical power of machine learning techniques.
          </p>
        </section>

        <footer className="pt-8 border-t border-gray-100">
          <p className="text-gray-600 italic">
            Overall, this project showcases the practical application of artificial intelligence in financial risk management. By combining machine learning algorithms with modern AI development tools such as Google AI Studio and Gemini, the system demonstrates how intelligent technologies can enhance financial analysis, improve efficiency, and reduce the risks associated with lending decisions.
          </p>
        </footer>
      </div>
    </div>
  );
}
