<template>
  <div id="app">
    <notice-alert />
    <router-view />
  </div>
</template>
<script>
import NoticeAlert from "@/components/NoticeAlert";
export default {
  components: {NoticeAlert}
}
</script>