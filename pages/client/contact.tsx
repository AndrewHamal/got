import ClientLayout from '@/components/layout/client/ClientLayout'
import React from 'react'

function Contact() {
  return (
    <ClientLayout>
      {/* Common Banner Area */}
      <section id="common_banner">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="common_bannner_text">
                <h2>Contact</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="contact_main_form_area">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="section_heading_center">
              <h2>Leave us a message</h2>
            </div>
            <div className="contact_form">
              <form action="https://andit.co/projects/html/and-tour/!#" id="contact_form_content">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input type="text" className="form-control bg_input" placeholder="First name*" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input type="text" className="form-control bg_input" placeholder="Last name*" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input type="text" className="form-control bg_input" placeholder="Email address (Optional)" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input type="text" className="form-control bg_input" placeholder="Mobile number*" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <textarea className="form-control bg_input" rows={5} placeholder="Message" defaultValue={""} />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <button type="button" className="btn btn_theme btn_md">Send message</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  )
}

export default Contact