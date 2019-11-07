<template>
  <div id="app">
    <AvailabilitiesComponent v-bind:availabilities="times"></AvailabilitiesComponent>
  </div>
</template>

<script>
import AvailabilitiesComponent from './components/AvailabilitiesComponent.vue'
export default {
  name: 'app',
  components: {
    AvailabilitiesComponent
  },
  data() {
    return {
      times:
      [{
        startTime: '12:00T00',
        endTime: '13:00T00',
        id:1
      },
      {
        startTime: '13:00T00',
        endTime: '14:00T00',
        id:2
      },
      {
        startTime: '14:00T00',
        endTime: '15:00T00',
        id:3
      },
      {
        startTime: '15:00T00',
        endTime: '13:00T00',
        id:4
      },
      {
        startTime: '16:00T00',
        endTime: '14:00T00',
        id:5
      },
      {
        startTime: '17:00T00',
        endTime: '15:00T00',
        id:6
      },
      {
        startTime: '18:00T00',
        endTime: '13:00T00',
        id:7
      },
      {
        startTime: '19:00T00',
        endTime: '14:00T00',
        id:8
      },
      {
        startTime: '20:00T00',
        endTime: '15:00T00',
        id:9
      }],
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
