import { z } from 'zod';

export const transaksiInputSchema = z.object({
  nama: z.string(),
  alamat: z.string(),
  no_telp: z.string(),
  diskon: z.union([
    z.string().transform((val) => (val ? parseInt(val) : 0)),
    z.number(),
  ]),
});

export const transaksiDetailInputSchema = z.object({
  plat_motor: z.string(),
  lama_sewa: z.union([
    z.string().transform((val) => (val ? parseInt(val) : 0)),
    z.number(),
  ]),
  denda: z.number().optional(),
  id_motor: z.object({ label: z.string(), value: z.number() }),
  // id_motor: z.union([
  //   z.object({ label: z.string(), value: z.number() }),
  //   z.number(),
  // ]),
});

export const transaksiDetailSchema = transaksiDetailInputSchema.extend({
  id: z.number().optional(),
  tanggal_mulai: z.date(),
  tanggal_selesai: z.date(),
  id_transaksi: z.number().optional(),
});

export const EnumStatus = {
  Pending: 'Pending',
  Completed: 'Completed',
};

export const transaksiSchema = transaksiInputSchema.extend({
  id_transaksi: z.number().optional(),
  status: z.enum([EnumStatus.Pending, EnumStatus.Completed]),
  tanggal: z.date(),
  id_user: z.string(),
  created_at: z.date(),
  updated_at: z.date().optional(),
  // transaksiDetail: z.array(transaksiDetailSchema),
});

export type Transaksi = z.infer<typeof transaksiSchema>;
export type TransaksiInput = z.infer<typeof transaksiInputSchema>;
export type TransaksiDetail = z.infer<typeof transaksiDetailSchema>;
export type TransaksiDetailInput = z.infer<typeof transaksiDetailInputSchema>;
