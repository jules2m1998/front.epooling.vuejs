<template>
  <div>
    <div class="flex-col fixed top-0 right-0 z-50">
      <div
          class="m-1 p-4 z-50 rounded border-2 border-gray-200 shadow"
          role="alert"
          v-for="(v, k) in notices" :key="k"
          :class="{ 'bg-orange-200 text-orange-700': v.type === msgType.error, 'bg-green-200 text-green-700': v.type === msgType.success, 'bg-blue-200 text-blue-700': v.type === msgType.info }"
      >
        <p class="font-bold">{{ msg[v.type] }}</p>
        <p>{{ v.msg }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {msg, msgType} from "../../const";

export default {
  name: "NoticeAlert",
  computed: {
    ...mapGetters({
      notices: "notice/notices"
    })
  },
  data() {
    return {
      msg,
      msgType
    };
  }
}
</script>

<style scoped>
.bg-green-200 {
  background-color: #e6fffa;
}
.text-green-700 {
  color: #8cf390;
}
.bg-blue-200  {
  background-color: #e3f2fd;
}
.text-blue-700 {
  color: #64b5f6;
}
</style>