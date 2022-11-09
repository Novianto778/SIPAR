import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import TextField from 'components/form/TextField';
import { ROUTES } from 'constants/routes';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { Customer, customerSchema } from 'types/customer';
import { useCustomerById } from './hooks/useCustomerById';
import { useEditCustomer } from './hooks/useEditCustomer';

type CustomerInput = Omit<Customer, 'customer_id'>;
const CustomerInputSchema = customerSchema.omit({
    customer_id: true
});

const EditCustomer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data } = useCustomerById(id!);
    const { mutate } = useEditCustomer();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<CustomerInput>({ resolver: zodResolver(CustomerInputSchema) });

    const onSubmit = (data: CustomerInput) => {
        const newData = { customer: data, id: id! };
        mutate(newData, {
            onSuccess: () => {
                toast.success('Customer berhasil diedit');
                navigate(ROUTES.CUSTOMER);
            }
        });
    };

    useEffect(() => {
        if (data) {
            setValue('nama', data?.nama);
            setValue('alamat', data?.alamat);
            setValue('nik', data?.nik);
            setValue('no_telp', data?.no_telp);
        }
    }, [data, setValue]);
    return (
        <>
            <h2 className="text-2xl font-semibold">Edit Customer</h2>
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

export default EditCustomer;
