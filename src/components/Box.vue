<template>
  <div class="box">
    <slot></slot>
  </div>
</template>

<style scoped>
.box {
  display: flex;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  color: var(--gray-2);
  background-color: var(--white);
}
</style>
