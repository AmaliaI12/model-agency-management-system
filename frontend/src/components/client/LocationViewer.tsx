import React from "react";

interface Location {
    id: number;
    name: string;
    adresa: string;
    city: string;
    capacity: number;
    phone: string;
}

interface Props {
  locations: Location[];
}

const LocationViewer: React.FC<Props> = ({ locations }) => {
  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>City</th>
          <th>Capacity</th>
          <th>Contact</th>
        </tr>
      </thead>
      <tbody>
        {locations.map((l) => (
          <tr key={l.id}>
            <td>{l.name}</td>
            <td>{l.adresa}</td>
            <td>{l.city}</td>
            <td>{l.capacity}</td>
            <td>{l.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LocationViewer;
