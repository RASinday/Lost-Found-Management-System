import { Card, CardContent } from "@/components/ui/card";

interface PurposeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlighted?: boolean;
}

export default function PurposeCard({
  icon,
  title,
  description,
  highlighted = false,
}: PurposeCardProps) {
  return (
    <Card
      className={[
        "bg-[#405b82] text-white rounded-2xl",
        "w-full h-full min-h-75 sm:min-h-87.5",
        "shadow-md shadow-black/20",
        highlighted ? "border border-amber-400/80" : "border border-white/10",
      ].join(" ")}
    >
      <CardContent className="flex h-full flex-col p-6 sm:p-8 md:p-10">
        <div className="mb-4 sm:mb-6 md:mb-10 flex h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 items-center justify-center rounded-lg bg-[#1f2f4d]">
          {icon}
        </div>

        <h3 className="text-base sm:text-lg md:text-[20px] font-semibold leading-snug">
          {title}
        </h3>

        <p className="mt-4 sm:mt-5 md:mt-6 text-sm sm:text-[15px] leading-6 sm:leading-7 text-white/80">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
