import React from "react";

interface ChildrenProps {
  children: React.ReactNode;
  classname?: string;
}

export default function ColumnLayout({ children, classname }: ChildrenProps) {
  return (
    <div className={`rounded-lg row-start-2 col-span-3 ${classname}`}>
      {children}
    </div>
  );
}
