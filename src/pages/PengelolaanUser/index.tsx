import { useState } from 'react';
import AddUserModal from './AddUserModal';
import { useGetUser } from './hooks/useGetUser';

const KelolaUser = () => {
  const { data: users } = useGetUser();
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">List User</h2>
        <button className="btn btn-blue" onClick={() => setOpenModal(true)}>
          Tambah
        </button>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto min-w-full">
          <div className="p-1.5 inline-block align-middle w-full max-w-dashboard">
            <div className="border rounded-lg overflow-x-auto">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="table-simple text-left">
                      NO
                    </th>
                    <th scope="col" className="table-simple text-left">
                      Email
                    </th>
                    <th scope="col" className="table-simple text-left">
                      Role
                    </th>
                    <th scope="col" className="table-simple text-left">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users?.map((item, index: number) => (
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="table-simple-row">{item.email}</td>
                      <td className="table-simple-row">Admin</td>
                      <td className="table-simple-row">
                        <button className="text-red-500">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {openModal && <AddUserModal onCloseModal={() => setOpenModal(false)} />}
    </>
  );
};

export default KelolaUser;
