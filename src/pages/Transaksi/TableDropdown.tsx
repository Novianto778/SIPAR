import React from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { TbListDetails } from 'react-icons/tb';
import { FiEdit3 } from 'react-icons/fi';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { AiOutlineCheckCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

interface Props {
  onDetail: () => void;
  onEdit: () => void;
  onDelete: () => void;
  id: string;
}

const TableDropdown: React.FC<Props> = ({ onDetail, onEdit, onDelete, id }) => {
  const navigate = useNavigate();
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const openDropdownPopover = () => {
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
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
        <div className="table-dropdown-menu">
          <AiOutlineCheckCircle size={24} />
          <span>Selesai</span>
        </div>
        <div className="table-dropdown-menu">
          <AiOutlinePlusCircle size={24} />
          <span>Perpanjang</span>
        </div>
        <div className="table-dropdown-menu">
          <FiEdit3 size={24} />
          <span>Edit</span>
        </div>
        <div className="table-dropdown-menu">
          <RiDeleteBin2Line size={24} />
          <span>Delete</span>
        </div>
      </div>
    </>
  );
};

export default TableDropdown;
