<template>
  <router-view />
</template>

<style lang="scss">
@import 'bootstrap/scss/bootstrap';

img {
  max-width: 100%;
}

.hover-img-big {
  .card-img-top {
    height: 250px;
    object-fit: cover;
    object-position: 50%;
    transform: scale(1, 1);
    transition: all 0.5s ease-out;
  }
  &:hover {
    .card-img-top {
      transform: scale(1.2, 1.2);
    }
  }
}

.hover-shadow-sm:hover {
  box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%) !important;
}
</style>
