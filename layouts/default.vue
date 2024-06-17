<template>
    <div>
      <NavBar /> <!-- Navigation bar component -->
      <Nuxt /> <!-- This tag renders the page content -->
    </div>
  </template>
  
  <script>
  import NavBar from '@/components/NavBar.vue'

  
  export default {
    components: {
      NavBar
    }
  }
  </script>
  