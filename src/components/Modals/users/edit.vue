<script setup lang="ts">
import type { InputTypeEdit } from '@/types'
import { useForm } from 'vee-validate'
import { editDataSchema } from '@/schemas/edit'
import { useModalStore } from '@/stores/modal'
import { useUserStore } from '@/stores/user'

const validationSchema = editDataSchema

const store = useUserStore()
const modalStore = useModalStore()

const { modal } = modalStore

const { values, errors, handleSubmit, setFieldValue } = useForm({
  validationSchema,
  initialValues: {
    name: modal.user?.name || '',
    surname: modal.user?.surname || '',
    date: modal.user?.date || '',
  },
})

const avatar = ref<File>()

const submitForm = handleSubmit(async (values) => {
  const formData = new FormData()
  formData.append('name', values.name)
  if (values.surname)
    formData.append('surname', values.surname)
  if (values.date)
    formData.append('date', values.date)
  if (avatar.value) {
    formData.append('avatar', avatar.value)
  }
  store.editUserData(formData)
})

const inputs: InputTypeEdit[] = [
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
    name: 'date',
    type: 'date',
    placeholder: 'дата рождения',
  },
  {
    name: 'avatar',
    type: 'file',
    placeholder: 'аватарка',
  },
]

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    avatar.value = target.files[0]
  }
}
</script>

<template>
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
        v-if="input.type === 'file'"
        :class="{ error: errors[input.name] }"
        :name="input.name"
        :type="input.type"
        accept=".jpg,.jpeg,.png"
        :placeholder="input.placeholder"
        @change="onFileChange"
      />
      <InputForm
        v-else
        :class="{ error: errors[input.name] }"
        :name="input.name"
        :model-value="values[input.name] as any"
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
      Сохранить
    </button>
  </form>
</template>
