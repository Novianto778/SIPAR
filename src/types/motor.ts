import { z } from 'zod';

const motorSchema = z.object({
  id: z.string().optional(),
  tipe: z.string(),
  cc: z.number().optional(),
  harga: z.number(),
  stok: z.number(),
  img: z.union([z.string(), z.instanceof(File)]),
});

export type Motor = z.infer<typeof motorSchema>;
