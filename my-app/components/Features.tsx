"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "@/styles/Features.css"; // Import your CSS styles
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
const features = [
    {
        title: "Demand Forecasting hidden",
        description: "Predict future sales trends using AI to ensure optimal stock levels",
        graphData: [
          { name: "Jan", value: 40 },
          { name: "Feb", value: 50 },
          { name: "Mar", value: 30 },
          { name: "Apr", value: 70 },
          { name: "May", value: 90 }
        ]
      },
      {
        title: "Demand Forecasting",
        description: "Predict future sales trends using AI to ensure optimal stock levels",
        graphData: [
          { name: "Jan", value: 40 },
          { name: "Feb", value: 50 },
          { name: "Mar", value: 30 },
          { name: "Apr", value: 70 },
          { name: "May", value: 90 }
        ],
        graphStyle: { type: "monotone", stroke: "#82ca9d" }
      },
      {
        title: "Auto Replenishment",
        description: "Automatically restock items based on demand patterns and sales data",
        graphData: [
          { name: "Jan", value: 20 },
          { name: "Feb", value: 60 },
          { name: "Mar", value: 40 },
          { name: "Apr", value: 80 },
          { name: "May", value: 100 }
        ],
        graphStyle: { type: "step", stroke: "#8884d8" }
      },
      {
        title: "Stock Optimization",
        description: "Ensure optimal stock levels by analyzing trends and reducing waste",
        graphData: [
          { name: "Jan", value: 30 },
          { name: "Feb", value: 40 },
          { name: "Mar", value: 50 },
          { name: "Apr", value: 60 },
          { name: "May", value: 90 }
        ],
        
        graphStyle: { type: "monotone", stroke: "#ff7300", strokeDasharray: "5 5" }
      }, {
    title: "Demand Forecasting hidden",
    description: "Predict future sales trends using AI to ensure optimal stock levels",
    graphData: [
      { name: "Jan", value: 40 },
      { name: "Feb", value: 50 },
      { name: "Mar", value: 30 },
      { name: "Apr", value: 70 },
      { name: "May", value: 90 }
    ]
  }
];

export default function Features() {
    const [selectedFeature, setSelectedFeature] = useState(1);
    const pathname = usePathname();
    const featureListRef = useRef(null);
    useEffect(() => {
        if (featureListRef.current) {
            const selectedItem = featureListRef.current.children[selectedFeature];
            if (selectedItem) {
                featureListRef.current.scrollTo({
                    top: selectedItem.offsetTop - featureListRef.current.offsetHeight / 2 + selectedItem.offsetHeight / 2,
                    behavior: "smooth",
                });
            }
        }
    }, [selectedFeature]);

  return (
    <div className="features-section">
        <div className="features-heading">
            <div className="features-heading-left">
                <h2>
                Explore <span className="features-span">AI-powered</span> tools that transform your business management
                </h2>
            </div>
            <div className="features-heading-right">
                <Link href="/dashboard" className={pathname === '/dashboard' ? 'active' : ''}>
                    GO DEMO
                    <FontAwesomeIcon icon={faArrowUp} className="icon" />
                </Link>
            </div>
           
        </div>
        <div className="features-container">
        <div className="graph-container">
          <ResponsiveContainer 
          width="90%" 
          height={300} 
          style={{ 
            backgroundColor: "white", 
            borderRadius: "12px", 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", /* Optional: Adds subtle shadow */
            padding: "1rem"
          }}>
            <LineChart data={features[selectedFeature].graphData}
      style={{ backgroundColor: "white", borderRadius: "12px" }} /* Ensures graph styling */
            
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type={features[selectedFeature].graphStyle.type}
                dataKey="value"
                stroke={features[selectedFeature].graphStyle.stroke}
                strokeDasharray={features[selectedFeature].graphStyle.strokeDasharray || "0"}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
    
            <div className="feature-list" ref={featureListRef}>
            {features.map((feature, index) => (
                <motion.div
                key={index}
                onClick={() => setSelectedFeature(index)}
                className={`feature-item ${
                    selectedFeature === index ? "selected" : "unselected"
                }`}
                whileHover={{ scale: 1.05 }}
                >
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                </motion.div>
            ))}
            </div>
         </div>
    </div>

  );
}