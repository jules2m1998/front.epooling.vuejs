<template>
  <form
      @submit.prevent="create"
      class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0"
  >
    <div class="rounded-t bg-white mb-0 px-6 py-6">
      <div class="text-center flex justify-between">
        <h6 class="text-blueGray-700 text-xl font-bold">Mon compte</h6>
        <button
            class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            type="submit"
        >
          <template v-if="isLoad">
            <loader class="flex justify-center justify-center"/>
          </template>
          <template v-else>
            Enregistrer
          </template>
        </button>
      </div>
    </div>
    <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
      <div>
        <div class="bg-orange-200 text-orange-700 px-4 py-3 mt-3 rounded relative" role="alert" v-if="errors.length">
          <strong class="font-bold">Champs invalides</strong>
          <ul class="block sm:inline">
            <li v-for="(e, k) in errors" :key="k">{{ e }}</li>
          </ul>
        </div>
        <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          Informatiion sur le compte
        </h6>
        <div class="mb-3 px-4">
          <label class="block text-sm font-medium text-gray-700"> Photo </label>
          <div class="mt-1 flex items-center">
            <span class="h-12 w-12 bg-gray-100 mr-3">
              <default-image v-if="(!current_user || !current_user.avatar_url) && !user_detail.avatar_url"/>
              <img v-else :src="getAvatarUri" class="h-12 w-12 rounded-full object-cover"/>
            </span>
            <button type="button"
                    class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    @click="openFileManager"
            >
              Change
            </button>
            <input ref="file" type="file" id="" accept="image/jpg, image/jpeg, image/png" style="display: none"
                   @change="handleFileChange">
          </div>
        </div>

        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
              >
                Nom d'utilisateur
              </label>
              <input
                  type="text"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  v-model="account.username"
                  placeholder="lucky.jesse"
              />
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
              >
                Addresse email
              </label>
              <input
                  type="email"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="jesse@example.com"
                  v-model="user_detail.email"
              />
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
              >
                Extension du numéro de téléphone
              </label>
              <input
                  type="text"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="+237"
                  v-model="user_detail.phone_ex"
              />
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
              >
                Numéro de téléphone
              </label>
              <input
                  type="text"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="6xxxxxxxx"
                  v-model="user_detail.phone"
              />
            </div>
          </div>
        </div>

        <hr class="mt-6 border-b-1 border-blueGray-300"/>

        <div class="flex items-center mt-3" v-if="isCheckVisible">
          <input id="remember-me" name="remember-me" type="checkbox" v-model="isEnterprise"
                 class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
          <label for="remember-me" class="ml-2 block text-sm text-gray-900"> Compte pour entreprise </label>
        </div>

        <template v-if="!isTypeEnterprise">
          <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Informaton personnelle
          </h6>
          <div class="flex flex-wrap">
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                >
                  Nom
                </label>
                <input
                    type="text"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Nom"
                    v-model="person.last_name"
                />
              </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                >
                  Prenom
                </label>
                <input
                    type="text"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Prenom"
                    v-model="person.first_name"
                />
              </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
              <label for="country" class="block text-sm font-medium text-gray-700">Sexe</label>
              <select v-model.number="person.sex" id="country" name="sexe"
                      class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="0">Home</option>
                <option value="1">Femme</option>
              </select>
            </div>
          </div>
        </template>
        <template v-else>
          <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Informaton personnelle
          </h6>
          <div class="flex flex-wrap">
            <div class="w-full lg:w-12/12 px-4">
              <div class="relative w-full mb-3">
                <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                >
                  Nom de l'entreprise
                </label>
                <input
                    type="text"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Douala, makepe missoke"
                    v-model="society.name"
                />
              </div>
              <div class="relative w-full mb-3">
                <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                >
                  Localisation
                </label>
                <input
                    type="text"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Douala, makepe missoke"
                    v-model="society.location"
                />
              </div>
              <div class="relative w-full mb-3">
                <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                >
                  description
                </label>
                <textarea
                    type="text"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    rows="4"
                    placeholder="description"
                    v-model="society.desc"
                ></textarea>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </form>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Loader from "@/components/Loader";
import DefaultImage from "@/components/DefaultImage";
import {BASE_URI} from "@/store/config";

