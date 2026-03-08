import React from "react";

interface PurposeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const PurposeCard: React.FC<PurposeCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white/5 p-5 sm:p-6 md:p-8 backdrop-blur-sm transition-all duration-500 hover:scale-105 sm:hover:scale-110 hover:bg-white/10 hover:shadow-2xl hover:shadow-blue-500/30">
      <div className="mb-4 sm:mb-6 inline-flex rounded-xl sm:rounded-2xl bg-blue-500/10 p-3 sm:p-4 transition-all duration-500 group-hover:scale-110 sm:group-hover:scale-125 group-hover:bg-blue-500/20 group-hover:shadow-xl group-hover:shadow-blue-500/60">
        <div className="text-2xl sm:text-3xl text-yellow-400 transition-transform duration-500 group-hover:scale-110 sm:group-hover:scale-125">
          {icon}
        </div>
      </div>
      <div className="space-y-3 sm:space-y-4">
        <h3 className="min-h-10 sm:min-h-13 text-[17px] sm:text-[18px] md:text-[20px] font-semibold leading-snug text-white transition-colors duration-300 group-hover:text-blue-300">
          {title}
        </h3>
        <p className="min-h-16 sm:min-h-18 text-[13px] sm:text-[14px] md:text-[15px] leading-6 sm:leading-7 text-gray-300 transition-colors duration-300 group-hover:text-gray-100">
          {description}
        </p>
      </div>
    </div>
  );
};

export default PurposeCard;
