import { z } from 'zod';

export const motorSchema = z.object({
  id_motor: z.number().optional(),
  tipe: z.string().min(1, { message: 'Tipe harus diisi' }),
  cc: z
    .string()
    .transform((val) => (val ? parseInt(val) : 0))
    .optional(),
  harga: z
    .string()
    .min(1, { message: 'Harga harus diisi' })
    .transform((val) => parseFloat(val)),
  stok: z
    .string()
    .min(1, { message: 'Stok harus diisi' })
    .transform((val) => parseInt(val)),
  img: z.union([z.string(), z.instanceof(File)]),
});

export type Motor = z.infer<typeof motorSchema>;
