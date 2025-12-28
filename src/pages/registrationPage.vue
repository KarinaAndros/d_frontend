<script setup lang="ts">
import type { InputType } from '@/types'
import { useForm } from 'vee-validate'
import api from '@/api'
import { regSchema } from '@/schemas/reg'

const validationSchema = regSchema

const { values, errors, handleSubmit, defineField, setFieldValue, setErrors } = useForm({
  validationSchema,
})
const [agree, agreeAttrs] = defineField('agree')

const submitForm = handleSubmit(async (values) => {
  try {
    await api.post('api/users', values)
  }
  catch (error: any) {
    if (error.response?.status === 422) {
      setErrors(error.response.data.errors)
    }
  }
})

const inputs: InputType[] = [
  {
    name: 'name',
    type: 'text',
    placeholder: 'имя',
  },
  {
    name: 'surname',
    type: 'text',
    placeholder: 'фамилия',
  },
  {
    name: 'email',
    type: 'text',
    placeholder: 'email',
  },
  {
    name: 'password',
    type: 'text',
    placeholder: 'пароль',
  },
  {
    name: 'password_confirmation',
    type: 'text',
    placeholder: 'повтор пароля',
  },
]
</script>

<template>
  <div class="home">
    <form
      class="flex_column"
      @submit="submitForm"
    >
      <div
        v-for="input in inputs"
        :key="input.name"
        class="input-wrapper"
      >
        <InputForm
          :class="{ error: errors[input.name] }"
          :name="input.name"
          :model-value="values[input.name]"
          :type="input.type"
          :placeholder="input.placeholder"
          @update:model-value="(newValue) => setFieldValue(input.name, newValue)"
        />
        <span
          v-if="errors[input.name]"
          class="error"
        >
          {{ errors[input.name] }}
        </span>
      </div>
      <button type="submit">
        Зарегистрироваться
      </button>
      <div>
        <label name="agree">
          <input
            v-model="agree"
            class="agree"
            v-bind="agreeAttrs"
            type="checkbox"
          >
          <span>согласен на <a href="">обработку личных данных</a></span>
        </label>
        <span
          v-if="errors.agree"
          class="error"
        >
          {{ errors.agree }}
        </span>
      </div>
    </form>
  </div>
</template>
