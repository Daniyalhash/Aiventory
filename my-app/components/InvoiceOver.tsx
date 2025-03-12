// components/SettingOver.tsx
import '../src/styles/NotificationsOver.css';
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faChevronLeft,
  faEdit,
  faCamera,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
export default function InvoiceOver() {
  return (
    <section className="section">
        {/* Back to Settings Link */}
        <Link href={"/dashboard/setting"} className="Backsettings">
        <FontAwesomeIcon icon={faChevronLeft} className="EPicon" />
        <span>Settings</span>
      </Link>
      <h2 className="secHead">Invoice Center</h2>
      <p className="secSubhead">Manage system incoming invoices from external vendors</p>
    </section>
  );
}
