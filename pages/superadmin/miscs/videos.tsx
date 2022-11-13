import { createOrUpdateVideoTrailer, createVideoListing } from '@/api/superadmin/miscs';
import SuperadminLayout from '@/components/layout/superadmin'
import VideoList from '@/components/superadmin/miscs/videoListing';
import VideoTrailerList from '@/components/superadmin/miscs/videoTrailertable';
import { responseErrorHandler, useMatchMutate } from '@/services/helper';
import { Button, notification } from 'antd';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import useSWR from 'swr';

function CreateTeams() {
  const matchMutate = useMatchMutate();
  const [trailerloading, setTrailerLoading] = useState(false);
  const [trailerId, setTrailerId] = useState('');
  const [videoloading, setVideoLoading] = useState(false);
  const { mutate } = useSWR('/admin/video-trailer', { revalidateOnMount: false });

  const { reset, register, formState: { errors }, handleSubmit, setError } = useForm();

  function createVideoTrailerHandler(e: any) {
    e?.preventDefault();
    if (!trailerId) return notification["error"]({ message: "Youtube Trailer Id is required!" });
    setTrailerLoading(true);
    createOrUpdateVideoTrailer({
      youtube_link: trailerId
    })
      .then((res: any) => {
        toast.success(res.message);
        reset();
        mutate();
      })
      .catch((err: any) => responseErrorHandler(err, setError))
      .finally(() => setTrailerLoading(false))
  }

  function createVideoListingHandler(data: any) {
    setVideoLoading(true);
    createVideoListing(data)
      .then((res: any) => {
        toast.success(res.message);
        reset();
        matchMutate('/admin/video');
      })
      .catch((err: any) => responseErrorHandler(err, setError))
      .finally(() => setVideoLoading(false))
  }

  return (
    <SuperadminLayout title="Create Team Member">
      <div className="col-lg-12">
        {/* trailer video */}
        <div className="white_card mb_30">
          <div className="white_card_header">
            <div className="box_header m-0">
              <div className="main-title">
                <h3 className="m-0">Trailer Video Form</h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="white_card_body">
                <form onSubmit={createVideoTrailerHandler}>
                  <div className="form-group mb-3">
                    <div className="row">
                      <div className="col-md-12">
                        <label className="form-label">Youtube Video Id<span className='text-danger'> *</span></label>
                        <input
                          value={trailerId}
                          onChange={e => setTrailerId(e.target.value)}
                          className="form-control"
                          placeholder="Enter Video Id"
                        />
                      </div>
                    </div>
                  </div>
                  <Button loading={trailerloading} htmlType="submit" className="btn btn-admin-primary">Submit</Button>
                </form>
              </div>
            </div>
            <div className="col-md-6">
              <div className="white_card_body">
                <VideoTrailerList />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-12">
        {/* video listing */}
        <div className="white_card mb_30">
          <div className="white_card_header">
            <div className="box_header m-0">
              <div className="main-title">
                <h3 className="m-0">Video Listing Form</h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="white_card_body">
                <form onSubmit={handleSubmit(createVideoListingHandler)}>
                  <div className="form-group mb-3">
                    <div className="row">
                      <div className="col-md-6">
                        <label className="form-label">Video Title<span className='text-danger'> *</span></label>
                        <input
                          {...register("title", { required: "Video Id is required!" })}
                          aria-invalid={!!errors?.title?.message}
                          className="form-control"
                          placeholder="Enter Video Title"
                        />
                        {errors?.title?.message &&
                          <div className="text-danger">
                            {errors?.title?.message + ""}
                          </div>
                        }
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Youtube Video Id<span className='text-danger'> *</span></label>
                        <input
                          {...register("youtube_link", { required: "Video Id is required!" })}
                          aria-invalid={!!errors?.youtube_link?.message}
                          className="form-control"
                          placeholder="Enter Video Id"
                        />
                        {errors?.youtube_link?.message &&
                          <div className="text-danger">
                            {errors?.youtube_link?.message + ""}
                          </div>
                        }
                      </div>

                      <div className="col-md-6 mt-3">
                        <label className="form-label">Select Video Type<span className='text-danger'> *</span></label>
                        <select
                          {...register("for", { required: "Type is required!" })}
                          aria-invalid={!!errors?.for?.message}
                          className="form-control"
                          placeholder="Enter Video Id"
                        >
                          <option value="1">Video</option>
                          <option value="2">Testimonial</option>
                        </select>
                        {errors?.for?.message &&
                          <div className="text-danger">
                            {errors?.for?.message + ""}
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                  <Button loading={videoloading} htmlType="submit" className="btn btn-admin-primary">Submit</Button>
                </form>
              </div>
            </div>
            <div className="white_card_body">
              <VideoList />
            </div>
          </div>
        </div>
      </div>
    </SuperadminLayout>
  )

}

export default CreateTeams