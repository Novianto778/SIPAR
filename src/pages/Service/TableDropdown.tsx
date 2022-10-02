import { useRef, useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { FiEdit3 } from 'react-icons/fi';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import useOnClickOutside from 'hooks/onClickOutside';
import SelesaiModal from './SelesaiModal';

interface Props {
  id: string;
}

const TableDropdown: React.FC<Props> = ({ id }) => {
  const navigate = useNavigate();
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const [selesaiModal, setSelesaiModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const btnDropdownRef = useRef(null);
  useOnClickOutside(btnDropdownRef, () => setDropdownPopoverShow(false));

  const openDropdownPopover = () => {
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  // const handleCompleteTransaksi = (id: number) => {
  //   mutate(id, {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(['transaksi']);
  //       setDropdownPopoverShow(false);
  //     },
  //   });
  // };

  const handleOpenModalSelesai = (id: number) => {
    setSelesaiModal(true);
    setDropdownPopoverShow(false);
    setSelectedId(id);
  };

  return (
    <>
      <button
        className="text-gray-500 py-1 px-3"
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <FaEllipsisV />
      </button>
      <div
        ref={btnDropdownRef}
        className={
          (dropdownPopoverShow ? 'block ' : 'hidden ') +
          `bg-white text-base absolute list-none text-left rounded shadow-lg w-40 z-50 right-16`
        }
      >
        <div
          className="table-dropdown-menu"
          onClick={() => handleOpenModalSelesai(parseInt(id))}
        >
          <AiOutlineCheckCircle size={24} />
          <span>Selesai</span>
        </div>
        <div
          className="table-dropdown-menu"
          onClick={() => {
            navigate(`edit/${id}`);
          }}
        >
          <FiEdit3 size={24} />
          <span>Edit</span>
        </div>
      </div>
      {selesaiModal && (
        <SelesaiModal
          onCloseModal={() => setSelesaiModal(false)}
          id={selectedId!}
        />
      )}
    </>
  );
};

export default TableDropdown;
