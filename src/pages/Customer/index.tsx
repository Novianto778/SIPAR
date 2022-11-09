import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteModal from './DeleteModal';
import useCustomer from './hooks/useCustomer';
import Table from './Table';

const ListCustomer = () => {
    const [deleteModal, setDeleteModal] = useState(false);
    const { data, isLoading } = useCustomer();
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const columns = useMemo(
        () => [
            {
                Header: 'NO',
                accessor: 'no'
            },
            {
                Header: 'Nama',
                accessor: 'nama'
            },
            {
                Header: 'NIK',
                accessor: 'nik'
            },
            {
                Header: 'alamat',
                accessor: 'alamat'
            },
            {
                Header: 'No HP',
                accessor: 'no_telp'
            },
            {
                Header: 'Aksi',
                accessor: 'aksi'
            }
        ],
        []
    );

    const handleOpenModal = useCallback((id: string) => {
        setDeleteModal(true);
        setSelectedId(id);
    }, []);

    const handleCloseModal = () => {
        setDeleteModal(false);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Data Customer</h2>
                <Link to="add" className="btn btn-blue">
                    Tambah
                </Link>
            </div>
            <div className="mt-8 h-full">
                <div className="min-w-full overflow-x-auto h-full">
                    <div className="overflow-hidden max-w-dashboard-small md:w-full h-full">
                        <Table
                            data={data || []}
                            columns={columns}
                            onOpenModal={handleOpenModal}
                        />
                    </div>
                </div>
            </div>
            {deleteModal && (
                <DeleteModal
                    onCloseModal={handleCloseModal}
                    selectedId={selectedId!}
                />
            )}
        </>
    );
};

export default ListCustomer;
