import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

export const loginSchema = toTypedSchema(
  z.object({
    email: z.string('Обязательно для заполнения').email('Некорректный email'),
    password: z.string('Обязательно для заполнения'),
  }),
)
