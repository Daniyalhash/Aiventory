import Navbar from '../../components/Navbar';
import SectionB from '../../components/DashboardOver';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="dashboard-layout">
    <Navbar /> {/* This will appear on all dashboard pages */}
    <main className="dashboard-content">{children}</main>
  </div>
  );
};


