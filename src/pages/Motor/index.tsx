import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Motor } from 'types/motor';
import DeleteModal from './DeleteModal';
import useMotor from './hooks/useMotor';
import MotorCard from './MotorCard';

const ListMotor = () => {
  const { data, isLoading } = useMotor();
  const [openModal, setOpenModal] = useState(false);
  const [img, setImg] = useState<string | null>(null);
  const [id, setId] = useState<number | null>(null);
  const [tipeMotor, setTipeMotor] = useState<string | null>(null)

  const handleOpenModal = (id: number, img: string, tipe: string) => {
    setOpenModal(true);
    setId(id);
    setImg(img);
    setTipeMotor(tipe)
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="flex items-center justify-between mb-20">
        <h2 className="text-2xl font-bold">List Motor</h2>
        <Link to="add" className="btn btn-blue">
          Tambah
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
        {data?.map((item: Motor, index) => {
          return (
            <>
              <MotorCard
                item={item}
                key={index}
                onOpenModal={() =>
                  handleOpenModal(item.id_motor!, item.img as string, item.tipe)
                }
              />
              {openModal && (
                <DeleteModal
                  id={id!}
                  img={img!}
                  tipeMotor={tipeMotor!}
                  onCloseModal={() => setOpenModal(false)}
                />
              )}
            </>
          );
        })}
      </div>
    </>
  );
};

export default ListMotor;
