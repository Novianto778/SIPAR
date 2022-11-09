import { zodResolver } from '@hookform/resolvers/zod';
import TextField from 'components/form/TextField';
import { ROUTES } from 'constants/routes';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Customer, customerSchema } from 'types/customer';
import { useTambahCustomer } from './hooks/useTambahCustomer';

type CustomerInput = Omit<Customer, 'customer_id'>;
const CustomerInputSchema = customerSchema.omit({
    customer_id: true
});

const TambahCustomer = () => {
    const navigate = useNavigate();
    const { mutate } = useTambahCustomer();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<CustomerInput>({ resolver: zodResolver(CustomerInputSchema) });

    const onSubmit = (data: CustomerInput) => {
        mutate(data, {
            onSuccess: () => {
                toast.success('Customer berhasil ditambahkan');
                navigate(ROUTES.CUSTOMER);
            }
        });
    };
    return (
        <>
            <h2 className="text-2xl font-semibold">Tambah Customer</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 mt-6">
                    <div>
                        <div className="mb-6">
                            <TextField
                                label="Nama"
                                placeholder="nama"
                                {...register('nama')}
                                error={errors.nama?.message}
                            />
                        </div>
                        <TextField
                            textarea
                            label="Alamat"
                            placeholder="alamat"
                            {...register('alamat')}
                            error={errors.alamat?.message}
                        />
                    </div>
                    <div>
                        <div className="mb-6">
                            <TextField
                                label="NIK"
                                placeholder="nomor nik"
                                {...register('nik')}
                                error={errors.nik?.message}
                            />
                        </div>
                        <div className="mb-6">
                            <TextField
                                label="No Hp"
                                placeholder="+62"
                                {...register('no_telp')}
                                error={errors.no_telp?.message}
                            />
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    className="btn btn-blue mt-4"
                    // disabled={isLoading}
                >
                    {/* {isLoading ? 'Loading...' : 'Submit'} */}
                    Submit
                </button>
            </form>
        </>
    );
};

export default TambahCustomer;
