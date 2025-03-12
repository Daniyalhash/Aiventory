import Link from 'next/link';
import '../src/styles/dashboardCard2.css';


const DashboardCard2 = ({ title, value, description, link, bgColor, graphContent }) => {
  return (
    <div className={`card2 ${bgColor}`}>
      <div className="cardContent2">
      <h3 className="cardTitle2">{title}</h3>        
      <div className="graphSection2">
        <p>{description}</p>
        <div className="graphShow">
        {graphContent} {/* Render the chart here */}

        </div>
      </div>
      <Link href={link}>
           <button className="iconArrow2">→</button>
         </Link>
      </div>
     
    </div>
  );
};

export default DashboardCard2;
