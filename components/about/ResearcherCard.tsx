import Image from "next/image";

export type Researcher = {
  name: string;
  imageSrc: string;
  email?: string;
};

type ResearcherCardProps = Researcher;

export function ResearcherCard({ name, imageSrc, email }: ResearcherCardProps) {
  return (
    <div className="group relative flex flex-col items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 px-6 py-6 shadow-lg shadow-black/30 transition-all duration-200 hover:border-amber-500/80 hover:shadow-amber-500/20">
      <div className="h-32 w-32 overflow-hidden rounded-xl bg-slate-800">
        <img
          src={imageSrc}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
      </div>
      <div className="text-center text-slate-50">
        <p className="text-sm font-semibold transition-colors duration-200 group-hover:text-amber-400">
          {name}
        </p>
        {email && (
          <a
            href={`mailto:${email}`}
            className="mt-1 block break-all text-xs text-sky-300 transition-colors duration-200 group-hover:text-sky-200"
          >
            {email}
          </a>
        )}
      </div>
      <span className="pointer-events-none absolute inset-x-6 bottom-3 h-1 origin-center scale-x-0 rounded-full bg-amber-500 transition-transform duration-200 group-hover:scale-x-100" />
    </div>
  );
}

export default ResearcherCard;