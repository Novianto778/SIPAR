import useImage from './hooks/useImage';
import Skeleton from 'react-loading-skeleton';

interface Props {
  item: Motor;
}

const MotorCard = ({ item }: Props) => {
  const image = useImage(item.img);

  return (
    <>
      {image ? (
        <div className="relative bg-white p-6 shadow rounded w-full ">
          <img
            src={image}
            alt={item.tipe}
            width={250}
            height={250}
            className="absolute -top-20 hover:scale-110 duration-300"
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
              <p className="text-gray-500 text-xl">Rp {item.harga}</p>
            </div>
          </div>
        </div>
      ) : (
        <Skeleton width={250} height={250} />
      )}
    </>
  );
};

export default MotorCard;
