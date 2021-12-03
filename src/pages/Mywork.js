import React from "react";
import Loading from "./Loading";

const Mywork = () => {
  const loaded = () => (
    <div className="Menu">
      <Loading />;
    </div>
  );

  return loaded() ? loaded() : <Loading />;
};

export default Mywork;
