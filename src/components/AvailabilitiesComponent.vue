<template>
  <div class=grid-container>
    <GridComponent
      v-for="(availability) in availabilities_augmented"
      v-bind:rowNum="availability.rowNum"
      v-bind:colNum="availability.colNum"
      v-bind:startTime="availability.startTime"
      v-bind:endTime="availability.endTime"
      v-bind:index="availability.index"
      v-bind:isSelected="availability.isSelected"
      v-bind:key="availability.index"
      v-on:handleChildMouseDown="handleChildMouseDown"
      ></GridComponent>
  </div>
</template>

<script>
import GridComponent from './GridComponent.vue'
// const ind2sub = require('ind2sub').ind2sub;

export default {
  name: 'AvailabilitiesComponent',
  components: {
    GridComponent
  },
  props: {
    availabilities: Array,
  },
  created: function() {
    if (this.availabilities.length === 0) {
      console.log("No availabilities here!");
    }
  },
  data() {
    return {
      // TOOD: reset to 7 after generating a full 7-day availability component
      DAYS_IN_WEEK: 3,
      // Helper object to encapsulate state for a click + drag
      dragHelper: {
        startCorner: null,
        endCorner: null
      }
    }
  },
  computed : {
    availabilities_augmented() {
      var augmented = this.availabilities.map((availability, index) => {
        availability.isSelected = false;
        availability.rowNum = this.computeRow(index);
        availability.colNum = this.computeCol(index);
        availability.index = index;
        return availability;
      });
      console.log(JSON.stringify(augmented));
      return augmented;
    },
    numAvailabilities: function() {
      return this.availabilities.length;
    },
  },
  methods: {
    printFn: function() {
      this.log("dragHelper::printFn",`StartCorner: ${JSON.stringify(this.dragHelper.startCorner)},` +
      ` endCorner: ${JSON.stringify(this.dragHelper.endCorner)}`);
    },
    log: function(method = "", message = "") {
      console.log(`[AvailabilitiesComponent]: %s %s`, method, message);
    },
    computeRow: function(index) {
      return Math.floor(index / this.DAYS_IN_WEEK);
    },
    computeCol: function(index) {
      return index % this.DAYS_IN_WEEK;
    },
    toggleAvailabilitySelected: function(availability) {
      console.log(`availability passed to toggleAvailabilitySelected: ${JSON.stringify(availability)}`)
      availability.isSelected = !availability.isSelected;
      // I think I can make this cleaner by emitting another event to the App Component and changing the availability prop itself
      // https://stackoverflow.com/questions/43701175/is-it-possible-to-change-props-value-from-method-in-vue-component
      this.$forceUpdate();
    },
    handleChildMouseDown: function(rowNum, colNum, index) {
      console.log("Encountered mouseDown with event target: rowNum: " + rowNum + " colNum: " + colNum + " index: " + index);
      this.startedDrag = true;
      this.topLeftCorner = {
        "row": rowNum,
        "col": colNum,
      };
      this.topRightCorner = {
        "row": rowNum,
        "col": colNum
      };

      this.toggleAvailabilitySelected(this.availabilities_augmented[index]);
    },
    handleChildMouseUp: function(rowNum, colNum) {
      console.log("mouse was moved up!");
    },
    instantiateEmptyArray: function(nRows, nCols) {
      var data = new Array(nRows);
      for (var i = 0; i < data.length; i++) {
        data[i] = new Array(nCols);
      }
      return data;
    },
    toggleAllSelected: function() {
      console.log("This is a placeholder for toggleAllSelected");
    },
    endDrag: function(rowNum, colNum) {
      this.dragHelper.startCorner = null;
      this.dragHelper.endCorner = null;
    }
    startDrag: function(rowNum, colNum) {
      if (this.dragHelper.startStartCorner.row !== null) {
        throw new Error("Expected start drag helper to have been cleaned, but it wasn't");
      }
      this.dragHelper.startCorner = {row: rowNum, col: colNum};
    }
  }
}
</script>

<style scoped>
  .grid-container {
    display: grid;
    padding: 10px;
    /* TODO: Change to 7 full columns */
    grid-template-columns: auto auto auto;
  }
</style>
