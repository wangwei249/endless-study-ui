<template>
  <div>
    <svg-icon icon-class="link" @click="goto"/>
  </div>
</template>

<script>
export default {
  name: 'JeeThinkSite',
  data() {
    return {
      url: 'http://jeethink.vip'
    }
  },
  methods: {
    goto() {
      window.open(this.url)
    }
  }
}
</script>