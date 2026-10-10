import { z } from 'zod';

export const ProfileSchema = z.object({
  birthDate: z
    .string()
    .min(1)
    .refine((val) => {
      const selectedDate = new Date(val);
      const today = new Date();

      today.setHours(0, 0, 0, 0);

      return !isNaN(selectedDate.getTime()) && selectedDate < today;
    })
    .trim(),
  nickname: z.string().min(4).trim(),
  firstName: z.string().min(3).trim(),
  lastName: z.string().min(3).trim(),
});

export type ProfileForm = z.infer<typeof ProfileSchema>;
