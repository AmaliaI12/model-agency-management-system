import React from "react";

interface Agency {
    id: number;
    name: string;
    adresa: string;
    email: string;
    telefon: string;
}

interface Props {
  agencies: Agency[];
}

const AgenciesViewer: React.FC<Props> = ({ agencies }) => {
  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Email</th>
          <th>Contact</th>
        </tr>
      </thead>
      <tbody>
        {agencies.map((a) => (
          <tr key={a.id}>
            <td>{a.name}</td>
            <td>{a.adresa}</td>
            <td>{a.email}</td>
            <td>{a.telefon}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AgenciesViewer;
