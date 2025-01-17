<script setup lang="ts">
import {
  DateRangePickerArrow,
  DateRangePickerCalendar,
  DateRangePickerCell,
  DateRangePickerCellTrigger,
  DateRangePickerContent,
  DateRangePickerField,
  DateRangePickerGrid,
  DateRangePickerGridBody,
  DateRangePickerGridHead,
  DateRangePickerGridRow,
  DateRangePickerHeadCell,
  DateRangePickerHeader,
  DateRangePickerHeading,
  DateRangePickerInput,
  DateRangePickerNext,
  DateRangePickerPrev,
  DateRangePickerRoot,
  DateRangePickerTrigger,
} from 'radix-vue'

import { ref, watch } from 'vue'
import { type DateRange } from 'radix-vue'
import { rangeToDateRange, dateRangeToRange } from '@/@core/date/dateHelpers'
import { type DashDateRangePickerProps } from '@/types'

const props = defineProps<DashDateRangePickerProps>()
const emit = defineEmits(['update:modelValue'])

const internalValue = ref(rangeToDateRange(props.modelValue))

watch(
  () => internalValue.value,
  (newValue) => {
    emit('update:modelValue', dateRangeToRange(newValue as DateRange))
  },
)
</script>

<template>
  <div class="flex flex-col">
    <DateRangePickerRoot v-model="internalValue as DateRange">
      <DateRangePickerField
        v-slot="{ segments }"
        class="flex justify-between select-none max-h-[35px] bg-white items-center rounded border border-transparent data-[invalid]:border-red-500"
      >
        <div class="flex items-center px-3">
          <template v-for="item in segments.start" :key="item.part">
            <DateRangePickerInput
              class="data-[placeholder]:text-slate-400 text-slate-400 text-sm"
              :class="[internalValue ? 'text-slate-700' : 'text-slate-400']"
              v-if="item.part === 'literal'"
              :part="item.part"
              type="start"
            >
              {{ item.value }}
            </DateRangePickerInput>
            <DateRangePickerInput
              v-else
              :part="item.part"
              class="rounded text-sm p-0.5 data-[placeholder]:text-slate-400 focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-royal-purple-800"
              type="start"
            >
              {{ item.value }}
            </DateRangePickerInput>
          </template>
          <span :class="[internalValue ? 'text-slate-700' : 'text-slate-400']" class="mx-2">
            -
          </span>
          <template v-for="item in segments.end" :key="item.part">
            <DateRangePickerInput
              class="data-[placeholder]:text-slate-400 text-slate-400"
              :class="[internalValue ? 'text-slate-700' : 'text-slate-400']"
              v-if="item.part === 'literal'"
              :part="item.part"
              type="end"
            >
              {{ item.value }}
            </DateRangePickerInput>
            <DateRangePickerInput
              v-else
              :part="item.part"
              class="rounded text-sm p-0.5 focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-royal-purple-700 data-[placeholder]:text-slate-400"
              type="end"
            >
              {{ item.value }}
            </DateRangePickerInput>
          </template>
        </div>

        <DateRangePickerTrigger
          class="ml-4 rounded p-1 focus:shadow-[0_0_0_2px] focus:shadow-royal-purple-400"
        >
          <vue-feather
            size="20"
            :class="[internalValue ? 'text-royal-purple-800' : 'text-slate-400']"
            class="focus:ring-2 focus:ring-royal-purple-500"
            type="calendar"
          />
        </DateRangePickerTrigger>
      </DateRangePickerField>

      <DateRangePickerContent
        :side-offset="4"
        class="rounded-xl bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.green7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
      >
        <DateRangePickerArrow class="fill-white" />
        <DateRangePickerCalendar v-slot="{ weekDays, grid }" class="p-4">
          <DateRangePickerHeader class="flex items-center justify-between">
            <DateRangePickerPrev
              class="inline-flex items-center cursor-pointer text-slate-700 justify-center rounded-[9px] bg-transparent w-8 h-8 hover:bg-royal-purple-800 focus:text-white hover:text-white active:scale-98 active:transition-all focus:shadow-[0_0_0_2px] focus:bg-royal-purple-800"
            >
              <vue-feather type="chevron-left" class="w-6 h-6" />
            </DateRangePickerPrev>

            <DateRangePickerHeading class="text-[15px] text-slate-700 font-medium">
            </DateRangePickerHeading>
            <DateRangePickerNext
              class="inline-flex items-center cursor-pointer text-slate-700 justify-center rounded-[9px] bg-transparent w-8 h-8 hover:bg-royal-purple-800 focus:text-white hover:text-white active:scale-98 active:transition-all focus:shadow-[0_0_0_2px] focus:bg-royal-purple-800"
            >
              <vue-feather type="chevron-right" class="w-6 h-6" />
            </DateRangePickerNext>
          </DateRangePickerHeader>
          <div class="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <DateRangePickerGrid
              v-for="month in grid"
              :key="month.value.toString()"
              class="w-full border-collapse select-none space-y-1"
            >
              <DateRangePickerGridHead>
                <DateRangePickerGridRow class="mb-1 flex w-full justify-between">
                  <DateRangePickerHeadCell
                    v-for="day in weekDays"
                    :key="day"
                    class="w-8 rounded-md text-xs !font-normal text-slate-700"
                  >
                    {{ day }}
                  </DateRangePickerHeadCell>
                </DateRangePickerGridRow>
              </DateRangePickerGridHead>
              <DateRangePickerGridBody>
                <DateRangePickerGridRow
                  v-for="(weekDates, index) in month.rows"
                  :key="`weekDate-${index}`"
                  class="flex w-full"
                >
                  <DateRangePickerCell
                    v-for="weekDate in weekDates"
                    :key="weekDate.toString()"
                    :date="weekDate"
                  >
                    <DateRangePickerCellTrigger
                      :day="weekDate"
                      :month="month.value"
                      class="relative flex items-center justify-center rounded-full whitespace-nowrap text-sm font-normal text-slate-700 w-8 h-8 outline-none focus:shadow-[0_0_0_2px] focus:shadow-royal-purple-800 data-[disabled]:text-slate-700/30 data-[selected]:bg-royal-purple-800 data-[selected]:text-white hover:bg-royal-purple-400 data-[highlighted]:bg-royal-purple-400 data-[unavailable]:pointer-events-none data-[unavailable]:text-slate-700/30 data-[unavailable]:line-through before:absolute before:top-[5px] before:hidden before:rounded-full before:w-1 before:h-1 before:bg-white data-[today]:before:block data-[today]:before:bg-green9"
                    />
                  </DateRangePickerCell>
                </DateRangePickerGridRow>
              </DateRangePickerGridBody>
            </DateRangePickerGrid>
          </div>
        </DateRangePickerCalendar>
      </DateRangePickerContent>
    </DateRangePickerRoot>
  </div>
</template>
