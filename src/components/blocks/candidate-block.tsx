import React from "react";

interface CandidateBlockProps {
  children: React.ReactNode;
  heading: string;
  showData?: boolean;
}

const CandidateBlock = ({
  children,
  heading,
  showData,
}: CandidateBlockProps): React.JSX.Element => {
  return (
    <section className="bg-gray-100 h-96 p-4 shadow overflow-auto">
      <h3 className="text-gray-600 text-lg">{heading}</h3>
      {showData ? children : <div className="text-center mt-32">No data</div>}
    </section>
  );
};

export default CandidateBlock;
