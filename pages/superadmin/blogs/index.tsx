import SuperadminLayout from '@/components/layout/superadmin'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { UploadFile } from 'antd/lib/upload';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { createBlog } from '@/api/superadmin/blog';
import { objectToFormData, responseErrorHandler } from '@/services/helper';
import { toast } from 'react-toastify';
import CreateOrUpdateBlogForm from '@/components/superadmin/forms/blog';
import { Pagination } from 'antd';

function CreateBlog() {
  const [loading, setLoading] = useState(false);
  const formMethods = useForm();
  return (

    <SuperadminLayout title="Create Blog">
      <div className="col-lg-12">
        <div className="white_card card_height_100 mb_30">
          <div className="white_card_header">
            <div className="box_header m-0">
              <div className="main-title">
                <h3 className="m-0">Blog Listing</h3>
              </div>
            </div>
          </div>
          <div className="white_card_body">
            <div className="QA_section">
              <div className="QA_table mb_30">
                <table className="table lms_table_active3 ">
                  <thead>
                    <tr>
                      <th scope="col">title</th>
                      <th scope="col">Category</th>
                      <th scope="col">Teacher</th>
                      <th scope="col">Lesson</th>
                      <th scope="col">Enrolled</th>
                      <th scope="col">Price</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row"> <a href="#" className="question_content"> title here 1</a></th>
                      <td>Category name</td>
                      <td>Teacher James</td>
                      <td>Lessons name</td>
                      <td>16</td>
                      <td>$25.00</td>
                      <td><a href="#" className="status_btn">Active</a></td>
                    </tr>
                    <tr>
                      <th scope="row"> <a href="#" className="question_content"> title here 1</a></th>
                      <td>Category name</td>
                      <td>Teacher James</td>
                      <td>Lessons name</td>
                      <td>16</td>
                      <td>$25.00</td>
                      <td><a href="#" className="status_btn">Active</a></td>
                    </tr>
                    <tr>
                      <th scope="row"> <a href="#" className="question_content"> title here 1</a></th>
                      <td>Category name</td>
                      <td>Teacher James</td>
                      <td>Lessons name</td>
                      <td>16</td>
                      <td>$25.00</td>
                      <td><a href="#" className="status_btn">Active</a></td>
                    </tr>
                    <tr>
                      <th scope="row"> <a href="#" className="question_content"> title here 1</a></th>
                      <td>Category name</td>
                      <td>Teacher James</td>
                      <td>Lessons name</td>
                      <td>16</td>
                      <td>$25.00</td>
                      <td><a href="#" className="status_btn">Active</a></td>
                    </tr>
                    <tr>
                      <th scope="row"> <a href="#" className="question_content"> title here 1</a></th>
                      <td>Category name</td>
                      <td>Teacher James</td>
                      <td>Lessons name</td>
                      <td>16</td>
                      <td>$25.00</td>
                      <td><a href="#" className="status_btn">Active</a></td>
                    </tr>
                    <tr>
                      <th scope="row"> <a href="#" className="question_content"> title here 1</a></th>
                      <td>Category name</td>
                      <td>Teacher James</td>
                      <td>Lessons name</td>
                      <td>16</td>
                      <td>$25.00</td>
                      <td><a href="#" className="status_btn">Active</a></td>
                    </tr>
                    <tr>
                      <th scope="row"> <a href="#" className="question_content"> title here 1</a></th>
                      <td>Category name</td>
                      <td>Teacher James</td>
                      <td>Lessons name</td>
                      <td>16</td>
                      <td>$25.00</td>
                      <td><a href="#" className="status_btn">Active</a></td>
                    </tr>
                    <tr>
                      <th scope="row"> <a href="#" className="question_content"> title here 1</a></th>
                      <td>Category name</td>
                      <td>Teacher James</td>
                      <td>Lessons name</td>
                      <td>16</td>
                      <td>$25.00</td>
                      <td><a href="#" className="status_btn">Active</a></td>
                    </tr>
                    <tr>
                      <th scope="row"> <a href="#" className="question_content"> title here 1</a></th>
                      <td>Category name</td>
                      <td>Teacher James</td>
                      <td>Lessons name</td>
                      <td>16</td>
                      <td>$25.00</td>
                      <td><a href="#" className="status_btn">Active</a></td>
                    </tr>
                    <tr>
                      <th scope="row"> <a href="#" className="question_content"> title here 1</a></th>
                      <td>Category name</td>
                      <td>Teacher James</td>
                      <td>Lessons name</td>
                      <td>16</td>
                      <td>$25.00</td>
                      <td><a href="#" className="status_btn">Active</a></td>
                    </tr>
                    <tr>
                      <th scope="row"> <a href="#" className="question_content"> title here 1</a></th>
                      <td>Category name</td>
                      <td>Teacher James</td>
                      <td>Lessons name</td>
                      <td>16</td>
                      <td>$25.00</td>
                      <td><a href="#" className="status_btn">Active</a></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Pagination style={{ textAlign: 'right' }} defaultCurrent={1} total={50} />
            </div>
          </div>
        </div>
      </div>
    </SuperadminLayout>
  )
}

export default CreateBlog