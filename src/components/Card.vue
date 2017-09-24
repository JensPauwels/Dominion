<template>
  <div v-on:click="onClick" id='card'>
    <p>{{ card.name }}</p>
    <p>{{ card.cost }}</p>
    <p>{{ card.action }}</p>
    <p>{{ card.value }}</p>
    <p>{{ card.amount }}</p>
  </div>
</template>

<script>
  export default {
    name: 'card',
    data() {
      return {
      };
    },
    methods: {
      onClick() {
        this.$emit('cardClick', this.card);
      },
    },
    props: ['card'],
  };
</script>

 <style scoped>
  p {
    padding-right: 5px;
  }
 </style>
