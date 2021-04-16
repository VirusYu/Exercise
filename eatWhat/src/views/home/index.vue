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

    <base-add-food @getFoods="getFoods" />
  </div>
</template>

<script lang="ts" >
import { defineComponent, ref, reactive, readonly } from 'vue'

import BaseAddFood from '../../components/base-add-food.vue'

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
  components: {
    BaseAddFood
  },
  setup(props) {
    const first = ref(false)
    const playStatus = ref(false)
    const btnText = ref('点我')
    const currentFood = ref('')
    let foodList: Array<String> = []
    const timer = ref(0)

    function getFoods(foods: Array<String>) {
      foodList = foods
      console.log(foodList);
      
    }

    function randomFood(): void {
      const length = foodList.length
      currentFood.value = foodList[Math.floor(Math.random() * length)] as string
    }

    function startTimer(): void {
      timer.value = setInterval(() => {
        randomFood()
      }, 50)
    }

    function clickHandler(): void {
      if (!first.value) {
        first.value = true
      }
      playStatus.value = !playStatus.value
      if (playStatus.value) {
        startTimer()
        btnText.value = '停'
      } else {
        clearInterval(timer.value)
        btnText.value = '换一种'
      }
    }

    return {
      btnText,
      first,
      currentFood,
      playStatus,
      getFoods,
      clickHandler
    }
  }
})
</script>

<style lang="less" scoped>
.home {
  height: 100vh;
  padding: 20px;
  background: rgb(240, 193, 124);
}
.suggest-box {
  position: absolute;
  top: 47%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  text-align: center;
}

.suggest-btn-box {
  margin-top: 20px;
}
.suggest-title {
  font-size: 16px;
  line-height: 24px;
}
.suggest-btn {
  display: inline-block;
  width: 80px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: #fff;
  border-radius: 5px;
  font-size: 14px;
  background: linear-gradient(to right, #ee780a, #ff6034);
  &:active {
    background: linear-gradient(to right, #ec7404, #f85021);
  }
}
.suggest-food {
  font-weight: 500;
}
</style>