import '../styles/AdminDashboard.css';
import AgenciesTable from "../components/admin/AgenciesTable";
import ModelsTable from '../components/admin/ModelsTable';
import LocationsTable from '../components/admin/LocationsTable';


export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <nav className="admin-nav">
        <h2>Admin Dashboard</h2>
        <ul>
          <li><a href="#agencies">Agencies</a></li>
          <li><a href="#models">Models</a></li>
          <li><a href="#locations">Locations</a></li>
          <li><a href="#clients">Clients</a></li>
        </ul>
      </nav>

      <main className="admin-content">
        <section id="agencies">
          <h3>Manage Agencies</h3>
          <AgenciesTable />
        </section>

        <section id="models"> 
          <h3>Manage Models</h3>
          <ModelsTable />
        </section>

        <section id="locations">
          <h3>Manage Locations</h3>
            <LocationsTable />
        </section>

        <section id="clients">
          <h3>Manage Clients</h3>
        </section>

        <section id="categories">
          <h3>Manage Categories</h3>
        </section>

        <section id="locations">
          <h3>Manage Clients</h3>
        </section>
        
      </main>
    </div>
  );
}
