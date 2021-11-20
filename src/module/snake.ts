class Snake {
  snakeEl = $('.snake'); // 蛇的容器
  head = $('.snake > div'); // 蛇头
  bodies = $('.snake div'); // 蛇的所有身子
  constructor() {
  }

  get X() {
    return this.head.position()!.left;
  }
  get Y() {
    return this.head.position()!.top;
  }

  set X(value: number) {
    if (this.X === value) {
      return
    }
    // 当X轴的值小于0 或者大于290 表示蛇已经到了左右边界要撞墙了
    if(value < 0 || value > 290) {
      throw new Error('撞墙了')
    }
    // 判断是否掉头 当需要设置的值和蛇的身体第二节的值相同的时候就说明发生了掉头
    // 只有一节的时候可掉头
    let nextBody = this.bodies[1]
    if (nextBody && $(nextBody).position().left === value) {
      //发生掉头之后接着向预定方向走
      if(value < this.X) { // 表示原先向又走现在按了按键向左走了
        value = this.X + 10
      } else {
        value = this.X - 10
      }
    }
    if (!this.checkIsBumpMyself(value, this.Y)) {
      this.moveBody()
      this.head.css({left: value + 'px'})
    } else {
      throw new Error('撞到自己了')
    }
    
  }

  set Y(value: number) {
    // 没
    if (this.Y === value) {
      return
    }
    // 当Y轴的值小于0 或者大于290 表示蛇已经到了上下边界要撞墙了
    if(value < 0 || value > 290) {
      throw new Error('撞墙了')
    }
    let nextBody = this.bodies[1]
    if (nextBody && $(nextBody).position().top === value) {
      //发生掉头之后接着向预定方向走
      if(value < this.Y) {
        value = this.Y + 10
      } else {
        value = this.Y - 10
      }
    }
    if (!this.checkIsBumpMyself(this.X ,value)) {
      this.moveBody()
      this.head.css({top: value + 'px'})
    } else {
      throw new Error('撞到自己了')
    }
    
  }

  addBody() {
    this.snakeEl.append('<div></div>')
    this.bodies = $('.snake div')
  }
  // 设置身体的位置
  moveBody() {
      // 移动身体的时候应该设置完蛇头的位置之后将后面的每一节往前移动一个位置占用前面的一个的位置
      // 就是最后一个占了倒数第二个的位置
      // this.bodies.length - 1除去蛇头
      for(let i = this.bodies.length - 1; i > 0; i--) {
        let el = $(this.bodies[i]);
        let preEl = $(this.bodies[i - 1]);
        let x = preEl.position().left;
        let y = preEl.position().top;
        el.css({left: x + 'px',top: y + 'px'});
      }
  }
  checkIsBumpMyself(X:number, Y:number) {
    // 判断有没有撞到自己就是判断当前蛇头的坐标是不是和当前身体的有重叠
    let flag = false
    for(let i = 1; i < this.bodies.length; i++) {
      let el = $(this.bodies[i])
      let x = el.position().left;
      let y = el.position().top;
      if (x === X && y === Y) {
        flag = true
        break;
      }
    }
    return flag;
  }
}

export default Snake;