import ClientLayout from '@/components/layout/client/ClientLayout'
import React from 'react'

function News() {
  return (
    <ClientLayout>
      {/* Banner */}
      <section id="common_banner">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="common_bannner_text">
                <h2>News</h2>
                <ul>
                  <li><a href="index.html">Home</a></li>
                  <li><span><i className="fas fa-circle" /></span>News</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* News Area */}
      <section id="news_main_arae" className="section_padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="section_heading_center">
                <h2>Latest travel news</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-7">
              <div className="news_area_top_left">
                <a href="news-details.html"><img src="/client/assets/img/news/news-big.png" alt="img" /></a>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="news_area_top_right">
                <h2>
                  <a href="news-details.html">Veniam ex tempor qui ad amet mollit cillum aliqua aliqua. Fugiat
                    tempor eu magna</a>
                </h2>
                <p>It is a long established fact that a reader will be distracted by the readable content of a
                  page when looking at its layout. The point of using Lorem Ipsum is that it has a more. Ad
                  minim in commodo fugiat adipisicing cupidatat tempor aliqua.
                </p>
                <a href="news-details.html">Read full article <i className="fas fa-arrow-right" /></a>
                <div className="news_author_area">
                  <div className="news_author_img">
                    <img src="/client/assets/img/news/author-1.png" alt="img" />
                  </div>
                  <div className="news_author_area_name">
                    <h4>Melisa campbell</h4>
                    <p><a href="news.html">26 Oct 2021</a> <i className="fas fa-circle" /> 8 min read</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="new_main_news_box">
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                <div className="news_item_boxed">
                  <div className="news_item_img">
                    <a href="news-details.html"><img src="/client/assets/img/news/news-1.png" alt="img" /></a>
                  </div>
                  <div className="news_item_content">
                    <h3><a href="news-details.html">Revolutionising the travel industry,
                      one partnership at a time
                    </a></h3>
                    <p>Irure enim eiusmod ipsum do Lorem sit consectetur enim consectetur. Nostrud ipsum
                      eiusmod eiusmod culpa anim excepteur.</p>
                  </div>
                  <div className="news_author_area">
                    <div className="news_author_img">
                      <img src="/client/assets/img/news/author-1.png" alt="img" />
                    </div>
                    <div className="news_author_area_name">
                      <h4>Jennifer lawrence</h4>
                      <p><a href="news.html">26 Oct 2021</a> <i className="fas fa-circle" /> 8 min read</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                <div className="news_item_boxed">
                  <div className="news_item_img">
                    <a href="news-details.html"><img src="/client/assets/img/news/news-2.png" alt="img" /></a>
                  </div>
                  <div className="news_item_content">
                    <h3><a href="news-details.html">
                      Nostrud occaecat reprehenderit elit pariatur do occaecat.
                    </a></h3>
                    <p>Irure enim eiusmod ipsum do Lorem sit consectetur enim consectetur. Nostrud ipsum
                      eiusmod eiusmod culpa anim excepteur.</p>
                  </div>
                  <div className="news_author_area">
                    <div className="news_author_img">
                      <img src="/client/assets/img/news/author-2.png" alt="img" />
                    </div>
                    <div className="news_author_area_name">
                      <h4>Connley jimmy</h4>
                      <p><a href="news.html">26 Oct 2021</a> <i className="fas fa-circle" /> 8 min read</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                <div className="news_item_boxed">
                  <div className="news_item_img">
                    <a href="news-details.html"><img src="/client/assets/img/news/news-3.png" alt="img" /></a>
                  </div>
                  <div className="news_item_content">
                    <h3><a href="news-details.html">
                      Ea non officia minim cupidatat culpa et reprehenderit esse ea
                    </a></h3>
                    <p>Irure enim eiusmod ipsum do Lorem sit consectetur enim consectetur. Nostrud ipsum
                      eiusmod eiusmod culpa anim excepteur.</p>
                  </div>
                  <div className="news_author_area">
                    <div className="news_author_img">
                      <img src="/client/assets/img/news/author-3.png" alt="img" />
                    </div>
                    <div className="news_author_area_name">
                      <h4>Astom martin</h4>
                      <p><a href="news.html">26 Oct 2021</a> <i className="fas fa-circle" /> 8 min read</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                <div className="news_item_boxed">
                  <div className="news_item_img">
                    <a href="news-details.html"><img src="/client/assets/img/news/news-1.png" alt="img" /></a>
                  </div>
                  <div className="news_item_content">
                    <h3><a href="news-details.html">
                      Anim labore dolor mollit esse do labore adipisicing fugiat
                    </a></h3>
                    <p>Irure enim eiusmod ipsum do Lorem sit consectetur enim consectetur. Nostrud ipsum
                      eiusmod eiusmod culpa anim excepteur.</p>
                  </div>
                  <div className="news_author_area">
                    <div className="news_author_img">
                      <img src="/client/assets/img/news/author-1.png" alt="img" />
                    </div>
                    <div className="news_author_area_name">
                      <h4>Simon donald</h4>
                      <p><a href="news.html">26 Oct 2021</a> <i className="fas fa-circle" /> 8 min read</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                <div className="news_item_boxed">
                  <div className="news_item_img">
                    <a href="news-details.html"><img src="/client/assets/img/news/news-5.png" alt="img" /></a>
                  </div>
                  <div className="news_item_content">
                    <h3><a href="news-details.html">
                      Ex ad cupidatat aliquip nostrud duis deserunt culpa esse
                    </a></h3>
                    <p>Irure enim eiusmod ipsum do Lorem sit consectetur enim consectetur. Nostrud ipsum
                      eiusmod eiusmod culpa anim excepteur.</p>
                  </div>
                  <div className="news_author_area">
                    <div className="news_author_img">
                      <img src="/client/assets/img/news/author-5.png" alt="img" />
                    </div>
                    <div className="news_author_area_name">
                      <h4>Jesica aliston</h4>
                      <p><a href="news.html">26 Oct 2021</a> <i className="fas fa-circle" /> 8 min read</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                <div className="news_item_boxed">
                  <div className="news_item_img">
                    <a href="news-details.html"><img src="/client/assets/img/news/news-6.png" alt="img" /></a>
                  </div>
                  <div className="news_item_content">
                    <h3><a href="news-details.html">
                      Occaecat nulla anim cillum anim id irure nostrud elit excepteur nisi
                    </a></h3>
                    <p>Irure enim eiusmod ipsum do Lorem sit consectetur enim consectetur. Nostrud ipsum
                      eiusmod eiusmod culpa anim excepteur.</p>
                  </div>
                  <div className="news_author_area">
                    <div className="news_author_img">
                      <img src="/client/assets/img/news/author-6.png" alt="img" />
                    </div>
                    <div className="news_author_area_name">
                      <h4>Patricia ramise</h4>
                      <p><a href="news.html">26 Oct 2021</a> <i className="fas fa-circle" /> 8 min read</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="pagination_area">
                  <ul className="pagination">
                    <li className="page-item">
                      <a className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">«</span>
                        <span className="sr-only">Previous</span>
                      </a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item">
                      <a className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">»</span>
                        <span className="sr-only">Next</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Cta Area */}
      <section id="cta_area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="cta_left">
                <div className="cta_icon">
                  <img src="/client/assets/img/common/email.png" alt="icon" />
                </div>
                <div className="cta_content">
                  <h4>Get the latest news and offers</h4>
                  <h2>Subscribe to our newsletter</h2>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="cat_form">
                <form id="cta_form_wrappper">
                  <div className="input-group"><input type="text" className="form-control" placeholder="Enter your mail address" /><button className="btn btn_theme btn_md" type="button">Subscribe</button></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ClientLayout>
  )
}

export default News