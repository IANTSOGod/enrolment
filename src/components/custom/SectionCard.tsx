import type { ReactNode } from "react";

export default function SectionCard({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[5px] border border-gray-200 bg-white p-3.5">
      <div className="mb-2.5 flex items-center gap-1.5 border-b border-gray-100 pb-2">
        <span className="text-[#173d68]">{icon}</span>
        <h2 className="text-[12px] font-semibold text-[#092b50]">{title}</h2>
      </div>
      {children}
    </section>
  );
}
