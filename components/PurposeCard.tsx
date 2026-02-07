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
    <div className="group relative overflow-hidden rounded-3xl bg-white/5 p-8 backdrop-blur-sm transition-all duration-500 hover:scale-110 hover:bg-white/10 hover:shadow-2xl hover:shadow-blue-500/30">
      <div className="mb-6 inline-flex rounded-2xl bg-blue-500/10 p-4 transition-all duration-500 group-hover:scale-125 group-hover:bg-blue-500/20 group-hover:shadow-xl group-hover:shadow-blue-500/60">
        <div className="text-3xl text-yellow-400 transition-transform duration-500 group-hover:scale-125">
          {icon}
        </div>
      </div>
      <h3 className="mb-4 text-xl font-semibold text-white transition-colors duration-300 group-hover:text-blue-300">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-gray-300 transition-colors duration-300 group-hover:text-gray-100">
        {description}
      </p>
    </div>
  );
};

export default PurposeCard;
