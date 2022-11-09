import { z } from 'zod';

export const customerSchema = z.object({
    customer_id: z.number().optional(),
    nama: z.string().min(1, { message: 'Nama harus diisi' }),
    alamat: z.string().min(1, { message: 'Alamat harus diisi' }),
    no_telp: z.string().min(1, { message: 'No HP harus diisi' }),
    nik: z.string().min(1, { message: 'NIK harus diisi' }),

});

export type Customer = z.infer<typeof customerSchema>;
