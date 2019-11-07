<!--  Models a single availability slot (has knowledge of its start time, and end time) -->
/* eslint-disable */
<template>
  <div class="grid-item"
     v-bind:style="{ 'background-color': background() }"
     v-on:mousedown="emitMouseDown">
       Hey I'm a grid item
       My startTime is {{this.startTime}}
       My endTime is {{this.endTime}}
       My rowNum is {{this.rowNum}}
       My colNum is {{this.colNum}}
       My index is {{this.index}}
       Am I selected? {{this.isSelected}}
 </div>
</template>

<script>
  export default {
    name: 'GridComponent',
    props: {
      startTime: String,
      endTime: String,
      rowNum: Number,
      colNum: Number,
      isSelected: Boolean,
      index: Number
    },
    data: function() {
      return {
        defaultColor: 'red'
      }
    },
    computed: {
    },
    methods: {
      background() {
        this.log("background() was called!")
        return this.isSelected ? 'gray' : this.defaultColor
      },
      // Goal : Emit events to the Availabilities Component, which will MANAGE the state needed to toggle on/off items
      emitMouseDown() {
        this.log("State of GridComponent before update: " + JSON.stringify(this.$props));
        this.$emit("handleChildMouseDown", this.rowNum, this.colNum, this.index);
        this.log("State of GridComponent after update: " + JSON.stringify(this.$props));
        // Forces this component to re-render itself (ugly, but works)
        // TODO: Figure out a way to leverage Vue to do this for me
      },
      handleMouseClick() {
        this.toggleSelected();
      },
      toggleSelected() {
        this.isSelected = !this.isSelected;
      },
      log(message) {
        console.log("[GridComponent]: " + message);
      }
    }
  }
</script>

<style scoped>
.grid-item {
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 20px;
  font-size: 30px;
  text-align: center;
}
</style>
