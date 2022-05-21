<template>
  <form
      class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0"
      @submit.prevent="onSubmit"
  >

    <h6 class="text-blueGray-400 text-sm mt-3 mb-6 px-4 font-bold uppercase">
      Information sur l'annonce
    </h6>
    <div class="mb-3 px-4">
      <label class="block text-sm font-medium text-gray-700"> Photo du colis ou du vehicule </label>
      <div class="mt-1 flex items-center">
        <span class="bg-gray-100 mr-3">
          <default-image class="h-24" v-if="!avatarFile"/>
          <img :src="avatarFile" v-else class="h-24 object-cover"/>
        </span>
        <button
            type="button"
            class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            @click="openFileManager"
        >
          Change
        </button>
        <input
            ref="file"
            type="file"
            id=""
            accept="image/jpg, image/jpeg, image/png"
            style="display: none"
            @change="handleFileChange"
        />
      </div>
    </div>
    <div class="w-full lg:w-6/12 px-4">
      <div class="relative w-full mb-3">
        <label
            class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
            htmlFor="grid-password"
        >
          Volume approximatif (en m3)
        </label>
        <input
            type="number"
            class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            placeholder="200"
            v-model="form.volume"
        />
      </div>
      <div class="relative w-full mb-3">
        <label
            class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
            htmlFor="grid-password"
        >
          Description
        </label>
        <textarea
            type="text"

            class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            rows="4"
            placeholder="description"
            v-model="form.description"
        ></textarea>
      </div>
    </div>
    <h6 class="text-blueGray-400 text-sm mt-3 mb-6 px-4 font-bold uppercase">
      Informatiion sur l'itinéraire
    </h6>
    <div class="px-4">
      <label for="country" class="block text-sm font-medium text-gray-700">
        Selectionnez les villes et les dates dans l'ordre
      </label>
      <div class="my-2" v-for="(it, k) in itinerary" :key="k">
        <select
            id="currency"
            name="currency"
            class="focus:ring-indigo-500 focus:border-indigo-500 h-full py-2 pl-2 pr-7 mr-2 text-gray-500 sm:text-sm rounded-md"
            v-model="it.id"
        >
          <option v-for="(v, k) in cities" :key="k" :value="v.id">{{ v.name }}</option>
        </select>
        <input
            type="datetime-local"
            id="meeting-time"
            name="meeting-time"
            min="2020-06-07T00:00"
            class="mr-2"
            v-model="it.date"
        >
        <input
            type="number"
            id="meeting-time"
            name="meeting-time"
            v-model="it.price"
            placeholder="Montant en XAF"
            v-if="k > 0"
        >
        <div class="flex my-2">
          <button type="button"
                  class="py-2 text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                  @click="addItinerary"
          >
            Ajouter
          </button>
          <button
              type="button"
              class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              @click="removeItinerary(k)"
              v-if="k > 0"
          >
            Supprimer
          </button>
        </div>
      </div>
      <button type="submit"
              class="py-2 text-white my-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Enregistrer
      </button>
    </div>
  </form>
</template>

<script>
import DefaultImage from "@/components/DefaultImage";
import {mapActions, mapGetters} from "vuex";
import {BASE_URI, send_request_with_token} from "@/store/config";
import {getData, getUrl, objectDiff} from "../../../../utils";

export default {
  name: "Form",
  components: {
    DefaultImage
  },
  methods: {
    ...mapActions({
      getCity: 'city/getCountries',
      addNotice: 'notice/addNotice',
    }),
    openFileManager() {
      this.$refs.file.click();
    },
    handleFileChange(e) {
      this.avatarFile = e.target.files[0];

      if (FileReader && this.avatarFile) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.avatarFile = e.target.result;
        };
        reader.readAsDataURL(this.avatarFile);
      }
    },
    addItinerary() {
      this.itinerary.push({
        id: 1,
        date: new Date().toISOString().slice(0, 16),
        price: 0
      });
    },
    removeItinerary(index) {
      if (this.itinerary.length >= 2) {
        this.itinerary.splice(index, 1);
      }
    },
    async onSubmit() {
      const city_name = `${this.cities.filter(c => c.id === this.itinerary[0].id)[0].name} - ${this.cities.filter(c => c.id === this.itinerary[this.itinerary.length - 1].id)[0].name}`;
      const start_date = new Date(this.itinerary[0].date).toISOString().slice(0, 16);
      const end_date = new Date(this.itinerary[this.itinerary.length - 1].date).toISOString().slice(0, 16);
      const form = {
        image: this.avatarFile,
        volume: this.volume,
        ...this.form,
        itinerary: {
          name: city_name,
          start_date: start_date,
          end_date: end_date,
          cities: this.itinerary.map(it => ({id: it.id, price: it.price, date: it.date}))
        },
        user_id: this.user?.id
      }
      if (!this.id) {
        const response = await fetch(
            BASE_URI + 'announce/itinerary/',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(form)
            }
        )
        console.log(response.ok);
        if (response.ok) {
          this.clearForm()
          this.addNotice({msg: 'Votre annonce a bien été enregistrée', isSuccess: true});
        } else {
          this.addNotice({msg: 'Une erreur est survenue', isError: true});
        }
        console.log(form);
      } else {
        const diff = objectDiff(form,this.current_announce,['itinerary']);
        if (JSON.stringify(form.itinerary) !== JSON.stringify(this.current_announce.itinerary)) {
          diff.itinerary = form.itinerary
        }
        const response = await send_request_with_token('announce/itinerary/' + this.id, 'PUT', JSON.stringify(diff), {
          'Content-Type': 'application/json'
        });
        console.log(response.status, diff);
      }
    },
    clearForm() {
      console.log('clear')
      this.form = {
        name: '',
        description: '',
        price: 0,
        volume: 0,
        image: '',
        itinerary: {
          name: '',
          start_date: '',
          end_date: '',
          cities: []
        }
      }
      this.avatarFile = null;
      this.itinerary = [
        {
          id: 1,
          date: new Date().toISOString().slice(0, 16),
          price: 0
        }
      ]
    },
  },
  data() {
    return {
      avatarFile: null,
      cities: [],
      itinerary: [
        {
          id: 1,
          date: new Date().toISOString().slice(0, 16),
          price: 0
        }
      ],
      form: {
        volume: null,
        description: null,
      },
      current_announce: null,
    };
  },
  async created() {
    try {
      this.cities = await this.getCity();
    } catch (e) {
      console.log(e);
    }
    if (this.$route.params.id) {
      const data = await getData('announce/' + this.$route.params.id);
      if (data) {
        this.avatarFile = getUrl(data.image)
        this.form = {
          description: data.description,
          volume: data.volume
        }
        this.itinerary = data.itinerary?.itinerary_city.map(c => ({
          id: c.city.id,
          date: new Date(c.date).toISOString().slice(0, 16),
          price: c.price
        }))

        this.current_announce = {
          image: this.avatarFile,
          volume: this.volume,
          ...this.form,
          itinerary: {
            name: data.itinerary?.name,
            start_date: data.itinerary?.start_date,
            end_date: data.itinerary?.end_date,
            cities: this.itinerary.map(it => ({id: it.id, price: it.price, date: it.date}))
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
      notice: 'notice/notices'
    }),
    id() {
      return this.$route.params.id
    }
  },
}
</script>

<style scoped>

</style>