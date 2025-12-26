<script setup lang="ts">
import { useForm } from 'vee-validate'
import { loginSchema } from '@/schemas/login'
import { useAuthStore } from '@/stores/auth'

const validationSchema = loginSchema

const store = useAuthStore()

const { values, errors, handleSubmit, setFieldValue } = useForm({
  validationSchema,
})

const submitForm = handleSubmit(async (values) => {
  store.login(values)
})

interface InputType {
  name: 'email' | 'password'
  type: string
  placeholder: string
}

const inputs: InputType[] = [
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
]

onMounted(() => {

})
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
        Войти
      </button>
    </form>
  </div>
</template>
