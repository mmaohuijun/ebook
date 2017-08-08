<template>
  <baidu-map class="bm-view" ak="iMMap27ogmvjvR3zcIlioGjQwqC3cU2b" :zoom="12" :center="mapCenter" @ready="handler">
    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
    <bm-marker :position="markerPoint" :dragging="true" @mouseup="mouseupMarker"></bm-marker>
  </baidu-map>
</template>
<script>
import { BaiduMap, BmMarker, BmNavigation } from 'vue-baidu-map'

export default {
  name: 'CaseMap',
  props: {
    location: Object
  },
  data() {
    return {
      mapCenter: { lng: 0, lat: 0 }
    }
  },
  computed: {
    markerPoint() {
      if (!_.isEmpty(this.location)) {
        return this.location
      } else {
        return { lng: 121.480652, lat: 31.2408 }
      }
    }
  },
  methods: {
    // 设置地图中心
    handler({ BMap, map }) {
      // 开启鼠标滚轮放大缩小
      map.enableScrollWheelZoom(true)
      this.mapCenter.lng = 121.480652
      this.mapCenter.lat = 31.2408
    },
    mouseupMarker(event) {
      this.$emit('changeMarkerPoint', event.point)
    }
  },
  components: {
    BaiduMap,
    BmMarker,
    BmNavigation
  }
}
</script>
<style lang="css" scoped>
.bm-view {
  width: 100%;
  height: 100%;
}
</style>
