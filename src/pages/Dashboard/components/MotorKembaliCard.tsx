import React from 'react';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { FiInfo } from 'react-icons/fi';

interface Props {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  nama: string;
  jenis_motor: string;
  plat: string;
}

const MotorKembaliCard: React.FC<Props> = ({
  Icon,
  nama,
  jenis_motor,
  plat,
}) => {
  return (
    <div className="flex flex-col gap-y-6 mt-4">
      <div className="flex items-center gap-4">
        <Icon className="rounded-full w-10 h-10 border border-yellow-400" />
        <div className="flex flex-col">
          <span className="text-sm font-medium">{nama}</span>
          <span className="text-xs font-medium text-gray-600">
            {jenis_motor} - {plat}
          </span>
        </div>
        <div className="flex items-center gap-x-6 ml-auto">
          <BsFillCheckCircleFill className="w-6 h-6 text-green-500 cursor-pointer" />
          <FiInfo className="w-6 h-6 text-gray-400 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default MotorKembaliCard;
