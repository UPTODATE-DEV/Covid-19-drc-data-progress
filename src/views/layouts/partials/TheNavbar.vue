<template>
  <div class="topbar-wrap">
    <div class="topbar is-sticky">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center">
          <ul class="topbar-nav d-lg-none">
            <li class="topbar-nav-item relative">
              <a class="toggle-nav" href="#">
                <div class="toggle-icon">
                  <span class="toggle-line"></span>
                  <span class="toggle-line"></span>
                  <span class="toggle-line"></span>
                  <span class="toggle-line"></span>
                </div>
              </a>
            </li>
            <!-- .topbar-nav-item -->
          </ul>
          <a class="topbar-logo" href>
            <img :src="`${publicPath}img/COVIDLOGO.png`" />
          </a>
        </div>
      </div>
      <!-- .container -->
    </div>
    <!-- .topbar -->
    <div class="navbar">
      <div class="container">
        <div class="navbar-innr">
          <ul class="navbar-menu">
            <li>
              <a href>
                <i class="fa fa-home"></i>
                Dashboard
              </a>
            </li>
          </ul>
          <ul class="navbar-btns">
            <li>
              <a href="#" class="btn btn-sm btn-outline btn-light">
                <span>DRC Statistics</span>
              </a>
            </li>
          </ul>
        </div>
        <!-- .navbar-innr -->
      </div>
      <!-- .container -->
    </div>
    <!-- .navbar -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      publicPath: process.env.BASE_URL
    };
  }
};
</script>
