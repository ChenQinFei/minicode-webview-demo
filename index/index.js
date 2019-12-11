function getRandomColor() {
  const rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

Page({
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  inputValue: '',
  data: {
    src: '',
    isPushScreen: false,
    danmuList:
      [{
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3
      }]
  },
  bindInputBlur: function (e) {
    this.inputValue = e.detail.value
  },
  bindSendDanmu: function () {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })
  },
  bindVideoTimeUpdate: function(e) {
    console.log(e);
    const pushScreenStartTime = 10,
          pushScreenEndTime = 30;
    if (e.detail.currentTime > pushScreenStartTime && e.detail.currentTime < pushScreenEndTime) {
      if(!this.data.isPushScreen) {
        this.pushScreenStart();

      }
    }
    if (e.detail.currentTime > pushScreenEndTime) {
      if (this.data.isPushScreen){
        this.pushScreenEnd();
      }
    }
  },
  pushScreenStart: function () {
    console.log('push screen start');
    this.setData({
      isPushScreen: true
    });
  },
  pushScreenEnd: function () {
    console.log('push screen end');
    this.setData({
      isPushScreen: false
    })
  },
  bindPushScreen: function () {
    this.pushScreenStart();
    setTimeout(this.pushScreenEnd.bind(this), 20000)
  },
  bindPlay: function () {
    this.videoContext.play()
  },
  bindPause: function () {
    this.videoContext.pause()
  },
  videoErrorCallback: function (e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  }
})