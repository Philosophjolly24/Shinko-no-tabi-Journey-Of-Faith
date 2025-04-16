import React from "react";

type PassageProp = {
  children: React.ReactNode;
};

export function Passage({ children }: PassageProp) {
  return (
    <>
      <p className="passage-section">{children}</p>
    </>
  );
}
