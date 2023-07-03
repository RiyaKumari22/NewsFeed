import React, { Component } from 'react'


export class NewsItem extends Component {
  render() {
   let {title,description,imgUrl,newsUrl,author,date,source}=this.props;
    return (
      <div className='my-3'>
       <div className="card" style={{width:" 18rem"}}>
        <div style={{display:'flex',fontSize:'1.3rem',justifyContent:'flex-end',position:'absolute',right:0}}>
        <span className=" badge rounded-pill bg-danger">
    {source}
   
  </span>
        </div>
       
  <img src={!imgUrl?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvATteUsoLtN4FOFFYvv_H39TJ8IaaD-XPy_J4y7Fa1eGLa0kiaOfWCjqpkDBbj3FdX5yz5GbuvEA&usqp=CAU&ec=48665699":imgUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title"> {title}... </h5>
    
    <p className="card-text text-secondary">{description}...</p>
    <p className="card-text"><small className="text-danger">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
 
    <a rel='noreferrer' href={newsUrl} target='blank' className="btn btn-sm btn-dark">Read More</a>
   
   

  </div>
</div>
      </div>
    )
  }
}

export default NewsItem
