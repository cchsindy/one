<template>
  <div>
    <label v-if="label">{{ label }}</label>
    {{decorator}}
    <input :value="value" @input="updateValue" v-bind="$attrs">
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    decorator: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    value: [String, Number]
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>
