<template>
  <ul class="row mb-0">
    <li class="col">
      <div
        class="text-center py-2"
        :class="{ 'text-white bg-primary': step === 1, 'text-muted bg-secondary': step !== 1 }"
      >
        <small class="fs-5">STEP 1.</small>
        <h3>填寫訂單</h3>
      </div>
    </li>
    <li class="col">
      <div
        class="text-center py-2"
        :class="{ 'text-white bg-primary': step === 2, 'text-muted bg-secondary': step !== 2 }"
      >
        <small class="fs-5">STEP 2.</small>
        <h3>訂單付款</h3>
      </div>
    </li>
    <li class="col">
      <div
        class="text-center py-2"
        :class="{ 'text-white bg-primary': step === 3, 'text-muted bg-secondary': step !== 3 }"
      >
        <small class="fs-5">STEP 3.</small>
        <h3>付款完成</h3>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    step: {
      type: Number,
      default: 1,
    },
  },
};
</script>
