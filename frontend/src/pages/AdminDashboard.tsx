import '../styles/AdminDashboard.css';
import AgenciesTable from "../components/admin/AgenciesTable";
import ModelsTable from '../components/admin/ModelsTable';
import LocationsTable from '../components/admin/LocationsTable';
import ClientsTable from '../components/admin/ClientsTable';
import CategoriesTable from '../components/admin/CategoriesTable';
import ContractsTable from '../components/admin/ContractsTable';
import EventsTable from '../components/admin/EventsTable';
import ParticipationsTable from '../components/admin/ParticipationTable';
import UsersTable from '../components/admin/UsersTable';

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
          <li><a href="#categories">Categories</a></li>
          <li><a href="#contracts">Contracts</a></li>
          <li><a href="#events">Events</a></li>
          <li><a href="#participations">Participations</a></li>
          <li><a href="#users">Users</a></li>
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

        <section id="contracts">
          <h3>Manage Contracts</h3>
          <ContractsTable />
        </section>
        
        <section id="events">
          <h3>Manage Events</h3>
          <EventsTable />
        </section>

        <section id="participations">
          <h3>Manage Participations</h3>
          <ParticipationsTable />
        </section>
        <section id="users">
          <h3>Manage Users</h3>
          <UsersTable />
        </section>

      </main>
    </div>
  );
}
