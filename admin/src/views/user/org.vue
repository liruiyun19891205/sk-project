<template>
  <section>
    <treeselect :multiple="true" :options="options" :value-consists-of="valueConsistsOf" v-model="value" />
    <pre class="result">{{ value }}--------{{valueConsistsOf}}</pre>
    <p><strong>Value consists of:</strong></p>
    <p class="options">
      <label><input type="radio" value="ALL" v-model="valueConsistsOf">All</label><br>
      <label><input type="radio" value="BRANCH_PRIORITY" v-model="valueConsistsOf">Branch priority</label><br>
      <label><input type="radio" value="LEAF_PRIORITY" v-model="valueConsistsOf">Leaf priority</label><br>
      <label><input type="radio" value="ALL_WITH_INDETERMINATE" v-model="valueConsistsOf">All with indeterminate</label>
    </p>
  </section>
</template>

<script>
  // import the component
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  export default {
    // register the component
    components: {
      Treeselect
    },
    data: () => ({
      value: null,
      valueConsistsOf: 'ALL',
      options: [{
        id: 'company',
        label: 'Company 🏢',
        children: [{
          id: 'team-i',
          label: 'Team I 👥',
          children: [{
            id: 'person-a',
            label: 'Person A 👱',
          }, {
            id: 'person-b',
            label: 'Person B 🧔',
          }],
        }, {
          id: 'team-ii',
          label: 'Team II 👥',
          children: [{
            id: 'person-c',
            label: 'Person C 👳',
          }, {
            id: 'person-d',
            label: 'Person D 👧',
          }],
        }, {
          id: 'person-e',
          label: 'Person E 👩',
        }],
      }],
    }),
  }

</script>

<style>

</style>
