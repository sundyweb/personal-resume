var dom = document.getElementsByClassName("skillbar")[0];
var myChart = echarts.init(dom);
var app = {};
option = null;
option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    xAxis: {
        type: 'value',
        position: 'top',
    },
    yAxis: {
        type: 'category',
        axisLabel: { show: false },
        data: ['Es6', 'Less', 'scss', 'git', 'gulp', 'Webpack', 'VUE', 'Bootstrap', 'Jquery', 'Javascript', 'CSS', 'HTML']
    },
    series: [
        {
            name: '掌握程度',
            center: ['50%', '50%'],
            type: 'bar',
            label: {
                normal: {
                    show: true,
                    formatter: '{b}',
                }
            },
            data: [
                78, 78, 78,75, 75, 75, 75, 75, 75, 80, 85, 80
            ]
        }
    ]
};
;
if (option && typeof option === "object") {
    myChart.setOption(option, true);
}