<template>
  <div>
    <TheNavbar />
    <div class="page-content">
      <div class="container">
        <router-view />
      </div>
    </div>

    <TheFooter />
  </div>
</template>
<script>
// @ is an alias to /src
import TheNavbar from "@/views/layouts/partials/TheNavbar.vue";
import TheFooter from "@/views/layouts/partials/TheFooter.vue";

export default {
  name: "App",
  components: {
    TheNavbar,
    TheFooter
  }
};
</script>
