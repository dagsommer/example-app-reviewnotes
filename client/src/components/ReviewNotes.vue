<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>
          Review Notes
          <v-btn-toggle small :max="0" class="newButton ml-5">
            <v-btn color="success" small @click="dialog = true"> New </v-btn>
            <v-btn color="success" small @click="dialog = true">
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </v-btn-toggle>
        </h1>
      </v-col>
    </v-row>
    <v-divider />
    <ReviewNotesFiltersVue class="mt-5" :users="users" @changed="filterChanged" />
    <ReviewNotesTableVue :items="reviewNotes"></ReviewNotesTableVue>
    <v-row class="mt-3">
      <v-col cols="12"><v-btn style="width: 100%" @click="loadMore">Load more</v-btn></v-col>
    </v-row>
    <v-dialog v-model="dialog" width="500">
      <v-card class="pt-4">
        <v-card-text> This is where you would add a new note </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script lang="ts">
import Vue from 'vue'
import ReviewNotesFiltersVue from './ReviewNotesFilters.vue'
import ReviewNotesTableVue from './ReviewNotesTable.vue'
import {ReviewNoteListOptions} from '../util/ReviewNoteListOptions'
import {getUsers, getReviewNotes} from '../api'

export default Vue.extend({
  components: {
    ReviewNotesFiltersVue,
    ReviewNotesTableVue,
  },
  data() {
    return {
      users: [],
      filterOptions: {} as ReviewNoteListOptions,
      reviewNotes: [],
      limit: 3,
      dialog: false,
    }
  },
  mounted() {
    getUsers().then((val) => (this.users = val))
    this.updateReviewNotes()
  },
  methods: {
    filterChanged(filterData: ReviewNoteListOptions) {
      this.filterOptions = filterData
      //Would add debounce here
      this.updateReviewNotes()
    },
    updateReviewNotes() {
      getReviewNotes({...this.filterOptions, limit: this.limit}).then((v) => (this.reviewNotes = v))
    },
    loadMore() {
      this.limit = this.limit + 3
      this.updateReviewNotes()
    },
  },
})
</script>
<style>
.newButton {
  display: inline;
}
</style>
