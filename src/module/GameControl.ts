import Food from './Food'
import ScorePanel from './ScorePanel'
import Snake from './snake'

const step = 10
class GameControl {
  snake: Snake;
  scorePanel: ScorePanel;
  food: Food;
  preDirection: string = '';
  direction: string = ''; // 保存按键的方向
  isLive = true; // 是否撞墙死了
  constructor() {
    this.snake = new Snake()
    this.scorePanel = new ScorePanel(step, step)
    this.food = new Food()
  }

  // 游戏初始化方法
  init() {
    //this.keyDownHandle.bind(this)如果不手动改变this的指向的话keyDownHandle方法中this指向document
    document.addEventListener('keydown', this.keyDownHandle.bind(this))
    this.run() // 初始化调用
  }
  keyDownHandle(e:KeyboardEvent) {
    // 保存按的按键
    this.direction = e.key
  }
  // 需要按键改变方向和自动动
  run() {
    // 获取蛇现在的坐标
    let x = this.snake.X
    let y = this.snake.Y
    let result = {x,y}
    switch(this.direction) {
      // 按键向下 positon Top值增大
      case 'ArrowDown':
      // 按键向上 positon Top值减小
      case 'ArrowUp':
      // 按键向左 positon left值减小
      case 'ArrowLeft':
      // 按键向右positon left值增大
      case 'ArrowRight': 
      result = this.switcDirection(x,y,this.direction)
      default:
        result = this.switcDirection(x,y,this.preDirection)
        break;
    }
    this.checkEat(result.x, result.y)
    try {
      // 捕获设置的时候的异常
      this.snake.X = result.x
      this.snake.Y = result.y
    } catch (e:any) {
      alert(e.message)
      // 设置游戏结束
      this.isLive = false
    }
    // 300 - (this.scorePanel.level-1)*10按照等级增加运行时间越来越快
    // this.run.bind(this)改变定时器内的this指向
    // 当第一次调用run的函数之后会触发这个定时器 之后每触发一次定时器就都会再次触发run的函数
    this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level-1)*10)
  }
  // 定义是否吃到了食物
  checkEat(x: number, y:number) {
    // 当蛇的x值y值和食物的相同表示吃到了食物
    // 吃到了食物需要分加一分 蛇的身体增加一节
    if (x === this.food.X && y === this.food.Y) {
      this.food.changePosition()
      this.snake.addBody()
      this.scorePanel.addScore()
    }
  }
  switcDirection(x:number, y:number, key: string) {
    switch(key) {
      // 按键向下 positon Top值增大
      case 'ArrowDown':
        this.preDirection = 'ArrowDown'
        y += step 
        break;
      // 按键向上 positon Top值减小
      case 'ArrowUp':
        this.preDirection = 'ArrowUp'
        y -= step
        break;
      // 按键向左 positon left值减小
      case 'ArrowLeft':
        this.preDirection = 'ArrowLeft'
        x -= step
        break;
      // 按键向右positon left值增大
      case 'ArrowRight': 
      this.preDirection = 'ArrowRight'
        x += step
        break;
    }
    return {
      x,y
    }
  }
}
export default GameControl;