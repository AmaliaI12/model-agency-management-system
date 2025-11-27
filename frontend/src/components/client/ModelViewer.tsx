import React from "react";

interface Model {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  height: number;
  weight: number;
  agencyName: string;
  date: string;
  categoryName: string;
  gender: string;
}

interface Props {
  models: Model[];
}

const ModelViewer: React.FC<Props> = ({ models }) => {
  return (
    <div style={{ padding: "20px" }}>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "white",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={th}>Name</th>
            <th style={th}>Category</th>
            <th style={th}>Age</th>
            <th style={th}>Height</th>
            <th style={th}>Weight</th>
            <th style={th}>Gender</th>

          </tr>
        </thead>

        <tbody>
          {models.map((m) => (
            <tr key={m.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={td}>{m.firstName + ' ' + m.lastName}</td>
              <td style={td}>{m.categoryName}</td>
              <td style={td}>{m.age}</td>
              <td style={td}>{m.height}</td>
              <td style={td}>{m.weight}</td>
              <td style={td}>{m.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {models.length === 0 && (
        <p style={{ marginTop: "20px", textAlign: "center" }}>No models found.</p>
      )}
    </div>
  );
};

const th: React.CSSProperties = {
  padding: "12px",
  textAlign: "left",
  fontWeight: "bold",
  borderBottom: "2px solid #ddd",
};

const td: React.CSSProperties = {
  padding: "10px",
  textAlign: "left",
};

export default ModelViewer;
