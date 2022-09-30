import { Link } from 'react-router-dom';
import useMotor from './hooks/useMotor';
import MotorCard from './MotorCard';

const ListMotor = () => {
  const { data, isLoading } = useMotor();

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
        {data?.map((item, index) => (
          <MotorCard item={item} key={index} />
        ))}
      </div>
    </>
  );
};

export default ListMotor;
