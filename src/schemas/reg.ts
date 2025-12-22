import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

export const regSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, 'Имя обязательно').max(255, 'Максимум 255 символов'),
    surname: z.string().max(255, 'Максимум 255 символов'),
    email: z.string().email('Некорректный email'),
    password: z.string().min(6, 'Минимум 6 символов'),
    password_confirmation: z.string(),
    agree: z.literal(true, 'Согласие на обработку данных обязательно!'),
  }).refine(data => data.password === data.password_confirmation, {
    message: 'Пароли не совпадают',
    path: ['password_confirmation'],
  }),
)

