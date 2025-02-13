import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";




export class News extends Component {

  static defaultProps = {
    country: "us",
    pageSize: 6,
    category: "general",
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,

  }
  capitalizeWords = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeWords(this.props.category)}-NewsMonkey`;
  }
  async updateNews() {
    console.log("cdm");
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e8efe0c9609140d0872fa455bd7178f4&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    console.log(parsedData);
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);

  }



  async componentDidMount() {
    this.updateNews();

  }




  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e8efe0c9609140d0872fa455bd7178f4&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };

  render() {
    console.log("render");
    return (
      <>

        <h1 className="text-center" style={{ margin: "35px 0px" }}>NewsMonkey - Top {this.capitalizeWords(this.props.category)} Hedlines  </h1>
        {this.state.loading && <Spinner />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element, index) => (
                //Yaha tak kiya hai baki dekha
                <div className="col-md-4" key={element.url || index}>
                  <NewsItems
                    title={element.title?.slice(0, 45) || "No Title"}
                    description={
                      element.description?.slice(0, 88) || "No Description"
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>

              ))}
            </div>

          </div>
        </InfiniteScroll>



      </>
    );
  }
}

export default News;
