import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

export const editDataSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, 'Имя обязательно').max(255, 'Максимум 255 символов'),
    surname: z.string().max(255, 'Максимум 255 символов').nullable(),
    avatar: z.instanceof(File).optional().or(z.null()),
    date: z.string().nullable(),
  }),
)
