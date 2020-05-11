<template>
  <div class="star" :class="starType">
    <span v-for="(item,index) in items" :class="item" :key="index" class="star-item"></span>
  </div>
</template>

<script>
export default {
  name: 'star',
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  data() {
    return {
      item: []
    }
  },
  computed: {
    starType() {
      return `star-${this.size}`
    },
    items() {
      const result = []
      const score = Math.floor(this.score * 2) / 2
      const hasDecial = score % 1 !== 0
      const inte = Math.floor(score)
      for (let i = 0; i < inte; i++) {
        result.push('on')
      }
      if (hasDecial) {
        result.push('half')
      }
      while (result.length < 5) {
        result.push('off')
      }
      return result
    }
  },
  methods: {},
  components: {}
}
</script>

<style lang="stylus">
@import '~common/stylus/mixin';

.star {
  display: inline-block;

  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
  }
}

.star-48 {
  .star-item {
    width: 20px;
    height: 20px;
    background-size: 20px 20px;
    margin-right: 22px;

    &:last-child {
      margin-right: 0;
    }

    &.on {
      bg-image: 'star48_on';
    }

    &.half {
      bg-image: 'star48_half';
    }

    &.off {
      bg-image: 'star48_off';
    }
  }
}

.star-36 {
  .star-item {
    width: 15px;
    height: 15px;
    background-size: 15px 15px;
    margin-right: 6px;

    &:last-child {
      margin-right: 0;
    }

    &.on {
      bg-image: 'star36_on';
    }

    &.half {
      bg-image: 'star36_half';
    }

    &.off {
      bg-image: 'star36_off';
    }
  }
}

.star-24 {
  .star-item {
    width: 10px;
    height: 10px;
    background-size: 10px 10px;
    margin-right: 3px;

    &:last-child {
      margin-right: 0;
    }

    &.on {
      bg-image: 'star24_on';
    }

    &.half {
      bg-image: 'star24_half';
    }

    &.off {
      bg-image: 'star24_off';
    }
  }
}
</style>
