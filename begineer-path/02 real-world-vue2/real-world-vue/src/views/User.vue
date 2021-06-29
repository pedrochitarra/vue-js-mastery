<template>
  <div>This is the {{ username }}'s page</div>
</template>

<script>
export default {
  name: 'User',
  props: ['username'],
  data() {
    return {};
  },

  mounted() {},

  methods: {}
};
</script>

<style lang="scss" scoped>
</style>