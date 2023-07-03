import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'

  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
   capitalizeFirstLetter=(string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
   }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0
    }
    document.title=`NewsFeed | ${this.capitalizeFirstLetter(this.props.category)}`;
  }
  
  async UpdateNews(){
    this.props.setProgress(10)
   const  url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b6466ee2bb534fdb828090d0867393c5&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({loading:true})
 let data = await fetch(url);
 this.props.setProgress(30)
 let parsedData = await data.json()
 this.props.setProgress(50)
  this.setState({

      articles: parsedData.articles,
       totalresults: parsedData.totalResults,
      loading: false,


    })
    this.props.setProgress(100)

  }
  async componentDidMount() {
    this.UpdateNews()
  }
  
// handlePrevClick= async()=>{
//    this.setState({
// page: this.state.page-1,})
//  this.UpdateNews()

// }
// handleNextClick= async()=>{
//  this.setState({

// page: this.state.page+1,})
// this.UpdateNews()
// }
fetchMoreData = async () => {
 
  this.setState({
    page:this.state.page+1,
   
  })
  const  url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b6466ee2bb534fdb828090d0867393c5&page=${this.state.page}&pageSize=${this.props.pageSize}`
   
 let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData)
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
       totalresults: parsedData.totalResults,
      loading: false,


    })
};
  render() {
    return (
      <>
     <h2 className='text-center ' style={{marginTop:'95px'}}>NewsFeed - Top Headlines </h2>
  {this.state.loading && <Spinner />}
  <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row">
          {this.state.articles.map((element) => {
            {
              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} url={element.url} description={element.description ? element.description.slice(0, 88) : ""} newsUrl={element.url} imgUrl={element.urlToImage} author={element.author} date={element.publishedAt} source={element.source.name} />

              </div>
            }
          })}
        </div>
        </div>
        </InfiniteScroll>
{/* For prev and Next Button */}
 {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalresults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}

      </>
    )
  }
}

export default News
