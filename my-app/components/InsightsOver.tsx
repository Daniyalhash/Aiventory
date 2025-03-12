import '../src/styles/InsightsOver.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faRefresh } from '@fortawesome/free-solid-svg-icons';

export default function InsightsOver({ onRefresh }: { onRefresh: () => void }) {
  return (
    <section className="InsightsOversection">
      <div className="InsightsOverText">
        <h2 className="InsightsOversecHead">Insights Overview</h2>
        <p className="InsightsOversecSubhead">A comprehensive snapshot of your stock levels with vendors, Product benchmark trends, and Product benchmark with best vendors</p>
      </div>
      <div className="InsightsOverButton">
        <button className="RefreshPages" onClick={onRefresh}>
          <FontAwesomeIcon icon={faRefresh} className="icon" />
          Refresh
        </button>
      </div>
    </section>
  );
}
