import React from "react";

interface GridLayoutPorps {
  children: React.ReactNode;
}

const GridLayout = ({ children }: GridLayoutPorps): React.JSX.Element => {
  return (
    <section className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-8">
      {children}
    </section>
  );
};

export default GridLayout;
