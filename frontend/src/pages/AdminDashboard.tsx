import '../styles/AdminDashboard.css';
import AgenciesTable from "../components/admin/AgenciesTable";
import ModelsTable from '../components/admin/ModelsTable';
import LocationsTable from '../components/admin/LocationsTable';
import ClientsTable from '../components/admin/ClientsTable';
import CategoriesTable from '../components/admin/CategoriesTable';

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
          <li><a href="#categories">Model Categories</a></li>
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
          <ClientsTable />
        </section>

        <section id="categories">
          <h3>Manage Model Categories</h3>
          <CategoriesTable />
        </section>

        <section id="locations">
          <h3>Manage Clients</h3>
        </section>

      </main>
    </div>
  );
}
