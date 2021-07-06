<template>
  <div>
    <h1>Events Listing</h1>
    <event-card></event-card>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue';

export default {
  name: 'EventList',
  components: {
    EventCard
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {}
};
</script>

<style lang="scss" scoped>
</style>