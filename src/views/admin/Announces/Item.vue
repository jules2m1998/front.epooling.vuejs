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
            <span style="left: -45px; top: -21px"
                  class="flex absolute justify-center items-center w-16 h-16 bg-white shadow-2xl border border-blueGray-300 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                <img class="rounded-full shadow-lg" :src="getUrl(announce.user?.avatar_url)" alt="Bonnie image"/>
            </span>
            <div
                class="justify-between items-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600">
              <div class="text-sm font-normal text-gray-500 dark:text-gray-300">
                <div class="mt-3 capitalize">
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
                <div class="flex items-center">
                  Tel : <span class="text-blue-500 text-xl ml-2">{{ announce.user.phone_ex }} {{
                    announce.user.phone
                  }}</span>
                </div>
                <div class="flex items-center">
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
                  Minimum <span class="title-font font-medium text-2xl text-gray-900">{{
                    getItPrice(it.price)
                  }} XAF</span>
                </div>
              </li>
            </ol>
          </div>
          <div class="flex">
            <span class="title-font font-medium text-2xl text-gray-900">{{ getPrice(announce) }} XAF</span>
          </div>
          <template v-if="announce.user?.id !== current_user.id">
            <form
                class="relative flex flex-col min-w-0 break-words w-full mt-3 shadow-lg rounded-lg bg-gray-200 border-0"
                @submit.prevent="onSubmit"
                v-if="!is_already_order"
            >
              <div class="flex-auto px-4 lg:px-10 py-8">
                <div class="flex flex-wrap">
                  <div class="w-full lg:w-12/12 px-4">
                    <div class="relative w-full mb-3">
                      <label
                          class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      >
                        Decriver votre proposition
                      </label>
                      <textarea
                          type="text"
                          class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          rows="4"
                          placeholder="description"
                          v-model="description"
                      ></textarea>
                    </div>
                    <button
                        class="flex ml-auto text-white bg-blueGray-600 border-0 py-2 px-6 focus:outline-none hover:bg-lightBlue-600 rounded"
                        v-if="announce.user?.id !== current_user.id"
                        type="submit"
                    >
                      Soummettre une proposition
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <div v-else>
              <h1 class="text-gray-900 text-3xl title-font font-bold mt-3 mb-3">Votre proposition</h1>
              <div class="mb-5 mt-5 ml-6 relative" v-for="(o, k) in announce.orders" :key="k">
                <template v-if="is_my_publish(o)">
                  <div
                    class="justify-between items-center p-4 rounded-lg border border-gray-200 shadow-sm"
                    :class="{ 'bg-red-200': o.is_denied, 'bg-lightBlue-200': o.is_accepted, 'bg-white': !o.is_denied && !o.is_accepted }"
                >
                  <div class="text-sm font-normal text-gray-500 dark:text-gray-300">
                    <p class="leading-relaxed mt-3">{{ o.message }}</p>
                  </div>
                  <div class="flex mt-3">
                    <button
                        class="flex text-white bg-lightBlue-500 border-0 py-2 px-6 focus:outline-none hover:bg-lightBlue-600 mr-2 rounded"
                        @click="delivery_client(o)"
                        v-if="!o.is_delivered_client && o.is_accepted"
                    >
                      Livraison effectuee
                    </button>
                  </div>
                </div>
                </template>
              </div>
            </div>
          </template>
          <template v-else-if="getCount">
            <h1 class="text-gray-900 text-3xl title-font font-bold mt-3 mb-3">Propositions</h1>
            <div>
              <div class="mb-5 mt-6 ml-6 relative" v-for="(o, k) in announce.orders" :key="k">
                <template v-if="!o.is_delivered_agent">
                  <span style="left: -45px; top: -21px"
                        class="flex absolute justify-center items-center w-16 h-16 bg-white shadow-2xl border border-blueGray-300 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                      <img class="rounded-full shadow-lg" :src="getUrl(o.user?.avatar_url)" alt="Bonnie image"/>
                  </span>
                  <div
                      class="justify-between items-center p-4 rounded-lg border border-gray-200 shadow-sm"
                      :class="{ 'bg-red-200': o.is_denied, 'bg-lightBlue-200': o.is_accepted, 'bg-white': !o.is_denied && !o.is_accepted }"
                  >
                    <div class="text-sm font-normal text-gray-500 dark:text-gray-300">
                      <div class="mt-3 capitalize">
                        publier par
                        <template v-if="o.user?.person">
                          <a href="#" class="text-blue-500 dark:text-blue-300">
                            {{ o.user.person.first_name }} {{ o.user.person.last_name }}
                          </a>
                        </template>
                        <template v-else>
                          la societe
                          <a href="#" class="text-blue-500 dark:text-blue-300">
                            {{ o.user.society?.name }}
                          </a>
                        </template>
                      </div>
                      <div class="flex items-center">
                        Tel : <span class="text-blue-500 text-xl ml-2">{{ o.user.phone_ex }} {{
                          o.user.phone
                        }}</span>
                      </div>
                      <div class="flex items-center">
                        Email : <span class="text-blue-500 text-xl ml-2">{{ o.user.email }}</span>
                      </div>
                      <p class="leading-relaxed mt-3">{{ o.message }}</p>
                    </div>
                    <div class="flex mt-3">
                      <button
                          class="flex text-white bg-lightBlue-500 border-0 py-2 px-6 focus:outline-none hover:bg-lightBlue-600 mr-2 rounded"
                          v-if="!o.is_accepted"
                          @click="acceptOrder(o)"
                      >
                        Accepter
                      </button>
                      <button
                          class="flex text-white bg-lightBlue-500 border-0 py-2 px-6 focus:outline-none hover:bg-lightBlue-600 mr-2 rounded"
                          v-else
                          @click="delivery(o)"
                      >
                        Livraison effectuee
                      </button>
                      <button
                          class="flex text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-lightBlue-600 rounded"
                          v-if="!o.is_denied"
                          @click="deniedOrder(o)"
                      >
                        Refuser
                      </button>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {getData, getUrl, make_request} from "../../../../utils";
