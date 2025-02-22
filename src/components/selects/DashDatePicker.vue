<script setup lang="ts">
import {
  DatePickerArrow,
  DatePickerCalendar,
  DatePickerCell,
  DatePickerCellTrigger,
  DatePickerContent,
  DatePickerField,
  DatePickerGrid,
  DatePickerGridBody,
  DatePickerGridHead,
  DatePickerGridRow,
  DatePickerHeadCell,
  DatePickerHeader,
  DatePickerHeading,
  DatePickerInput,
  DatePickerNext,
  DatePickerPrev,
  DatePickerRoot,
  DatePickerTrigger,
} from 'radix-vue'

import { ref, watch } from 'vue'

import { type DashDatePickerProps } from '@/types'
import { type DateValue, CalendarDate } from '@internationalized/date'
import { isoToDateValue, dateValueToIso } from '@/@core/date/dateHelpers'

const props = defineProps<DashDatePickerProps>()
const emit = defineEmits(['update:modelValue'])

const date = isoToDateValue(props.modelValue)

const selectedDate = ref<DateValue | undefined>(date)

watch(
  () => selectedDate.value,
  (newValue) => {
    if (!newValue) {
      emit('update:modelValue', '')
      return
    }
    const formattedDate = dateValueToIso(newValue as DateValue)
    emit('update:modelValue', formattedDate)
  },
)
</script>

<template>
  <fieldset :name="props.name" class="w-100">
    <label v-if="props.label" class="text-slate-700"> {{ props.label }}</label>
    <DatePickerRoot class="w-100" id="date-field" v-model="selectedDate as CalendarDate">
      <DatePickerField
        v-slot="{ segments }"
        class="flex max-h-[35px] data-[valid=false]:border-red-500 data-[valid=false]:border-2 data-[valid=false]:ring-red focus:ring-2 focus:ring-royal-purple-500 bg-white shadow-sm shadow-royal-purple-800/10 items-center justify-between rounded text-center border"
        :data-valid="props.isValid"
      >
        <div class="flex items-center px-3">
          <template v-for="item in segments" :key="item.part">
            <DatePickerInput
              v-if="item.part === 'literal'"
              :part="item.part"
              class="focus:ring-2 focus:ring-royal-purple-500"
            >
              <span
                :class="[selectedDate ? 'text-slate-700' : 'text-slate-400']"
                class="focus:ring-2 focus:ring-royal-purple-500 text-sm"
                >{{ item.value }}</span
              >
            </DatePickerInput>
            <DatePickerInput
              v-else
              :part="item.part"
              class="rounded-sm text-sm p-0.5 focus:ring-2 focus:ring-royal-purple-500"
            >
              <span
                :class="[selectedDate ? 'text-slate-700' : 'text-slate-400']"
                class="focus:ring-2 focus:ring-royal-purple-500"
                >{{ item.value }}</span
              >
            </DatePickerInput>
          </template>
        </div>

        <DatePickerTrigger class="rounded p-1 focus:ring-2 focus:ring-royal-purple-500">
          <vue-feather
            size="20"
            class="focus:ring-2 focus:ring-royal-purple-500"
            :class="[selectedDate ? 'text-royal-purple-800' : 'text-slate-400']"
            type="calendar"
          />
        </DatePickerTrigger>
      </DatePickerField>

      <DatePickerContent
        :side-offset="4"
        class="rounded-xl bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
      >
        <DatePickerArrow class="fill-white" />
        <DatePickerCalendar v-slot="{ weekDays, grid }" class="p-4">
          <DatePickerHeader class="flex items-center justify-between">
            <DatePickerPrev
              class="inline-flex items-center cursor-pointer text-slate-700 justify-center rounded-[9px] bg-transparent w-8 h-8 hover:bg-royal-purple-800 hover:text-white active:scale-98 active:transition-all focus:shadow-[0_0_0_2px] focus:shadow-royal-purple-800"
            >
              <vue-feather type="chevron-left" class="w-6 h-6" />
            </DatePickerPrev>

            <DatePickerHeading class="text-slate-700 font-medium" />
            <DatePickerNext
              class="inline-flex items-center cursor-pointer text-slate-700 justify-center rounded-[9px] bg-transparent w-8 h-8 hover:bg-royal-purple-800 hover:text-white active:scale-98 active:transition-all focus:shadow-[0_0_0_2px] focus:shadow-royal-purple-700 focus:bg-royal-purple-800"
            >
              <vue-feather type="chevron-right" class="w-6 h-6" />
            </DatePickerNext>
          </DatePickerHeader>
          <div class="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <DatePickerGrid
              v-for="month in grid"
              :key="month.value.toString()"
              class="w-full border-collapse select-none space-y-1"
            >
              <DatePickerGridHead>
                <DatePickerGridRow class="mb-1 flex w-full justify-between">
                  <DatePickerHeadCell
                    v-for="day in weekDays"
                    :key="day"
                    class="w-8 rounded-md text-xs text-slate-700"
                  >
                    {{ day }}
                  </DatePickerHeadCell>
                </DatePickerGridRow>
              </DatePickerGridHead>
              <DatePickerGridBody>
                <DatePickerGridRow
                  v-for="(weekDates, index) in month.rows"
                  :key="`weekDate-${index}`"
                  class="flex w-full"
                >
                  <DatePickerCell
                    v-for="weekDate in weekDates"
                    :key="weekDate.toString()"
                    :date="weekDate"
                  >
                    <DatePickerCellTrigger
                      :day="weekDate"
                      :month="month.value"
                      class="relative hover:bg-royal-purple-200 flex items-center justify-center whitespace-nowrap rounded-[9px] border border-transparent bg-transparent text-sm font-normal text-slate-700 w-8 h-8 outline-none focus:shadow-[0_0_0_2px] focus:shadow-royal-purple-800 hover:border-royal-purple-800 data-[selected]:bg-royal-purple-700 data-[selected]:font-medium data-[disabled]:text-slate-700/30 data-[selected]:text-royal-purple-100 data-[unavailable]:pointer-events-none data-[unavailable]:text-slate-700/30 data-[unavailable]:line-through before:absolute before:top-[5px] before:hidden before:rounded-full before:w-1 before:h-1 before:bg-white data-[today]:before:block data-[selected]:before:bg-white"
                    />
                  </DatePickerCell>
                </DatePickerGridRow>
              </DatePickerGridBody>
            </DatePickerGrid>
          </div>
        </DatePickerCalendar>
      </DatePickerContent>
    </DatePickerRoot>
  </fieldset>
</template>
