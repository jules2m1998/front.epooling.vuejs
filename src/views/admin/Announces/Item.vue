<template>
  <section class="text-gray-700 body-font overflow-hidden bg-white">
    <div class="container px-5 py-24 mx-auto" v-if="announce">
      <div class="lg:w-4/5 mx-auto flex flex-wrap">
        <img alt="ecommerce" class="lg:w-1/2 w-full h-350-px object-cover object-center rounded border border-gray-200"
             :src="getUrl(announce.image)">
        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <h2 class="text-sm title-font text-gray-500 tracking-widest">
            {{ getDate(announce.created_at) }}
          </h2>
          <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{{ announce.itinerary?.name }}</h1>
          <div class="mb-5 mt-6 ml-6 relative">
            <span style="left: -45px; top: -21px" class="flex absolute justify-center items-center w-16 h-16 bg-white shadow-2xl border border-blueGray-300 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                <img class="rounded-full shadow-lg" :src="getUrl(announce.user?.avatar_url)" alt="Bonnie image"/>
            </span>
            <div class="justify-between items-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600">
                <div class="text-sm font-normal text-gray-500 dark:text-gray-300">
                  <div>
                      publier par
                    <template v-if="announce.user?.person">
                      <a href="#" class="text-blue-500 dark:text-blue-300">
                        {{ announce.user.person.first_name }} {{ announce.user.person.last_name }}
                      </a>
                    </template>
                    <template v-else>
                      la societe
                      <a href="#" class="text-blue-500 dark:text-blue-300">
                        {{ announce.user.society?.name }}
                      </a>
                    </template>
                  </div>
                  <div class="flex justify-center items-center">
                    Tel : <span class="text-blue-500 text-xl ml-2">{{announce.user.phone_ex}} {{ announce.user.phone }}</span>
                  </div>
                  <div class="flex justify-center items-center">
                    Email : <span class="text-blue-500 text-xl ml-2">{{ announce.user.email }}</span>
                  </div>
                </div>
            </div>
        </div>
          <p class="leading-relaxed">{{ announce.description }}</p>
          <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
            <ol class="relative border-l border-gray-200 dark:border-gray-700">
              <li class="mb-10 ml-6" v-for="(it,k) in announce.itinerary?.itinerary_city" :key="k">
                  <span style="left: -13px"
                        class="flex absolute justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                      <svg class="w-3 h-3 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20"
                           xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd"
                                                                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                                    clip-rule="evenodd"></path></svg>
                  </span>
                <h3 class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                  {{ it.city?.name }}
                  <span
                      class="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3"
                      v-if="isFirstElement(it)">Depart</span>
                  <span
                      class="bg-orange-200 text-orange-500 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3"
                      v-else-if="isLastElement(it)">Arrivee</span>
                  <span
                      class="bg-gray-200 text-gray-500 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3"
                      v-else>Arret</span>
                </h3>
                <time class="block mb-2 text-sm font-normal leading-none text-gray-500 dark:text-gray-500">
                  {{ getDate(it.date) }}
                </time>
                <div v-if="!isFirstElement(it)">
                  Minimum <span class="title-font font-medium text-2xl text-gray-900">{{ getItPrice(it.price) }} XAF</span>
                </div>
              </li>
            </ol>
          </div>
          <div class="flex">
            <span class="title-font font-medium text-2xl text-gray-900">{{ getPrice(announce) }} XAF</span>
            <button
                class="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
              Button
            </button>
            <button
                class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5"
                   viewBox="0 0 24 24">
                <path
                    d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {getData, getUrl} from "../../../../utils";
import moment from "moment";

export default {
  name: "Item",
  data() {
    return {
      announce: null
    }
  },
  async created() {
    const data = await getData(`announce/${this.$route.params.id}`);
    console.log(data);
    this.announce = data
  },
  methods: {
    getUrl(image) {
      return getUrl(image)
    },
    getPrice(announce) {
      const prices = announce.itinerary?.itinerary_city
      if (prices) {
        return prices.map(price => price.price).reduce((a, b) => a + b).toLocaleString(
            {
              style: "currency",
              currency: "XAF"
            }
        );
      }
      return 0
    },
    /**
     *
     * @param {string} it
     * @returns {string}
     */
    getItPrice(it) {
      return it.toLocaleString({
        style: "currency",
        currency: "XAF"
      })
    },
    getItinerary(announce) {
      let itinerary = announce.itinerary?.itinerary_city
      if (itinerary) {
        return itinerary.map(it => it.city.name).join(" ~ ")
      }
      return ''
    },
    getDate(date) {
      return moment(date).locale("fr").calendar()
    },
    isFirstElement(itinerary) {
      return Math.min(...this.announce.itinerary?.itinerary_city?.map(o => o.order)) === itinerary.order
    },
    isLastElement(itinerary) {
      return Math.max(...this.announce.itinerary?.itinerary_city?.map(o => o.order)) === itinerary.order
    }
  }
}
</script>

<style scoped>

</style>