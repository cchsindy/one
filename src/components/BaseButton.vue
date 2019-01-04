<template>
  <button v-on="$listeners" v-bind="$attrs" class="button" :class="buttonClass">
    <slot/>
  </button>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    buttonClass: {
      type: String
    }
  }
}
</script>

<style scoped>
.button {
  background: none;
  border: solid 2px #ccc;
  border-radius: 0.75em;
  font-family: 'Work Sans', sans-serif;
  font-size: 1em;
  /* margin-right: 1vw; */
  padding: 0.5vw;
}
.button:focus {
  border: solid 2px #000;
  outline: none;
}
.button:hover {
  background: #ccc;
  color: #fff;
  cursor: pointer;
}
.button:disabled {
  display: none;
}
.small {
  font-size: 0.6em;
}
.right {
  float: right;
  margin-left: 1vw;
}
</style>
