import useImage from './hooks/useImage';
import Skeleton from 'react-loading-skeleton';
import { formatUang } from 'utils/formatUang';
import { Motor } from 'types/motor';
import { deleteImage, deleteRow } from 'lib/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

interface Props {
  item: Motor;
}

const MotorCard = ({ item }: Props) => {
  const { image } = useImage(item.img as string);
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    await deleteImage('motor', item.img as string);
    await deleteRow('motor', item.id_motor!);
    await queryClient.invalidateQueries(['motor']);
  };

  return (
    <>
      {image ? (
        <div className="relative bg-white py-6 shadow rounded-lg w-full group">
          <img
            src={image as string}
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
          <div className="absolute space-x-4 opacity-0 group-hover:opacity-100 flex items-center justify-center top-0 left-0 w-full h-full bg-gray-400/30 duration-300">
            <Link
              to={`edit/${item.id_motor}`}
              className="btn border-2 border-black group-hover:z-30"
            >
              Edit
            </Link>
            <button
              className="btn border-2 border-red-500 text-red-500 group-hover:z-30"
              onClick={handleDelete}
            >
              Delete
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
