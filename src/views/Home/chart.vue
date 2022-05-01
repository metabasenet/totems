<template>

          <div id="chart" ref ="chart" style="width:400px;height:200px;"></div>

</template>
<script>
 

export default{
    data(){
        return{


        }
    },
   


methods:{
async getChartData(days) {
      let params = {
            days:days,
      };
      let that = this
      //虚拟数据，以后修改
      let res={ "xAxis": ["15","14","13","12","11","10","9", "8", "7", "6", "5", "4", "3","2","1"], "legend": ["MNt Price"], "series": [{ "name": "MNt Price", "data": [10, 11, 13, 16, 20, 25, 31,38,46,55,65,76,88,101,115] }] }
      await new Promise((resolve)=>{
        that.legend=res.legend;
        that.xAxis=res.xAxis;        
        let series= [];
        for(let serieIndex =0; serieIndex<res.series.length; serieIndex++){               
            let serie=
              {
              name: res.series[serieIndex].name,
              type: "line",
              data: res.series[serieIndex].data
            }
            series.push(serie)
        }
        that.series =series;
        console.log("series",that.series);
        that.drawChart();
     });
    

    
    },
    drawChart()
    { 
      Object.defineProperty(document.getElementById('chart'),'clientWidth',{get:function(){return 400;}})
	    Object.defineProperty(document.getElementById('chart'),'clientHeight',{get:function(){return 200;}})
      let myChart = this.$echarts.init(document.getElementById("chart"));
      console.log("1")    ;    
      let option = {
          /*grid: {
              left: '10%',
              right: '5%',
              bottom: '5%',
              top: '5%'
            },*/
          title: {
          text: ""
          },
          tooltip: {},
          legend: {    
          data:this.legend
          },
          xAxis: {        
          data: this.xAxis        
          },
          yAxis: {},
          series:this.series
      };        
      myChart.setOption(option);
      console.log("option1",option);
    }


},
mounted(){
    this.getChartData(15);
}


}
</script>
