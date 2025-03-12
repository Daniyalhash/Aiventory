"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '@/styles/Predictions.css';
import PredictionsOver from "@/components/PredictionsOver"; // Import your component

export default function Predictions() {
    const salesData = [
        { month: 'Jan', sales: 1200, production: 1000 },
        { month: 'Feb', sales: 1500, production: 1300 },
        { month: 'Mar', sales: 1800, production: 1600 },
        { month: 'Apr', sales: 1600, production: 1400 },
        { month: 'May', sales: 2000, production: 1800 },
        { month: 'Jun', sales: 1900, production: 1700 },
    ];

    const demandData = [
        { product: 'Apples', demand: 250 },
        { product: 'Milk', demand: 180 },
        { product: 'Bread', demand: 200 },
        { product: 'Eggs', demand: 300 },
        { product: 'Chicken', demand: 150 },
        { product: 'Rice', demand: 100 },
    ];

    return (
        <div className="VendorPage">
            <PredictionsOver /> {/* Render your heading component */}
            <div className="mainAnalysis">
                <div className="chart-container">
                    <h2>Sales vs. Production (Monthly)</h2>
                    <p className="chart-guidance">
                        This chart compares the monthly sales figures against the production output.
                        It helps visualize if production is meeting sales demand and identify potential
                        overstocking or underproduction.
                    </p>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="sales" fill="#8884d8" name="Sales" />
                            <Bar dataKey="production" fill="#82ca9d" name="Production" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-container">
                    <h2>Product Demand Prediction</h2>
                    <p className="chart-guidance">
                        This chart shows the predicted demand for each product. It helps in
                        inventory planning and ensures that sufficient stock is available to
                        meet anticipated customer demand.
                    </p>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={demandData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="product" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="demand" fill="#ffc658" name="Demand" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}