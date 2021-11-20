class ScorePanel {
  score = 0;
  level = 1;
  scoreEl = $('.score');
  levelEl = $('.level');
  maxLevel: number;
  upScore:number; // 需要多少分才可以升级
  constructor(maxLevel:number = 10,upScore:number = 10) {
    this.maxLevel = maxLevel;
    this.upScore = upScore
  }
  // 加分的方法
  addScore() {
    this.scoreEl.text(++this.score + '');
    // 什么时候需要升等级
    if(this.score % this.upScore === 0) {
      this.addLevel()
    }
  }
  //升等级的方法
  addLevel() {
    if(this.level < this.maxLevel) {
      this.levelEl.text(++this.level + '')
    }
  }
}

export default ScorePanel;