export default {
  components: {
    DefaultImage,
    Loader
  },
  data() {
    return {
      isEnterprise: true,
      isLoad: false,
      user_detail: {
        email: null,
        phone: null,
        phone_ex: null,
        avatar_url: '',
      },
      person: {
        first_name: null,
        last_name: null,
        sex: null,
      },
      society: {
        desc: null,
        location: null,
        name: null
      },
      uri: BASE_URI,
      avatarFile: null,
      errors: [],
      frenchField: {
        phone: 'Telephone',
        phone_ex: 'Extension du numero de telephone',
        first_name: 'Prénom',
        last_name: 'Nom',
        email: 'Email',

      }
    }
  },
  methods: {
    ...mapActions(
        {
          createCurrentUser: "user/createCurrentUser",
          updateUser: "user/updateUser",
          updateSociety: "user/updateSociety",
          updatePerson: "user/updatePerson",
          noticeMe: 'notice/addNotice',
          getCurrentUser: "user/getCurrentUser",
        }
    ),
    async create() {
      this.isLoad = true;
      try {
        if (!this.current_user) {
          try {
            let user
            if (this.avatarFile) {
              user = {...this.user_detail, avatar: this.avatarFile, account_id: this.account.id}
            } else {
              user = {...this.user_detail, account_id: this.account.id}
            }
            let isPerson = false
            if (this.isEnterprise) {
              user = {...user, ...this.society};
            } else {
              user = {...user, ...this.person};
              isPerson = true
            }
            const response = await this.createCurrentUser({user, isPerson: isPerson})
            await this.showUpdateMessage(response)
            await this.getCurrentUser()
            console.log(response)
          } catch (e) {
            console.log(e)
          }
        } else {
          if (JSON.stringify(this.objectDiff(this.user_detail, this.current_user, ['avatar_url'])) !== JSON.stringify({}) || this.avatarFile) {
            await this.updateUserDetail()
          }
          if (JSON.stringify(this.objectDiff(this.society, this.current_user?.society)) !== JSON.stringify({})) {
            await this.updateCurrentSociety()
          }
          if (JSON.stringify(this.objectDiff(this.person, this.current_user?.person)) !== JSON.stringify({})) {
            await this.updateCurrentPerson()
          }
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoad = false;
      }
    },
    async updateUserDetail() {
      console.log('user update')
      const update_user = {
        ...this.objectDiff(this.user_detail, this.current_user, ['avatar_url']),
        user_id: this.current_user.id
      }
      console.log(update_user)
      if (this.avatarFile) {
        update_user.avatar = this.avatarFile
      }
      console.log(update_user)
      const response = await this.updateUser(update_user)
      await this.showUpdateMessage(response)
    },
    async updateCurrentSociety() {
      console.log('society update')
      const diff = {
        ...this.objectDiff(this.society, this.current_user?.society),
        user_id: this.current_user.id,
        id: this.current_user?.society?.id
      }
      const response = await this.updateSociety(diff)
      await this.showUpdateMessage(response)
    },
    async updateCurrentPerson() {
      console.log('society update')
      const diff = {
        ...this.objectDiff(this.person, this.current_user?.person),
        user_id: this.current_user.id
      }
      const response = await this.updatePerson(diff)
      await this.showUpdateMessage(response)
    },
    async showUpdateMessage(response) {
      this.errors = []
      if (response.ok){
        this.noticeMe({msg: 'Modification effectuée avec succès', isSuccess: true})
      } else {
        // const h =  {"detail":[{"loc":["body","phone"],"msg":"value is not a valid integer","type":"type_error.integer"}]}
        if (response.status === 422) {
          this.noticeMe({msg: 'Veuillez corriger les erreurs', isError: true})
          const body = await response.json()
          if (body.detail) {
            body.detail.forEach(error => {
              console.log(error, body.detail)
              this.addError(error.message)
            })
          }
        } else {
          this.noticeMe({msg: 'Une erreur est survenue', isSuccess: false})
        }
      }
    },
    handleFileChange(e) {
      this.avatarFile = e.target.files[0];

      if (FileReader && this.avatarFile) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.user_detail.avatar_url = e.target.result;
        };
        reader.readAsDataURL(this.avatarFile);
      }
    },
    openFileManager() {
      this.$refs.file.click();
    },
    objectDiff(obj1, obj2, ignore = []) {
      let diff = {};
      if (obj1 && obj2) {
        for (let key in obj1) {
          if (obj2[key] !== obj1[key] && ignore.indexOf(key) === -1) {
            diff[key] = obj1[key];
          }
        }
      }
      return diff;
    },
    addError(error) {
      this.errors.push(error)
      setTimeout(() => {
        this.removeError(error)
      }, 3000)
    },
    removeError(error) {
      this.errors.splice(this.errors.indexOf(error), 1)
    },
  },
  computed: {
    ...mapGetters({
      account: "account/account",
      current_user: "user/user",
    }),
    isCheckVisible() {
      return !this.current_user;
    },
    isTypeEnterprise() {
      if (!this.current_user) {
        return this.isEnterprise;
      } else {
        return !!this.current_user.society;
      }
    },
    getAvatarUri() {
      if (this.current_user) {
        if (this.user_detail.avatar_url === this.current_user.avatar_url) {
          return this.uri + this.user_detail.avatar_url;
        } else {
          return this.user_detail.avatar_url;
        }
      } else if (this.avatarFile) {
        return this.user_detail.avatar_url;
      } else {
        return this.uri + this.user_detail.avatar_url;
      }
    },
  },
  async created() {
    await this.getCurrentUser()
    if (this.current_user) {
      this.user_detail.email = this.current_user.email
      this.user_detail.phone = this.current_user.phone
      this.user_detail.phone_ex = this.current_user.phone_ex
      this.user_detail.avatar_url = this.current_user.avatar_url

      this.person.first_name = this.current_user.person?.first_name
      this.person.last_name = this.current_user.person?.last_name
      this.person.sex = this.current_user.person?.sex

      this.society.desc = this.current_user.society?.desc
      this.society.location = this.current_user.society?.location
      this.society.name = this.current_user.society?.name
    }
  }
}
</script>