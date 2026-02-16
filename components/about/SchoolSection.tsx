import Image from "next/image";

export default function SchoolSection() {
  return (
    <section className="relative mt-12">
      {/* group enables hover on the whole card */}
      <div className="group relative mx-auto max-w-6xl h-64 md:h-90 lg:h-105 overflow-hidden rounded-3xl">
        {/* background layer with zoom effect */}
        <div
          className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(5,10,31,0) 0%, rgba(5,10,31,0.9) 65%, rgba(5,10,31,1) 85%), url('/images/school/hilongos-campus.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center 75%",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* content layer */}
        <div className="relative flex h-full items-center justify-end px-8 md:px-10">
          <div
            className="w-full md:w-1/2 px-4 md:px-6 text-slate-50"
            style={{ textShadow: "0 2px 6px rgba(0,0,0,0.65)" }}
          >
            <div className="mb-3 inline-flex items-center gap-2 text-amber-400">
              <Image
                src="/logoschool.svg"
                alt="Hilongos landmark logo"
                width={24}
                height={24}
                className="shrink-0 w-5 h-5"
              />
              <span className="text-[1.0rem] font-semibold tracking-[0.18em] uppercase">
                Our Institution
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-semibold">
              Hilongos National Vocational School
            </h2>

            <p className="mt-4 text-xs md:text-sm leading-relaxed">
              The institution supports integrity, responsibility, and digital
              innovation by implementing systems like HNVSearch to improve
              student services and campus management. HNVS is committed to
              fostering a safe and supportive environment for all its members.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}