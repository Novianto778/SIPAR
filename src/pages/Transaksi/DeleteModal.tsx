import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import useDeleteTransaksi from './hooks/useDeleteTransaksi';

interface Props {
    onCloseModal: () => void;
    selectedId: number;
}

const DeleteModal = ({ onCloseModal, selectedId }: Props) => {
    const { mutate, isLoading } = useDeleteTransaksi();
    const queryClient = useQueryClient();

    const handleDeleteTransaksi = () => {
        mutate(selectedId, {
            onSuccess: () => {
                queryClient.invalidateQueries(['transaksi']);
                onCloseModal();
            }
        });
    };
    return (
        <div
            id="popup-modal"
            className="overflow-y-auto fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 z-50 h-screen"
        >
            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                <div className="relative bg-white rounded-lg shadow">
                    <button
                        type="button"
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                        data-modal-toggle="popup-modal"
                        onClick={onCloseModal}
                    >
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-6 text-center">
                        <svg
                            aria-hidden="true"
                            className="mx-auto mb-4 w-14 h-14 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500">
                            Yakin ingin menghapus transaksi?
                        </h3>
                        <button
                            data-modal-toggle="popup-modal"
                            type="button"
                            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2 disabled:cursor-not-allowed disabled:opacity-40"
                            onClick={handleDeleteTransaksi}
                            disabled={isLoading}
                        >
                            Yakin
                        </button>
                        <button
                            data-modal-toggle="popup-modal"
                            type="button"
                            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                            onClick={onCloseModal}
                        >
                            Tidak, Batalkan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
