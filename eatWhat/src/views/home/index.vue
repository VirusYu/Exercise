<template>
  <div class="home">
    <div class="suggest-box">
      <div class="suggest-title" v-if="!first">今天吃什么</div>
      <div class="suggest-title" v-else>
        今天吃 <span class="suggest-food">{{ currentFood }}</span> 吧
      </div>
      <div class="suggest-btn-box">
        <div class="suggest-btn" @click="clickHandler">{{ btnText }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" >
import { defineComponent, ref, reactive, readonly } from 'vue'

const commonFoodList: Array<String> = [
  '椒麻鸡拌面',
  '黄焖鸡',
  '米线',
  '刀削面',
  '肉饼',
  '汉堡',
  '麻辣烫',
  '卤肉饭',
  '水饺',
  '自助',
  '东北菜',
  '肉夹馍',
  '凉皮',
  '炒方便面',
  '炒河粉',
  '丸子汤'
]

export default defineComponent({
  name: 'home',
  setup(props) {
    const first = ref(false)
    const playStatus = ref(false)
    const btnText = ref('点我')
    const currentFood = ref('')
    const foodList = reactive(commonFoodList)
    const timer = ref(null)

    function randomFood() {
      return foodList[0] as string
    }

    function clickHandler(): void {
      first.value = true
      btnText.value = '停'
      currentFood.value = randomFood()
    }

    return {
      btnText,
      first,
      currentFood,
      playStatus,
      clickHandler
    }
  }
})
</script>

<style lang="less" scoped>
.home {
  height: 100vh;
  padding: 40px;
  background: rgb(240, 193, 124);
}
.suggest-box {
  position: absolute;
  top: 47%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  text-align: center;
}

.suggest-btn-box {
  margin-top: 40px;
}
.suggest-title {
  font-size: 32px;
  line-height: 48px;
}
.suggest-btn {
  display: inline-block;
  width: 160px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  color: #fff;
  border-radius: 10px;
  font-size: 28px;
  background: linear-gradient(to right, #ee780a, #ff6034);
  &:active {
    background: linear-gradient(to right, #ec7404, #f85021);
  }
}
.suggest-food {
  font-weight: 500;
}
</style>