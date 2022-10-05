<template>
  <div>
    <v-row>
      <v-col>
        <p class="mb-1">Search title:</p>
        <v-text-field
          v-model="filters.title"
          prepend-inner-icon="mdi-magnify"
          placeholder="search"
          rounded
          outlined
          dense
        />
      </v-col>
      <v-col>
        <p class="mb-1">Type</p>
        <v-btn-toggle
          v-model="filters.type"
          mandatory
          :default="null"
          small
          :max="1"
          class="newButton ml-5"
        >
          <v-btn small :value="null">All</v-btn>
          <v-btn small value="Task">Tasks</v-btn>
          <v-btn small value="ReviewNote">Notes</v-btn>
        </v-btn-toggle>
      </v-col>
      <v-col cols="2">
        <p class="mb-1">Priority</p>
        <v-btn-toggle
          v-model="filters.priority"
          mandatory
          :default="null"
          small
          :max="1"
          class="newButton ml-5"
        >
          <v-btn small :value="null">All</v-btn>
          <v-btn small :value="0">Low</v-btn>
          <v-btn small :value="1">Medium</v-btn>
          <v-btn small :value="2">High</v-btn>
        </v-btn-toggle>
      </v-col>
      <v-col>
        <p class="mb-1">Reporter</p>
        <v-autocomplete
          v-model="filters.reporter"
          :items="userList"
          small-chips
          outlined
          dense
          solo
        />
      </v-col>
      <v-col>
        <p class="mb-1">Assignees</p>
        <v-autocomplete
          v-model="filters.assignees"
          :items="userList"
          small-chips
          outlined
          dense
          solo
        />
      </v-col>
      <v-col>
        <p class="mb-1">Section</p>
        <v-autocomplete v-model="filters.section" small-chips outlined dense solo />
      </v-col>
      <v-col>
        <p class="mb-1">Date</p>
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value="filters.date"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template #activator="{on, attrs}">
            <v-text-field
              v-model="filters.date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="filters.date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date)"> OK </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <a href="#" @click="clearFilters">Clear filters</a>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import {ReviewNoteListOptions} from '../util/ReviewNoteListOptions'
import {UserType} from '../util/UserType'
export default {
  props: {
    users: {
      value: [] as UserType[],
      type: Array,
    },
  },
  emits: ['changed'],
  data() {
    return {
      filters: {
        reporter: undefined,
        assignees: undefined,
        date: undefined,
        type: undefined,
        title: undefined,
        priority: undefined,
      } as ReviewNoteListOptions,
      menu: false,
    }
  },
  methods: {
    clearFilters() {
      this.filters = {}
    },
  },
  watch: {
    filters: {
      handler(newValue: any) {
        console.log('watched change')

        this.$emit('changed', newValue)
      },
      deep: true,
    },
  },
  computed: {
    userList(): {label: string; value: string}[] {
      return this.users.map((u) => {
        return {label: u.name, value: u.id}
      })
    },
  },
}
</script>
