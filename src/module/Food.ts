
console.log()
class Food {
  foodEl = $('.food')
  constructor() {
    this.changePosition()
  }
  // 获取食物坐标的方法
  get X() {
    return this.foodEl.position()!.left
  }
  get Y() {
    return this.foodEl.position()!.top
  }
  // 修改食物的坐标
  changePosition() {
    let left = Math.floor(Math.random()*30)*10;
    let top = Math.floor(Math.random()*30)*10
    this.foodEl.css({left: left + 'px', top: top + 'px'})
  }
}
export default Food;