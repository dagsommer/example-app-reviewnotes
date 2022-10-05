<template>
  <v-data-table
    :headers="headers"
    :items="items"
    class="elevation-1"
    disable-pagination
    hide-default-footer
  ></v-data-table>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {text: 'Title', value: 'title'},
        {text: 'Type', value: 'type'},
        {text: 'State', value: 'status'},
        {text: 'Priority', value: 'priority'},
        {text: 'Due date', value: 'dueDate'},
        {text: 'Section', value: 'sectionRef'},
        {text: 'Created', value: 'createdAt.$date'},
        {text: 'Updated', value: 'updatedAt.$date'},
      ],
    }
  },
  props: {
    items: {
      type: Array,
      value: [],
    },
  },
}
</script>

<style></style>
