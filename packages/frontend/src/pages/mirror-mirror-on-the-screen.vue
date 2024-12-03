<script setup lang="ts">
import { computed, ref } from 'vue'
import TextMirrored from '../components/ui/text-mirrored.vue'
import Textarea from '../components/ui/textarea.vue'
import { mirrorText } from '../utils/mirror-text'

const textToMirror = ref('Hello world! This is me 🚀 MARIO!\n\nWhere is my princess? Again in another castle?! 🏰')
const mirroredText = computed(() => mirrorText(textToMirror.value))
</script>

<template>
  <div class="flex flex-col gap-8 pb-64">
    <h1 class="text-3xl">
      Mirror, Mirror on the Screen
    </h1>

    <div class="grid gap-4 rounded-md border-2 border-neutral-200 text-neutral-600 p-2">
      <p class="text-lg text-indigo-500">
        Task
      </p>

      <p>
        Apple Industries is working with an exciting new reflective display screen in our latest line of photo booths. While the
        screen itself is cool, its reflective qualities mean we need to build our displays backwards, including the text! To
        accommodate this, we’ll need some software that can take a sentence and reverse the order of the words.
      </p>
    </div>

    <div class="grid gap-4 rounded-md border-2 border-neutral-200 text-neutral-600 p-2">
      <p class="text-lg text-indigo-500">
        General thoughts
      </p>

      <p>
        <span class="underline">
          First approach (Mirrored text with function).
        </span>
        <br>
        At the beginning my thoughts was to simply reverse the string. There are some caveats to this approach, like the
        the emojis, special characters and html tags or markdown syntax. So far, not a lot of edge cases were considered, as it seems...
        <br>
        The issue here is if we will perfectly mirror the text, the letters direction wouldn't be mirrored.
        Also we need to have a lot of complex logic to handle all the edge cases. And this solution may take a lot of time to implement.
        (maybe there is a library for that, but I don't like to trust the third-party libraries and this is another topic).
      </p>

      <p>
        <span class="underline">
          Second approach (Mirrored text with css) (The best one 🍰)
        </span>
        <br>
        This solution, as far the most optimal one.
        At first, we shouldn't block the JavaScript thread, that will reduce the CPU usage.
        The second this is that the text will be displayed on the mirror as it should be.
        And the third one, the developer experience is much better, as we will make a regular website, as usual, and the flip the whole ui to our needs.
        <br>
        The one downside is that text selection is behaving as if the website is not mirrored, that causes UX issues.
      </p>

      <p>
        <span class="underline">
          Close to ideal solution (will not work in most cases).
        </span>
        <br>
        I found a screen flipping device, that does that on a hardware level.
        The downside of this is that it will cost money and add additional expenses and complexity to the project.
        <br>
        And the last what we can do here is to use "xrandr" command to flip the screen.
        But it all depends on the OS and the hardware that we will be using.
      </p>
    </div>

    <div class="grid gap-8 grid-cols-2">
      <div class="flex flex-col gap-2 text-neutral-400">
        <p>Text that will be mirrored</p>

        <Textarea
          v-model="textToMirror"
          rows="14"
          placeholder="Enter some text"
        />
      </div>

      <div class="flex flex-col gap-8 text-neutral-400">
        <div class="flex flex-col gap-2 h-full">
          <p>Mirrored text with function (regular split -> reverse -> join)</p>

          <div class="border-2 border-neutral-200 rounded-md p-2 h-full">
            {{ mirroredText }}
          </div>
        </div>

        <div class="flex flex-col gap-2 h-full">
          <p>Mirrored text with css</p>

          <div class="border-2 relative border-neutral-200 rounded-md p-2 h-full">
            <div class="bg-indigo-500 text-indigo-100 font-semibold text-nowrap py-2 pl-1 rounded-full absolute top-1/2 -translate-y-1/2 left-full ml-1 writing-vertical-rl">
              align mirror here
            </div>

            <TextMirrored>
              {{ textToMirror }}
            </TextMirrored>
          </div>
        </div>
      </div>
    </div>

    <div class="grid gap-4 rounded-md border-2 border-neutral-200 text-neutral-600 p-2">
      <p class="text-lg text-indigo-500">
        Conclusion
      </p>

      <p>
        The best solution will be to flip the entire page with css to the angle that is needed.
      </p>
    </div>
  </div>
</template>
