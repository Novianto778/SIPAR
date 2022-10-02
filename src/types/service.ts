import { z } from 'zod';

export const serviceInputSchema = z.object({
  plat_motor: z.string(),
  total_km: z.number(),
  deskripsi: z.string(),
  id_motor: z.object({
    value: z.number(),
    label: z.string(),
  }),
});

export const serviceSchema = serviceInputSchema.extend({
  id_service: z.number().optional(),
  tanggal_service: z.date(),
  status: z.enum(['Completed', 'Pending']),
  tanggal_kembali: z.date().optional(),
  total_harga: z.number().optional(),
});

export type Service = Omit<z.infer<typeof serviceSchema>, 'id_motor'> & {
  id_motor: number;
};

export type ServiceInput = Omit<
  Service,
  | 'id_service'
  | 'tanggal_kembali'
  | 'total_harga'
  | 'tanggal_service'
  | 'id_motor'
> & {
  id_motor: { label: string; value: number };
};
