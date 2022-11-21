import React from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { TbListDetails } from 'react-icons/tb';
import { FiEdit3, FiTrash } from 'react-icons/fi';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import useChangeStatus from './hooks/useChangeStatus';
import { useQueryClient } from '@tanstack/react-query';
import useOnClickOutside from 'hooks/onClickOutside';
import useGetTransaksiById from './hooks/useGetTransaksiById';
import { GrDocumentPdf } from 'react-icons/gr';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Props {
    id: string;
    onOpenDeleteModal: () => void;
}

const TableDropdown: React.FC<Props> = ({ id, onOpenDeleteModal }) => {
    const navigate = useNavigate();
    const { mutate } = useChangeStatus();
    const { data: singleTransaksi } = useGetTransaksiById(parseInt(id));
    const queryClient = useQueryClient();
    const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
    const btnDropdownRef = React.useRef(null);
    useOnClickOutside(btnDropdownRef, () => setDropdownPopoverShow(false));

    const handleExportPDF = (transaksi: any) => {
        const unit = 'pt';
        const size = 'A4'; // Use A1, A2, A3 or A4
        const orientation = 'portrait'; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = `Report - #${transaksi?.id_transaksi}`;
        const headers = [
            [
                'Nama',
                'NIK',
                'No Telp',
                'Tanggal',
                ...transaksi.transaksi_detail.map(
                    (item: any, index: number) => `Motor ${index + 1}`
                )
            ]
        ];

        const data = [
            [
                transaksi.nama,
                transaksi.nik,
                transaksi.no_telp,
                transaksi.tanggal,
                ...transaksi.transaksi_detail.map(
                    (item: any) => item.motor.tipe
                )
            ]
        ];

        let content = {
            startY: 50,
            head: headers,
            body: data
        };

        doc.text(title, marginLeft, 40);
        autoTable(doc, content);
        doc.save('report.pdf');
    };

    const openDropdownPopover = () => {
        setDropdownPopoverShow(true);
    };
    const closeDropdownPopover = () => {
        setDropdownPopoverShow(false);
    };

    const handleCompleteTransaksi = (id: number) => {
        mutate(id, {
            onSuccess: () => {
                setDropdownPopoverShow(false);
                return queryClient.invalidateQueries(['transaksi']);
            }
        });
    };
    return (
        <div className="max-w-[52px]">
            {singleTransaksi?.status === 'Completed' ? (
                <GrDocumentPdf
                    className="text-green-500 w-full h-full py-1 px-3 cursor-pointer"
                    onClick={() => handleExportPDF(singleTransaksi)}
                />
            ) : (
                <>
                    <button
                        className="text-gray-500 py-1 px-3"
                        onClick={(e) => {
                            e.preventDefault();
                            dropdownPopoverShow
                                ? closeDropdownPopover()
                                : openDropdownPopover();
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
                            onClick={() =>
                                handleCompleteTransaksi(parseInt(id))
                            }
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
                        <div
                            className="table-dropdown-menu"
                            onClick={onOpenDeleteModal}
                        >
                            <FiTrash size={24} />
                            <span>Delete</span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default TableDropdown;
