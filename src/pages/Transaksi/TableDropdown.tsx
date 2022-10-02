import React from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { TbListDetails } from 'react-icons/tb';
import { FiEdit3 } from 'react-icons/fi';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { AiOutlineCheckCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import useChangeStatus from './hooks/useChangeStatus';
import { useQueryClient } from '@tanstack/react-query';
import useOnClickOutside from 'hooks/onClickOutside';

interface Props {
  onDetail: () => void;
  onEdit: () => void;
  onDelete: () => void;
  id: string;
}

const TableDropdown: React.FC<Props> = ({ onDetail, onEdit, onDelete, id }) => {
  const navigate = useNavigate();
  const { mutate, isSuccess } = useChangeStatus();
  const queryClient = useQueryClient();
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.useRef(null);
  useOnClickOutside(btnDropdownRef, () => setDropdownPopoverShow(false));

  const openDropdownPopover = () => {
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const handleCompleteTransaksi = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries(['transaksi']);
        setDropdownPopoverShow(false);
      },
    });
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
          onClick={() => navigate(`detail/${id}`)}
        >
          <TbListDetails size={24} />
          <span>Detail</span>
        </div>
        <div
          className="table-dropdown-menu"
          onClick={() => handleCompleteTransaksi(parseInt(id))}
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
    </>
  );
};

export default TableDropdown;
