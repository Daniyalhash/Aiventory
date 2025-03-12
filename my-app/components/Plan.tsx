"use client";
import React, { useState } from "react";
import '@/styles/Plan.css'; // Import the new CSS file

const Plan = () => {
    const [selectedPlan, setSelectedPlan] = useState("free");

    const freeFeatures = [
        "Free 14-30 day trial",
        "Basic demand forecasting",
        "Simple inventory management",
        "Limited access to data analysis, file uploads",
    ];

    const premiumFeatures = [
        "Full access with no trial limitations",
        "Advanced demand forecasting",
        "Complete inventory management",
        "Unlimited access to data analysis and file uploads",
        "Priority customer support",
    ];

    return (
        <div className="container">
            <div className="plan-head">
                <h2 className="title">Simple Plans For Everyone</h2>
                <p className="subtitle">
                    No hidden costs, No string attached. <br />
                    Just straightforward pricing for all.
                </p>
            </div>
        
            <div className="plan-section">
                <div className="plan-features">
                    {selectedPlan === "free" 
                        ? freeFeatures.map((feature, index) => (
                            <div key={index} className="feature-row">
                                <p>{feature}</p>
                                <span className="text-xl">✔️</span>
                            </div>
                        )) 
                        : premiumFeatures.map((feature, index) => (
                            <div key={index} className="feature-row">
                                <p>{feature}</p>
                                <span className="text-xl">✔️</span>
                            </div>
                        ))}
                </div>

                <div className="plan-selection">
                    <div
                        className={`plan-option ${selectedPlan === "free" ? "selected" : ""}`}
                        onClick={() => setSelectedPlan("free")}
                    >
                        <div className="plan-selection-1">
                            <div
                                className={`radio-button ${selectedPlan === "free" ? "selected" : ""}`}
                            />
                            <span className="font-semibold">Free Trial</span>
                        </div>
                        <span className="font-bold">R$0</span>
                    </div>

                    <div
                        className={`plan-option ${selectedPlan === "premium" ? "selected" : ""}`}
                        onClick={() => setSelectedPlan("premium")}
                    >
                        <div className="plan-selection-2">
                            <div
                                className={`radio-button ${selectedPlan === "premium" ? "selected" : ""}`}
                            />
                            <span className="font-semibold">Premium Plan</span>
                        </div>
                        <span className="font-bold">R$5000</span>
                    </div>
                </div>

            </div>
          
            <button className="choose-button">
                Choose Plan
            </button>
        </div>
    );
};

export default Plan;