<template>
  <div class="base-add-food">
    <span class="set-my-food-btn" @click="clickHandler">设置我的菜单</span>
  </div>

  <van-dialog v-model:show="show" title="我的菜单" @confirm="confirmHandler">
    <div class="dialog-content">
      <p class="food-text">提示：菜品以空格分开</p>
      <div class="input-box">
        <van-field v-model="foods" rows="4" autosize type="textarea" placeholder="请输入菜单" />
      </div>
    </div>
  </van-dialog>
</template>

<script lang="ts" >
import { defineComponent, ref, reactive, readonly, watchEffect, onMounted } from 'vue'

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
  name: 'BaseAddFood',
  emits: ['getFoods'],
  setup(props, { emit }) {
    const foodList = readonly(commonFoodList)
    const localFoods = localStorage.getItem('foods')
    const show = ref(false)
    const foods = ref(localFoods || foodList.join(' '))

    function clickHandler(): void {
      show.value = true
    }

    function confirmHandler(): void {
      localStorage.setItem('foods', foods.value)
    }

    watchEffect(() => {
      emit('getFoods', foods.value.split(' '))
    })

    return {
      show,
      foods,
      clickHandler,
      confirmHandler
    }
  }
})
</script>

<style lang="less" scoped>
.base-add-food {
  position: fixed;
  bottom: 50px;
  left: 0;
  width: 100%;
  text-align: center;
  .set-my-food-btn {
    display: inline-block;
    padding: 10px;
    font-size: 12px;
    font-weight: normal;
    color: rgba(69, 90, 100, 0.6);
  }
}
.dialog-content {
  padding: 0 10px;
}
.food-text {
  margin-top: 10px;
  padding-left: 15px;
  font-size: 14px;
  color: #999;
}
</style>