import useImage from './hooks/useImage';
import Skeleton from 'react-loading-skeleton';
import { formatUang } from 'utils/formatUang';
import { Motor } from 'types/motor';

interface Props {
  item: Motor;
}

const MotorCard = ({ item }: Props) => {
  const image = useImage(item.img as string);

  return (
    <>
      {image ? (
        <div className="relative bg-white py-6 shadow rounded-lg w-full group">
          <img
            src={image}
            alt={item.tipe}
            width={250}
            height={250}
            className="absolute -top-20 group-hover:scale-110 group-hover:z-20 duration-300 mx-6"
          />
          <div className="grid grid-cols-3 items-center mt-32">
            <div className="col-span-1 border-r-2 text-center py-8">
              <h3 className="text-2xl font-semibold">Stok</h3>
              <p className="text-gray-500">{item.stok}</p>
            </div>
            <div className="col-span-2 text-center">
              <h3 className="text-2xl font-bold capitalize tracking-widest">
                {item.tipe}
              </h3>
              <p className="text-orange-500 font-semibold text-xl">
                Rp <span>{formatUang(item.harga)}</span>
              </p>
            </div>
          </div>
          <div className="absolute opacity-0 group-hover:opacity-100 flex items-center justify-center top-0 left-0 w-full h-full bg-gray-400/30 duration-300">
            <button className="btn border-2 border-black group-hover:z-30">
              Edit
            </button>
          </div>
        </div>
      ) : (
        <Skeleton width={300} height={300} />
      )}
    </>
  );
};

export default MotorCard;
