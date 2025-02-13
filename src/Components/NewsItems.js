import React, { Component } from "react";

export class NewsItems extends Component {
  render() {
    // Correct destructuring of props as an object
    const { title, description, imageUrl, newsUrl, author, date, source } = this.props;

    return (
      <>
        <div className="container">
          <div className="card">
            <img
              src={
                !imageUrl
                  ? "https://fortune.com/img-assets/wp-content/uploads/2024/11/GettyImages-1454634769-e1732397186388.jpg?resize=1200,600"
                  : imageUrl
              }
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">{title}...
                <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' ,top:'0'}}>
                  <span className=" badge rounded-pill bg-danger" >
                    {source}
                  </span>
                </div>
                "    <span className="visually-hidden">unread messages</span>
              </h5>
              <p className="card-text">{description}...</p>
              <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toGMTString()} </small></p>

              <a
                href={newsUrl}
                target="-blank"
                className="btn  btn-sm btn-primary"
              >
                Read More
              </a>
            </div>

          </div>

        </div>


      </>
    );

  }
}

export default NewsItems;
