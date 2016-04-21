window.onload=function(){
/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  },
  "广州": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/
/*
* 兼容各种浏览器的事件绑定
* param tp 类型如click
* param fn 处理函数
* param obj 传进来的对象
 */
function addEvent(obj,tp,fn){
  //判断浏览器
  if(obj.addEventListener){
    obj.addEventListener(tp,fn,false);
  }else if(obj.attachEvent){
    obj.attachEvent('on'+tp,fn);
  }else{
    obj['on'+tp] = fn;
  }
}
var cityList   = document.getElementById('city-select'),
    formTime   = document.getElementById('form-gra-time'),
    dataChart  = document.getElementById('aqi-chart-wrap');
// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
var colors = ['#16324a', '#24385e', '#393f65', '#4e4a67', '#5a4563', '#b38e95',
              '#edae9e', '#c1b9c2', '#bec3cb', '#9ea7bb', '#99b4ce', '#d7f0f8'];
function renderChart(data) {
    dataChart.innerHTML = '';
    var len = 0;
    for( attribute in data){
        len++;
    }
    var i = 0;
    for(attr in data){
        console.log(attr);
        var addDiv = document.createElement('div');
        addDiv.style.width           = (Math.ceil(1200/len))+"px";
        addDiv.style.height          = data[attr]+'px';
        addDiv.style.backgroundColor = colors[(i++)%12];
        addDiv.style.display         = 'inline-block';
        addDiv.style.margin          = "0 auto";
        addDiv.title                 = '今天是'+attr;
        dataChart.appendChild(addDiv);
    }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(e) {
  // 确定是否选项发生了变化
  if(e.target && e.target.nodeName.toUpperCase() == 'INPUT'){
    if(e.target.value != prevRadio){
        prevRadio    = e.target.value;
        var city     =  cityList.selectedIndex; 
        var optionNode    = cityList.getElementsByTagName('option')[city].innerHTML;
        var initData = initAqiChartData(optionNode,prevRadio);   //获得数据
        renderChart(initData);                                  // 渲染表格
    }
  }

}


/**
 * select发生变化时的处理函数
 */
var count = 0;
function citySelectChange() {
  // 确定是否选项发生了变化 
  // 先把以前的option保存下来
  if(count == 0){
    count++;
    var preOptionValue  = cityList.selectedIndex;
  }else if(count == 1){
    var nextOptionValue = cityList.selectedIndex;
    var optionSelectNode = cityList.getElementsByTagName('option');
    optionText = optionSelectNode[nextOptionValue].innerHTML;
    count = 0;
    if(preOptionValue != nextOptionValue){  
        var initData = initAqiChartData(optionText,prevRadio);// 设置对应数据
    }
  }
  renderChart(initData);
  // 调用图表渲染函数
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
var prevRadio = 'day';
function initGraTimeForm() {
    addEvent(formTime,'click',graTimeChange);
}

  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
var is = 0;
for(attribute in aqiSourceData){
    var optionNode    = document.createElement('option');
    optionNode.textContent = attribute;
    optionNode.value = is++;
    cityList.appendChild(optionNode);
}
/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {

  addEvent(cityList,'click',citySelectChange);
  // 给select设置事件，当选项发生变化时调用函数citySelectChange

}
/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData(city,date) {

  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  chartData     = {};
  var varAttr   = 0,   //chartData 中元素的下标
      sum       = 0,  // 每一周空气质量的总数
      countSum  = 0;
  for(attribute in aqiSourceData){
    if(attribute == city && date == 'day'){
        for(attr in aqiSourceData[attribute]){
            chartData[attr]  = aqiSourceData[attribute][attr];
        }
        return (chartData);
    }else if(attribute == city && date == 'week'){
        var flags = 1;  //定义变量flags，因为2016-1-1不是周一，那一周只剩下三天了当等于1的时候代表为第一周
        var dataLen = Object.keys(aqiSourceData[attribute]).length,
            dataArr = Object.keys(aqiSourceData[attribute]);
        for(var i=0;i<dataLen;i++){
            sum = 0;
            if(flags == 1){
                for(j=i;j<(i+3);j++){
                    sum+=aqiSourceData[attribute][dataArr[j]];
                }
                i = j;
                chartData[varAttr] = Math.round(sum/3);
                flags = 2;
            }else if((endLen = (dataLen - countSum))<7){
                for(var k=i;k<(endLen + i);k++){
                    sum+=aqiSourceData[attribute][dataArr[j]];
                }
                chartData[varAttr] = Math.round(sum/endLen);
                break;
            }else if(flags == 2){
                for(j =i ;j<(i+7);j++){
                   sum+=aqiSourceData[attribute][dataArr[j]]; 
                }
                i = j;
                chartData[varAttr] = Math.round(sum/7);

            }
            varAttr++;     //chartData 中元素的下标
            countSum++;   //通过这个变量记录和总数的差别，如果小于7，就是最后几天不能构成一周
        }
        return (chartData);
    }else if(attribute == city && date == 'month'){
        var dataLen   = Object.keys(aqiSourceData[attribute]).length,
            dataArr   = Object.keys(aqiSourceData[attribute]);
        var prevMonth = dataArr[0].substr(5,2);
        var countMonth= 0;
        for(var i=0;i<dataLen;i++){
             if(dataArr[i].substr(5,2) == prevMonth && i<dataLen-1){
                countMonth++;
                sum+=aqiSourceData[attribute][dataArr[i]]; 
             }else{
                chartData[varAttr++] = Math.round(sum/countMonth);
                countMonth=0;
                prevMonth = dataArr[i].substr(5,2);
             }
        } 
        return(chartData);       
    }
  }

}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();


}