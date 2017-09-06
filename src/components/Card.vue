<template>
  <div id='card'>
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
    props: ['card'],
  };
</script>

 <style scoped>
  p {
    padding-right: 5px;
  }
 </style>
