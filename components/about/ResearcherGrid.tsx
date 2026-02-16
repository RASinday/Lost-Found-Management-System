import ResearcherCard, { Researcher } from "./ResearcherCard";

const RESEARCHERS: Researcher[] = [
  {
    name: "Heinz Harrold G. Tan",
    email: "sourcepolemos@gmail.com",
    imageSrc: "/images/researchers/heinz2.png",
  },
  {
    name: "Jonna Mae L. Pole",
    email: "polejonnamae@gmail.com",
    imageSrc: "/images/researchers/jonna2.png",
  },
  {
    name: "Noellyn A. Sinday",
    email: "noellyn15@gmail.com",
    imageSrc: "/images/researchers/noellyn3.png",
  },
  {
    name: "Shane D. Alejo",
    email: "acia5144@gmail.com",
    imageSrc: "/images/researchers/shane2.png",
  },
  {
    name: "Brendalyn R. Barbusa",
    email: "brendabarbusa372@gmail.com",
    imageSrc: "/images/researchers/brendalyn2.png",
  },
  {
    name: "Yuhanna V. Lina",
    email: "yuhannalina23@gmail.com",
    imageSrc: "/images/researchers/yuhanna2.png",
  },
];

export default function ResearcherGrid() {
  return (
    <section className="space-y-10">
      <div className="flex items-center justify-center gap-6 text-base md:text-lg tracking-[0.35em] text-amber-400 font-bold">
        <span className="h-px w-24 md:w-90 bg-slate-600" />
        <span className="uppercase text-center text-[20px]">Researcher Team</span>
        <span className="h-px w-24 md:w-90 bg-slate-600" />
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {RESEARCHERS.map((r) => (
          <ResearcherCard
            key={r.email ?? r.name}
            name={r.name}
            email={r.email}
            imageSrc={r.imageSrc}
          />
        ))}
      </div>
    </section>
  );
}