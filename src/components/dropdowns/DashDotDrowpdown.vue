<script setup lang="ts">
import { ref } from 'vue'
import {
  DropdownMenuArrow,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemIndicator,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from 'radix-vue'

const toggleState = ref(false)
const checkboxOne = ref(false)
const checkboxTwo = ref(false)
const person = ref('pedro')

function handleClick() {
  alert('hello!')
}
</script>

<template>
  <DropdownMenuRoot v-model:open="toggleState">
    <DropdownMenuTrigger
      class="rounded-full w-[35px] h-[35px] inline-flex items-center justify-center text-slate-600 bg-white drop-shadow-2xl shadow-xs hover:bg-royal-purple-50"
      aria-label="Customise options"
    >
      <slot v-if="$slots['menu-trigger']" name="menu-trigger"></slot>
      <template v-else>
        <vue-feather size="20" type="menu" />
      </template>
    </DropdownMenuTrigger>
    <DropdownMenuPortal>
      <DropdownMenuContent
        class="min-w-[220px] outline-hidden bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
        :side-offset="5"
      >
        <DropdownMenuItem
          value="New Tab"
          class="group text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-hidden data-disabled:text-mauve8 data-disabled:pointer-events-none data-highlighted:bg-green9 data-highlighted:text-green1"
          @click="handleClick"
        >
          New Tab
          <div
            class="ml-auto pl-[20px] text-mauve11 group-data-highlighted:text-white group-data-disabled:text-mauve8"
          >
            ⌘+T
          </div>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger
            value="more toolsz"
            class="group w-full text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-hidden data-[state=open]:bg-green4 data-[state=open]:text-grass11 data-disabled:text-mauve8 data-disabled:pointer-events-none data-highlighted:bg-green9 data-highlighted:text-green1 data-highlighted:data-[state=open]:bg-green9 data-highlighted:data-[state=open]:text-green1"
          >
            More Tools
            <div
              class="ml-auto pl-[20px] text-mauve11 group-data-highlighted:text-white group-data-disabled:text-mauve8"
            >
              <vue-feather type="chevron-right" />
            </div>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent
              class="min-w-[220px] outline-hidden bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
              :side-offset="2"
              :align-offset="-5"
            >
              <DropdownMenuItem
                class="group text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-hidden data-disabled:text-mauve8 data-disabled:pointer-events-none data-highlighted:bg-green9 data-highlighted:text-green1"
              >
                Save Page As…
                <div
                  class="ml-auto pl-[20px] text-mauve11 group-data-highlighted:text-white group-data-disabled:text-mauve8"
                >
                  ⌘+S
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                class="text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-hidden data-disabled:text-mauve8 data-disabled:pointer-events-none data-highlighted:bg-green9 data-highlighted:text-green1"
              >
                Create Shortcut…
              </DropdownMenuItem>
              <DropdownMenuItem
                class="text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-hidden data-disabled:text-mauve8 data-disabled:pointer-events-none data-highlighted:bg-green9 data-highlighted:text-green1"
              >
                Name Window…
              </DropdownMenuItem>
              <DropdownMenuSeparator class="h-[1px] bg-green6 m-[5px]" />
              <DropdownMenuItem
                class="text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-hidden data-disabled:text-mauve8 data-disabled:pointer-events-none data-highlighted:bg-green9 data-highlighted:text-green1"
              >
                Developer Tools
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem
          value="New Window"
          class="group text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-hidden data-disabled:text-mauve8 data-disabled:pointer-events-none data-highlighted:bg-green9 data-highlighted:text-green1"
        >
          New Window
          <div
            class="ml-auto pl-[20px] text-mauve11 group-data-highlighted:text-white group-data-disabled:text-mauve8"
          >
            ⌘+N
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          value="New Private Window"
          class="group text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-hidden data-disabled:text-mauve8 data-disabled:pointer-events-none data-highlighted:bg-green9 data-highlighted:text-green1"
          disabled
        >
          New Private Window
          <div
            class="ml-auto pl-[20px] text-mauve11 group-data-highlighted:text-white group-data-disabled:text-mauve8"
          >
            ⇧+⌘+N
          </div>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger
            value="more tools"
            class="group text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none w-full outline-hidden data-[state=open]:bg-green4 data-[state=open]:text-grass11 data-disabled:text-mauve8 data-disabled:pointer-events-none data-highlighted:bg-green9 data-highlighted:text-green1 data-highlighted:data-[state=open]:bg-green9 data-highlighted:data-[state=open]:text-green1"
          >
            More Tools
            <div
              class="ml-auto pl-[20px] text-mauve11 group-data-highlighted:text-white group-data-disabled:text-mauve8"
            >
              <vue-feather type="chevron-right" />
            </div>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent
              class="min-w-[220px] outline-hidden bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
              :side-offset="2"
              :align-offset="-5"
            >
              <DropdownMenuItem
                class="group text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-hidden data-disabled:text-mauve8 data-disabled:pointer-events-none data-highlighted:bg-green9 data-highlighted:text-green1"
              >
                Save Page As…
                <div
                  class="ml-auto pl-[20px] text-mauve11 group-data-highlighted:text-white group-data-disabled:text-mauve8"
                >
                  ⌘+S
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                class="text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-hidden data-disabled:text-mauve8 data-disabled:pointer-events-none data-highlighted:bg-green9 data-highlighted:text-green1"
              >
                Create Shortcut…
              </DropdownMenuItem>
              <DropdownMenuItem
                class="text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-hidden data-disabled:text-mauve8 data-disabled:pointer-events-none data-highlighted:bg-green9 data-highlighted:text-green1"
              >
                Name Window…
              </DropdownMenuItem>
              <DropdownMenuSeparator class="h-[1px] bg-green6 m-[5px]" />
              <DropdownMenuItem
                class="text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-hidden data-disabled:text-mauve8 data-disabled:pointer-events-none data-highlighted:bg-green9 data-highlighted:text-green1"
              >
                Developer Tools
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger
                  value="more toolsz"
                  class="group w-full text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-hidden data-[state=open]:bg-green4 data-[state=open]:text-grass11 data-disabled:text-mauve8 data-disabled:pointer-events-none data-highlighted:bg-green9 data-highlighted:text-green1 data-highlighted:data-[state=open]:bg-green9 data-highlighted:data-[state=open]:text-green1"
                >
                  More Tools
                  <div
                    class="ml-auto pl-[20px] text-mauve11 group-data-highlighted:text-white group-data-disabled:text-mauve8"
                  >
                    <vue-feather type="chevron-right" />
                  </div>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent
                    class="min-w-[220px] outline-hidden bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                    :side-offset="2"
                    :align-offset="-5"
                  >
                    <DropdownMenuItem
                      class="group text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-hidden data-disabled:text-mauve8 data-disabled:pointer-events-none data-highlighted:bg-green9 data-highlighted:text-green1"
                    >
                      Save Page As…
                      <div
                        class="ml-auto pl-[20px] text-mauve11 group-data-highlighted:text-white group-data-disabled:text-mauve8"
                      >
                        ⌘+S
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      class="text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-hidden data-disabled:text-mauve8 data-disabled:pointer-events-none data-highlighted:bg-green9 data-highlighted:text-green1"
                    >
                      Create Shortcut…
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      class="text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-hidden data-disabled:text-mauve8 data-disabled:pointer-events-none data-highlighted:bg-green9 data-highlighted:text-green1"
                    >
                      Name Window…
                    </DropdownMenuItem>
                    <DropdownMenuSeparator class="h-[1px] bg-green6 m-[5px]" />
                    <DropdownMenuItem
                      class="text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-hidden data-disabled:text-mauve8 data-disabled:pointer-events-none data-highlighted:bg-green9 data-highlighted:text-green1"
                    >
                      Developer Tools
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger
                        value="more toolsz"
                        class="group w-full text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-hidden data-[state=open]:bg-green4 data-[state=open]:text-grass11 data-disabled:text-mauve8 data-disabled:pointer-events-none data-highlighted:bg-green9 data-highlighted:text-green1 data-highlighted:data-[state=open]:bg-green9 data-highlighted:data-[state=open]:text-green1"
                      >
                        More Tools
                        <div
                          class="ml-auto pl-[20px] text-mauve11 group-data-highlighted:text-white group-data-disabled:text-mauve8"
                        >
                          <vue-feather type="chevron-right" />
                        </div>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent
                          class="min-w-[220px] outline-hidden bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                          :side-offset="2"
                          :align-offset="-5"
                        >
                          <DropdownMenuItem
                            class="group text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-hidden data-disabled:text-mauve8 data-disabled:pointer-events-none data-highlighted:bg-green9 data-highlighted:text-green1"
                          >
                            Save Page As…
                            <div
                              class="ml-auto pl-[20px] text-mauve11 group-data-highlighted:text-white group-data-disabled:text-mauve8"
                            >
                              ⌘+S
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            class="text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-hidden data-disabled:text-mauve8 data-disabled:pointer-events-none data-highlighted:bg-green9 data-highlighted:text-green1"
                          >
                            Create Shortcut…
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            class="text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-hidden data-disabled:text-mauve8 data-disabled:pointer-events-none data-highlighted:bg-green9 data-highlighted:text-green1"
                          >
                            Name Window…
                          </DropdownMenuItem>
                          <DropdownMenuSeparator class="h-[1px] bg-green6 m-[5px]" />
                          <DropdownMenuItem
                            class="text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-hidden data-disabled:text-mauve8 data-disabled:pointer-events-none data-highlighted:bg-green9 data-highlighted:text-green1"
                          >
                            Developer Tools
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem
                class="text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-hidden data-disabled:text-mauve8 data-disabled:pointer-events-none data-highlighted:bg-green9 data-highlighted:text-green1"
              >
                Developer Tools
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator class="h-[1px] bg-green6 m-[5px]" />
        <DropdownMenuCheckboxItem
          v-model:checked="checkboxOne"
          class="group text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-hidden data-disabled:text-mauve8 data-disabled:pointer-events-none data-highlighted:bg-green9 data-highlighted:text-green1"
        >
          <DropdownMenuItemIndicator
            class="absolute left-0 w-[25px] inline-flex items-center justify-center"
          >
            <vue-feather type="check" />
          </DropdownMenuItemIndicator>
          Show Bookmarks
          <div
            class="ml-auto pl-[20px] text-mauve11 group-data-highlighted:text-white group-data-disabled:text-mauve8"
          >
            ⌘+B
          </div>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          v-model:checked="checkboxTwo"
          class="text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-hidden data-disabled:text-mauve8 data-disabled:pointer-events-none data-highlighted:bg-green9 data-highlighted:text-green1"
        >
          <DropdownMenuItemIndicator
            class="absolute left-0 w-[25px] inline-flex items-center justify-center"
          >
            <vue-feather type="check" />
          </DropdownMenuItemIndicator>
          Show Full URLs
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator class="h-[1px] bg-green6 m-[5px]" />

        <DropdownMenuLabel class="pl-[25px] text-xs leading-[25px] text-mauve11">
          People
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup v-model="person">
          <DropdownMenuRadioItem
            class="text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-hidden data-disabled:text-mauve8 data-disabled:pointer-events-none data-highlighted:bg-green9 data-highlighted:text-green1"
            value="pedro"
          >
            <DropdownMenuItemIndicator
              class="absolute left-0 w-[25px] inline-flex items-center justify-center"
            >
              <vue-feather type="eye" />
            </DropdownMenuItemIndicator>
            Pedro Duarte
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            class="text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-hidden data-disabled:text-mauve8 data-disabled:pointer-events-none data-highlighted:bg-green9 data-highlighted:text-green1"
            value="colm"
          >
            <DropdownMenuItemIndicator
              class="absolute left-0 w-[25px] inline-flex items-center justify-center"
            >
              <vue-feather type="eye" />
            </DropdownMenuItemIndicator>
            Colm Tuite
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuArrow class="fill-white" />
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
