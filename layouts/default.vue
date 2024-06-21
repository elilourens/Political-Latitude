<template>
    <div>
      <NavBar /> <!-- Navigation bar component -->
      <Nuxt /> <!-- This tag renders the page content -->
      <Footer />
    </div>
  </template>
  
  <script>
  import NavBar from '@/components/NavBar.vue'
  import Footer from '@/components/Footer.vue'
  
  export default {
    components: {
      NavBar,
      Footer
    }
  }
  </script>
  