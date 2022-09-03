import ClientLayout from '@/components/layout/client/ClientLayout'
import React from 'react'

function BlogDetail() {
  return (
    <ClientLayout>
      {/* search */}
      <div className="search-overlay">
        <div className="d-table">
          <div className="d-table-cell">
            <div className="search-overlay-layer" />
            <div className="search-overlay-layer" />
            <div className="search-overlay-layer" />
            <div className="search-overlay-close">
              <span className="search-overlay-close-line" />
              <span className="search-overlay-close-line" />
            </div>
            <div className="search-overlay-form">
              <form>
                <input type="text" className="input-search" placeholder="Search here..." />
                <button type="button"><i className="fas fa-search" /></button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Common Banner Area */}
      <section id="common_banner">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="common_bannner_text">
                <h2>News Details</h2>
                <ul>
                  <li><a href="index.html">Home</a></li>
                  <li><span><i className="fas fa-circle" /></span>News Details</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* News Area */}
      <section id="news_details_main_arae" className="section_padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="news_detail_wrapper">
                <div className="news_details_content_area">
                  <img src="/client/assets/img/news/news-details.png" alt="img" />
                  <h2>Veniam ex tempor qui ad amet mollit cillum aliqua aliqua fugiat tempor eu magna</h2>
                  <p>Lorem ipsum dolor sit amet, cibo mundi ea duo, vim exerci phaedrum. There are many
                    variations of passages of Lorem Ipsum available but the majority.</p>
                  <p>If you are going to use a passage of Lorem Ipsum, you need to be sure there {"isn't"}
                    anything embarrang hidden in the middle of text. All the Lorem Ipsum generators on the
                    Internet tend to repeat predefined chunks as necessary, making this the first true.</p>
                  <h3>We want to ensure the education for the kids.</h3>
                  <p>Lorem ipsum dolor sit amet, cibo mundi ea duo, vim exerci phaedrum. There are many
                    variations of passages of Lorem Ipsum available, but the majority have alteration in
                    some injected or words which {"don't"} look even slightly believable.</p>
                  <ul>
                    <li><i className="fas fa-circle" /> Lorem ipsum dolor sit amet, cibo mundi ea duo, vim
                      exerci phaedrum.</li>
                    <li><i className="fas fa-circle" /> There are many variations of passages of Lorem Ipsum.
                    </li>
                    <li><i className="fas fa-circle" /> Available but the majority have alteration in some
                      injected or words.</li>
                    <li><i className="fas fa-circle" /> There are many variations of passages of Lorem Ipsum
                      which {"don't"} look even slightly
                      believable.</li>
                  </ul>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="news_details_left_img">
                        <img src="/client/assets/img/news/news_details_left.png" alt="img" />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="news_details_left_img">
                        <img src="/client/assets/img/news/news_details_right.png" alt="img" />
                      </div>
                    </div>
                  </div>
                  <p>Lorem ipsum dolor sit amet, cibo mundi ea duo, vim exerci phaedrum. There are many
                    variations of passages of Lorem Ipsum available, but the majority have alteration in
                    some injected or words which {"don't"} look even slightly believable.</p>
                </div>
                <div className="download_pdf_area">
                  <div className="downloads_pdf_icon">
                    <img src="/client/assets/img/icon/pdf.png" alt="icon" />
                    <h3>Travel guide for explorer.pdf</h3>
                  </div>
                  <div className="downloads_pdf_button">
                    <button className="btn btn_theme btn_md">Download pdf</button>
                  </div>
                </div>
                <div className="comment_area">
                  <h3>2 Comments</h3>
                  <div className="comment_area_boxed">
                    <div className="comment_img">
                      <img src="/client/assets/img/news/comment.png" alt="img" />
                    </div>
                    <div className="comment_text">
                      <div className="comment_author_name">
                        <h4>James martin</h4>
                        <a href="#!"> <i className="fas fa-reply-all" /> Reply</a>
                      </div>
                      <p>Lorem ipsum dolor sit amet, cibo mundi ea duo, vim exerci phaedrum. There are
                        many variations of passages of Lorem Ipsum available but the majority.</p>
                    </div>
                  </div>
                  <div className="comment_area_boxed">
                    <div className="comment_img">
                      <img src="/client/assets/img/news/comment.png" alt="img" />
                    </div>
                    <div className="comment_text">
                      <div className="comment_author_name">
                        <h4>James martin</h4>
                        <a href="#!"> <i className="fas fa-reply-all" /> Reply</a>
                      </div>
                      <p>Lorem ipsum dolor sit amet, cibo mundi ea duo, vim exerci phaedrum. There are
                        many variations of passages of Lorem Ipsum available but the majority.</p>
                    </div>
                  </div>
                </div>
                <div className="comment_area_form">
                  <h3>Leave a comment</h3>
                  <form action="https://andit.co/projects/html/and-tour/!#" id="news_comment_form">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-froup">
                          <input type="text" className="form-control bg_input" placeholder="Enter full name" />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-froup">
                          <input type="text" className="form-control bg_input" placeholder="Enter email address" />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-froup">
                          <textarea rows={6} placeholder="Write your comments" className="form-control bg_input" defaultValue={""} />
                        </div>
                        <div className="comment_form_submit">
                          <button className="btn btn_theme btn_md">Post comment</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="news_details_rightbar">
                <div className="news_details_right_item">
                  <h3>Recent news</h3>
                  <div className="recent_news_item">
                    <div className="recent_news_img">
                      <img src="/client/assets/img/news/recent-1.png" alt="img" />
                    </div>
                    <div className="recent_news_text">
                      <h5><a href="news-details.html">Ea exercitation qui nostrud sint labore irure in
                        exercitation</a></h5>
                      <p><a href="news.html">26 Oct 2021</a> <i className="fas fa-circle" /> 8 min read</p>
                    </div>
                  </div>
                  <div className="recent_news_item">
                    <div className="recent_news_img">
                      <img src="/client/assets/img/news/recent-2.png" alt="img" />
                    </div>
                    <div className="recent_news_text">
                      <h5><a href="news-details.html">Amet cupidatat aliqua dolor del proident veniam
                        proident</a></h5>
                      <p><a href="news.html">26 Oct 2021</a> <i className="fas fa-circle" /> 8 min read</p>
                    </div>
                  </div>
                  <div className="recent_news_item">
                    <div className="recent_news_img">
                      <img src="/client/assets/img/news/recent-3.png" alt="img" />
                    </div>
                    <div className="recent_news_text">
                      <h5><a href="news-details.html">Consequat enim aute sint sint ad et culpa eu
                        magna</a></h5>
                      <p><a href="news.html">26 Oct 2021</a> <i className="fas fa-circle" /> 8 min read</p>
                    </div>
                  </div>
                  <div className="recent_news_item">
                    <div className="recent_news_img">
                      <img src="/client/assets/img/news/recent-4.png" alt="img" />
                    </div>
                    <div className="recent_news_text">
                      <h5><a href="news-details.html">Proident dolore dolore cillum pelo aliquip irure
                        elit</a></h5>
                      <p><a href="news.html">26 Oct 2021</a> <i className="fas fa-circle" /> 8 min read</p>
                    </div>
                  </div>
                </div>
                <div className="news_details_right_item">
                  <h3>Popular tags</h3>
                  <div className="news_tags_area">
                    <ul>
                      <li><a href="#!" className="active">Assistant</a></li>
                      <li><a href="#!">Tours</a></li>
                      <li><a href="#!">Tour guide</a></li>
                      <li><a href="#!">Business</a></li>
                      <li><a href="#!">Corporate</a></li>
                      <li><a href="#!">Manager</a></li>
                      <li><a href="#!">Travel agency</a></li>
                      <li><a href="#!">Destination</a></li>
                    </ul>
                  </div>
                </div>
                <div className="news_details_right_item">
                  <h3>Share causes</h3>
                  <div className="share_icon_area">
                    <ul>
                      <li><a href="%21.html#"><i className="fab fa-facebook-f" /></a></li>
                      <li><a href="%21.html#"><i className="fab fa-twitter" /></a></li>
                      <li><a href="%21.html#"><i className="fab fa-instagram" /></a></li>
                      <li><a href="%21.html#"><i className="fab fa-linkedin-in" /></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ClientLayout>
  )
}

export default BlogDetail