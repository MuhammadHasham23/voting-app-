import React,{Component} from "react";
import {Doughnut} from 'react-chartjs-2';
import axios from 'axios';
class Chart extends Component{
  constructor(){
    super();
    this.state={
      arr:[],
      data:{},
      datasets:[]
    }

  }
  componentWillMount(){
    axios.post('/getoptions',{pollId:this.props.id}).then((res)=>{
      this.setState({arr:res.data},()=> this.getData())
    });
  }
  getData(){
    console.log(this.state.arr);
    const labels = this.state.arr.map(option => option.name);
    const backgroundColor= [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
  ];
		const hoverBackgroundColor= [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
  ];
  const data = this.state.arr.map((option)=>{
    console.log(option.count);
    return option.count;
  });
  const obj = {labels,datasets:[{data:data,backgroundColor:backgroundColor,hoverBackgroundColor:hoverBackgroundColor}]}
  this.setState({data:obj});
  }
  render(){
    var data;
    if(this.state.data)
         data = {...this.state.data};

    if(this.state.arr.length ==0) return <h1>Loading ...</h1>
    return(
    <Doughnut height={200} data={data} />
    )
  }
}
export default Chart;
