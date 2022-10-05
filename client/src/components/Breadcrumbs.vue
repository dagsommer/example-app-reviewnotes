<template>
  <span class="breadcrumbs">
    <v-container>
      <v-row>
        <v-col>
          <span v-for="(path, index) of paths" :key="index">
            <a v-if="path.url" :href="path.url">
              {{ path.title }}
            </a>
            <span v-else>{{ path.title }}</span>
            <v-icon v-if="index < paths.length - 1">mdi-chevron-right</v-icon>
          </span>
        </v-col>
      </v-row>
    </v-container>
  </span>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      paths: [
        {title: 'Engagements', url: '#'},
        {title: 'Microsoft 2021', url: '#'},
        {title: 'Review Notes', url: null},
      ],
    }
  },
})
</script>
<style scoped>
.breadcrumbs {
  text-align: left;
  display: inline-block;
  margin-top: 20px;
  margin-left: 20px;
}
</style>