import moment from "moment";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Item",
  data() {
    return {
      announce: null,
      description: ''
    }
  },
  async created() {
    await this.getCurrentUser()
    await this.getCurrentAnnounce()
  },
  methods: {
    ...mapActions({
      notice_me: 'notice/addNotice',
      getCurrentUser: 'user/getCurrentUser'
    }),
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
    },
    async onSubmit() {
      const body = {
        "user_id": this.current_user.id,
        "announce_id": this.announce.id,
        "message": this.description
      }
      const request = await make_request(
          'order/',
          'POST',
          JSON.stringify(body),
          {
            'Content-Type': 'application/json'
          })
      if (request.ok) {
        this.notice_me({
          msg: 'Votre proposition a bien été soumise',
          isSuccess: true
        })
        await this.getCurrentAnnounce()
      } else {
        this.notice_me({
          msg: 'Une erreur est survenue',
          isError: true
        })
      }
    },
    /**
     *
     * @param order {{"id": 0,"is_accepted": false,"is_denied": false,"is_delivered_agent": false,"is_delivered_client": false}}
     * @returns {Promise<void>}
     */
    async acceptOrder(order) {
      const body = {
        id: order.id,
        is_accepted: true,
        is_denied: false,
        is_delivered_agent: order.is_delivered_agent,
        is_delivered_client: order.is_delivered_client
      }
      const response = await make_request(
          'order/',
          'PUT',
          JSON.stringify(body),
          {
            'Content-Type': 'application/json'
          })
      if (response.ok) {
        await this.getCurrentAnnounce()
      }
    },
    /**
     *
     * @param order {{"id": 0,"is_accepted": false,"is_denied": false,"is_delivered_agent": false,"is_delivered_client": false}}
     * @returns {Promise<void>}
     */
    async deniedOrder(order) {
      const body = {
        id: order.id,
        is_accepted: false,
        is_denied: true,
        is_delivered_agent: order.is_delivered_agent,
        is_delivered_client: order.is_delivered_client
      }
      const response = await make_request(
          'order/',
          'PUT',
          JSON.stringify(body),
          {
            'Content-Type': 'application/json'
          })
      if (response.ok) {
        await this.getCurrentAnnounce()
      }
    },
    /**
     *
     * @param order {{"id": 0,"is_accepted": false,"is_denied": false,"is_delivered_agent": false,"is_delivered_client": false}}
     * @returns {Promise<void>}
     */
    async delivery(order) {
      const body = {
        id: order.id,
        is_accepted: order.is_accepted,
        is_denied: order.is_denied,
        is_delivered_agent: true,
        is_delivered_client: order.is_delivered_client
      }
      const response = await make_request(
          'order/',
          'PUT',
          JSON.stringify(body),
          {
            'Content-Type': 'application/json'
          })
      if (response.ok) {
        await this.getCurrentAnnounce()
      }
    },
    /**
     *
     * @param order {{"id": 0,"is_accepted": false,"is_denied": false,"is_delivered_agent": false,"is_delivered_client": false}}
     * @returns {Promise<void>}
     */
    async delivery_client(order) {
      const body = {
        id: order.id,
        is_accepted: order.is_accepted,
        is_denied: order.is_denied,
        is_delivered_agent: order.is_delivered_agent,
        is_delivered_client: true
      }
      const response = await make_request(
          'order/',
          'PUT',
          JSON.stringify(body),
          {
            'Content-Type': 'application/json'
          })
      if (response.ok) {
        await this.getCurrentAnnounce()
        this.notice_me({
          msg: 'Merci pour votre confiance',
          isSuccess: true
        })
      }
    },
    /**
     *
     * @param order {{"id": 0,"is_accepted": false,"is_denied": false,"is_delivered_agent": false,"is_delivered_client": false}}
     * @returns {Promise<void>}
     */
    async is_my_publish(order) {
      return order.user.id === this.current_user.id
    },
    async getCurrentAnnounce() {
      const data = await getData(`announce/${this.$route.params.id}`);
      console.log(data);
      this.announce = data
    }
  },
  computed: {
    ...mapGetters(
        {
          current_user: "user/user"
        }
    ),
    /**
     *
     * @returns {number}
     */
    getCount() {
      return this.announce.orders?.filter(x => !x.is_delivered_agent).length
    },
    /**
     *
     * @returns {boolean}
     */
    is_already_order(){
      return this.announce.orders?.filter(x => x.user?.id === this.current_user.id).length > 0
    }
  }
}
</script>

<style scoped>

</style>