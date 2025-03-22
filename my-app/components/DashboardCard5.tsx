import Link from 'next/link';
import '../src/styles/customCard2.css';

export default function DashboardCard5({main, subTitle,value, description, link,description2, bgColor }) {
  return (
    <div className={`cardC5 compare2 ${bgColor}`}>
      {/* Background Overlay */}
      <div className="cardBackground">
        <div className="overlay"></div>
      </div>

      {/* Card Content */}
      <div className="cardContent5">
        {/* Top Right Arrow Button */}
        
        <h2 className="subTitle2">{main}</h2>
        <h2 className="subTitle">{subTitle}</h2>
        <div className="cardMain">
        <p className="cardValue">{value}</p>
        <p className="cardDescription">{description}</p>
        <p className="cardDescription2">{description2}</p>

        </div>
       
        
        {/* Promotion Button */}
      </div>
    </div>
  );
}
