<script setup lang="ts">
import type { InputTypeInterests, InterestCategories } from '@/types'
import { useForm } from 'vee-validate'
import { interestsDataSchema } from '@/schemas/interests'
import { useAuthStore } from '@/stores/auth'
import { useInterestStore } from '@/stores/interests'

const validationSchema = interestsDataSchema

const store = useInterestStore()

const { values, errors, handleSubmit, setFieldValue, defineField, submitCount } = useForm({
  validationSchema,
  initialValues: {
    user_id: useAuthStore().authUserData?.id,
    interest_category_id: 1,
  },
})

const [categoryInterest, selectAttrs] = defineField('interest_category_id')

const categories = ref<InterestCategories[]>()

const submitForm = handleSubmit(async (values) => {
  store.storeInterest(values)
})

const inputs: InputTypeInterests[] = [
  {
    name: 'title',
    type: 'text',
    placeholder: 'название',
  },
]

watch(() => store.interestsCategories, (newVal) => {
  categories.value = newVal
}, { deep: true, immediate: true })

onMounted(() => [
  store.getInterestsCategories(),
])
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
        :class="{ error: errors[input.name] && submitCount > 0 }"
        :name="input.name"
        :model-value="values[input.name] as any"
        :type="input.type"
        :placeholder="input.placeholder"
        @update:model-value="(newValue) => setFieldValue(input.name, newValue)"
      />

      <span
        v-if="errors[input.name] && submitCount > 0"
        class="error"
      >
        {{ errors[input.name] }}
      </span>
    </div>
    <div
      class="input-wrapper"
    >
      <textarea
        id="description"
        :model-value="values.description"
        placeholder="Введите описание"
        name="description"
        :class="{ error: errors.description }"
        @update:model-value="(val: string) => setFieldValue('description', val)"
      />
      <span
        v-if="errors.description && submitCount > 0"
        class="error"
      >
        {{ errors.description }}
      </span>
    </div>
    <div class="select">
      <label>Выберите категорию
        <select
          v-if="categories"
          id="categories"
          v-bind="selectAttrs"
          v-model="categoryInterest"
          name="categories"
        >
          <div class="options">
            <option
              v-for="value in categories"
              :key="value.id"
              :value="value.id"
            >
              {{ value.title }}
            </option>
          </div>

        </select>
      </label>
      <span
        v-if="errors.interest_category_id && submitCount > 0"
        class="error"
      >
        {{ errors.interest_category_id }}
      </span>
    </div>

    <button type="submit">
      Добавить
    </button>
  </form>
</template>
