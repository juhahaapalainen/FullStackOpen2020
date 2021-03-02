import React from "react";

const Filter = ({ handleFilter }) => {
  return (
    <form>
      <div>
        filter shown with:{" "}
        <input
          type="text"
          name="name"
          onChange={(e) => handleFilter(e.target.value)}
        />
      </div>
    </form>
  );
};
export default Filter;
