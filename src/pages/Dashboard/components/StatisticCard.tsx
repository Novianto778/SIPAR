import React from 'react';

interface Props {
  title: string;
  value: number | string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const StatisticCard: React.FC<Props> = ({ title, value, Icon }) => {
  return (
    <div className="flex w-full items-center gap-x-4 bg-white p-4 rounded-md shadow">
      <Icon className="w-10 h-10" />
      <div className="flex flex-col">
        <span className="text-sm font-medium">{title}</span>
        <span className="text-xl font-semibold">{value}</span>
      </div>
    </div>
  );
};

export default StatisticCard;
