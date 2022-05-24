<template>
  <div class="w-full mb-12 px-4">
    <div class="mb-5 text-blueGray-600">
      <i class="fas fa-plus mr-1 text-lg text-lightBlue-400"></i>
      <router-link :to="{name: 'announce.form'}" class="text-lightBlue-400">
        Creer une annonce
      </router-link>
    </div>
    <h3
        class="font-bold text-xl mb-4"
    >
      Vos annonces
    </h3>
    <announce-list :is-loading="loader" @delete="delete_item" :announces="announces" />
  </div>
</template>

<script>
import {BASE_URI} from "@/store/config";
import {mapActions, mapGetters} from "vuex";
import AnnounceList from "@/components/Announces/AnnounceList";
import {send_request_with_token} from "@/store/config";

export default {
  name: "Announce",
  components: {AnnounceList},
  data() {
    return {
      announces: [],
      loader: true,
    }
  },
  methods: {
    ...mapActions({
      getCurrentUser: "user/getCurrentUser",
    }),
    async fetchUserAnnounces() {
      const res = await fetch(
          BASE_URI + `announce/user/${this.current_user?.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          }
      );
      if (res.ok) {
        this.announces = await res.json();
      }

    },
    async delete_item(id) {
      console.log(id)
      const res = await send_request_with_token(
          `announce/${id}/${this.current_user.id}`,
          "DELETE"
      )
      if (res.ok) {
        await this.fetchUserAnnounces();
      }
    }
  },
  computed: {
    ...mapGetters({
      current_user: 'user/user'
    })
  },
  async created() {
    console.log('created')
    await this.getCurrentUser();
    console.log(this.current_user)
    await this.fetchUserAnnounces();
    this.loader = false
  }
}
</script>

<style scoped>

</style>