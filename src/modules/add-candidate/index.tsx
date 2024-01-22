import React from "react";
import CandidateForm from "../../components/form";
import Header from "../../components/header";

const AddCandidates = (): React.JSX.Element => {
  return (
    <React.Fragment>
      <Header />
      <section className="py-4 px-4 md:px-8 lg:px-16">
        <CandidateForm />
      </section>
    </React.Fragment>
  );
};

export default AddCandidates;
