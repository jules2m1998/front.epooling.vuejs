<template>
  <div>
    <sidebar />
    <div class="relative md:ml-64 bg-blueGray-100">
      <admin-navbar />
      <div class="px-4 md:px-10 mx-auto w-full">
        <router-view />
        <footer-admin />
      </div>
    </div>
  </div>
</template>
<script>
import AdminNavbar from "@/components/Navbars/AdminNavbar.vue";
import Sidebar from "@/components/Sidebar/Sidebar.vue";
import FooterAdmin from "@/components/Footers/FooterAdmin.vue";
import {mapActions} from "vuex";
export default {
  name: "admin-layout",
  components: {
    AdminNavbar,
    Sidebar,
    FooterAdmin,
  },
  methods: {
    ...mapActions(
        {
          getCurrentUser: "user/getCurrentUser",
        }
    ),
  },
  async created() {
    await this.getCurrentUser();
  }
};
</script>
