import { contact } from '@/api/client/contact';
import ClientLayout from '@/components/layout/client/ClientLayout'
import { LoadingOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import React, { useRef, useState } from 'react'

function Contact() {

  const [loading, setLoading] = useState(false);
  let refForm: any = useRef();

  function submit(e: any)
  {
    e.preventDefault();
    setLoading(true);
    let formData = new FormData(e.target);
    contact(formData)
    .then(res => {
      notification.success({message: 'Message Sent Successfully!!!'});
      refForm.current.reset();
      setLoading(false);
    }).catch(err => {
      setLoading(false);
    })
  }

  return (
    <ClientLayout>
      <div className="contact_main_form_area pt-5">
        <div className="row mt-5">
          <div className="col-lg-8 offset-lg-2 mt-5">
            <div className="section_heading_center mt-5">
              <h2>Leave us a message</h2>
            </div>
            <div className="contact_form">
              <form onSubmit={submit} ref={refForm} id="contact_form_content">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input type="text" name='first_name' required className="form-control bg_input" placeholder="First name*" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input type="text" name='last_name' required className="form-control bg_input" placeholder="Last name*" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input type="text" name='email'  className="form-control bg_input" placeholder="Email address (Optional)" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input type="text" name='phone' className="form-control bg_input" placeholder="Phone number with country code*" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <textarea className="form-control bg_input" name='message' rows={5} placeholder="Message" defaultValue={""} />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <button type="submit" className="btn btn_theme btn_md" disabled={loading ? true : false}> { loading ? <LoadingOutlined/> : 'Send message'  } </button>
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