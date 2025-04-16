import React from "react";

type QuoteProp = {
  children: React.ReactNode;
};

export function Verse({ children }: QuoteProp) {
  return (
    <>
      <p className="verse-section">{children}</p>
    </>
  );
}
