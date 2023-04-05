<script setup lang="ts">
import { ref } from 'vue'
import { CreditCardIcon } from 'vue-tabler-icons'

const desserts = ref([
  {
    name: 'Frozen Yogurt',
    calories: 159
  },
  {
    name: 'Ice cream sandwich',
    calories: 237
  },
  {
    name: 'Eclair',
    calories: 262
  },
  {
    name: 'Cupcake',
    calories: 305
  },
  {
    name: 'Gingerbread',
    calories: 356
  },
  {
    name: 'Jelly bean',
    calories: 375
  },
  {
    name: 'Lollipop',
    calories: 392
  },
  {
    name: 'Honeycomb',
    calories: 408
  },
  {
    name: 'Donut',
    calories: 452
  },
  {
    name: 'KitKat',
    calories: 518
  }
])
const search = ref('')
const dialog = ref(false)
</script>

<template>
  <v-row>
    <v-col
      cols="12"
      lg="4"
      md="6"
    >
      <v-text-field
        v-model="search"
        hide-details
        density="compact"
        label="Search transactions"
        variant="outlined"
      />
    </v-col>
    <v-col
      cols="12"
      lg="8"
      md="6"
      class="text-right"
    >
      <v-dialog
        v-model="dialog"
        width="375"
        persistent
      >
        <template #activator="{ props }">
          <v-btn
            color="primary"
            v-bind="props"
            flat
            class="ml-auto"
          >
            <CreditCardIcon
              class="mr-2"
              size="20"
            />
            Add Transaction
          </v-btn>
        </template>
      </v-dialog>
    </v-col>
  </v-row>
  <v-table>
    <thead>
      <tr>
        <th class="text-left text-subtitle-1 font-weight-semibold">
          Name
        </th>
        <th class="text-left text-subtitle-1 font-weight-semibold">
          Calories
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in desserts"
        :key="item.name"
      >
        <td>{{ item.name }}</td>
        <td>{{ item.calories }}</td>
      </tr>
    </tbody>
  </v-table>
</template>
