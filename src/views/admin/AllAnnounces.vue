<template>
  <div>
    <div class="w-full md:w-2/3 shadow p-5 rounded-lg bg-white" v-if="announces.length">

      <div class="flex items-center justify-between mt-4">
        <p class="font-medium">
          Filtres
        </p>

        <div>
          <button
              @click.prevent="getAllAnnounces"
              class="px-4 py-2 bg-gray-100 hover:bg-gray-200 mr-1 text-gray-800 text-sm font-medium rounded-md">
            Annuller le filtre
          </button>

          <button @click.prevent="addFilters" class="px-4 py-2 bg-blueGray-600 hover:bg-gray-200 text-white text-sm font-medium rounded-md">
          Appliquer
        </button>
        </div>
      </div>

      <div>
        <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
          <select
              v-model="form.start"
              class="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
            <option value="-1">Ville de depart</option>
            <option v-for="(v, k) in cities" :key="k" :value="v.id">{{ v.name }}</option>
          </select>

          <select
              v-model="form.end"
              class="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
            <option value="-1">Ville d'arriver</option>
            <option v-for="(v, k) in cities" :key="k" :value="v.id">{{ v.name }}</option>
          </select>
        </div>
      </div>
    </div>
    <announce-list :is-loading="loader" class="mt-3" :announces="announces" @delete="delete_item" />
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {getData} from "../../../utils";
import AnnounceList from "@/components/Announces/AnnounceList";
import {send_request_with_token} from "@/store/config";

export default {
  name: "AllAnnounces",
  components: {
    AnnounceList
  },
  data() {
    return {
      announces: [],
      cities: [],
      form: {
        start: -1,
        end: -1
      },
      loader: true
    };
  },
  methods:{
    ...mapActions(
        {
          getCities: 'city/getCountries'
        }
    ),
    async getAllAnnounces() {
      this.form = {
        start: -1,
        end: -1
      }
      try {
        this.announces = await getData('announce')
      } catch (e) {
        console.log(e)
      }
    },
    async addFilters() {
      this.loader = true
      try {
        if (this.form.end !== -1 && this.form.start !== -1) {
          this.announces = await getData(`announce?start=${this.form.start}&end=${this.form.end}`)
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.loader = false
      }
    },
    /**
     *
     * @param {Number} id
     * @returns {Promise<void>}
     */
    async delete_item(id) {
      console.log(id)
      const res = await send_request_with_token(
          `announce/${id}/${this.current_user.id}`,
          "DELETE"
      )
      if (res.ok) {
        await this.getAllAnnounces()
      }
    }
  },
  async created() {
    this.cities = await this.getCities();
    await this.getAllAnnounces()
    this.loader = false
  },
  computed: {
    ...mapGetters({
      current_user: 'user/user'
    })
  }
}
</script>

<style scoped>

</style>