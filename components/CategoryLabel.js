import React from "react";
import Link from "next/link";

export default function CategoryLabel({ children }) {
  return (
    <div className={`px-2 py-1 bg-red-600 text-gray-100 font-bold rounded`}>
      <Link href={`/blog/category/${children.toLowerCase()}`}>{children}</Link>
    </div>
  );
}
