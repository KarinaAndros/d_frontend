import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

export const regSchema = toTypedSchema(
  z.object({
    name: z.string('обязательно для заполнения').min(1, 'обязательно для заполнения').max(150, 'максимум 150 символов'),
    surname: z.string().max(150, 'максимум 150 символов').nullish(),
    email: z.string('обязательно для заполнения').email('некорректный email'),
    password: z.string('обязательно для заполнения').min(6, 'минимум 6 символов'),
    password_confirmation: z.string('обязательно для заполнения'),
    agree: z.literal(true, 'согласие на обработку данных обязательно'),
  }).refine(data => data.password === data.password_confirmation, {
    message: 'пароли не совпадают',
    path: ['password_confirmation'],
  }),
)

