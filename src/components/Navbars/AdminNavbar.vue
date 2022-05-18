<template>
  <!-- Navbar -->
  <nav
      class="w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4"
  >
    <div
        class="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4"
    >
      <!-- Form -->
      <div
          class="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3"
      >
        {{ account.username }}
      </div>
      <!-- User -->
      <ul class="flex-col md:flex-row list-none items-center hidden md:flex">

        <div
            class="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full"
        >
          <default-image
              class="w-full rounded-full align-middle border-none shadow-lg"
              v-if="!getAvatar"
          />

          <img v-else :src="getAvatar" class="rounded-full w-12 h-12 object-cover"/>
        </div>
      </ul>
    </div>
  </nav>
  <!-- End Navbar -->
</template>

<script>
import {mapGetters} from "vuex";
import DefaultImage from "@/components/DefaultImage";
import {BASE_URI} from "@/store/config";

export default {
  components: {DefaultImage},
  computed: {
    ...mapGetters({
      account: "account/account",
      user: "user/user",
    }),
    getAvatar() {
      return this.user?.avatar_url ? `${BASE_URI}${this.user.avatar_url}` : null;
    },
  },
  data() {
    return {
      uri: BASE_URI,
    };
  },
};
</script>
