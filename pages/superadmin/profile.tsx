import { updateProfile } from '@/api/superadmin/auth';
import { createItinerary } from '@/api/superadmin/itinerary';
import SuperadminLayout from '@/components/layout/superadmin'
import CreateOrUpdateBlogForm from '@/components/superadmin/forms/blog'
import CreateOrUpdateItenaryForm from '@/components/superadmin/forms/itinerary'
import CreateOrUpdateProfileForm from '@/components/superadmin/forms/profile';
import { objectToFormData, responseErrorHandler } from '@/services/helper';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useSWR from 'swr';

function Profile() {

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const formMethods = useForm();

  const { data: profile } = useSWR('/admin/profile');

  function updateProfileHandler(data: any) {
    setLoading(true);
    updateProfile(data)
      .then((destRes: any) => {
        toast.success(destRes.message);
      })
      .catch((err: any) => { responseErrorHandler(err, formMethods.setError) })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (profile) {
      formMethods.reset({
        facebook_link: profile[0].facebook_link,
        instagram_link: profile[0].instagram_link,
        linkedin_link: profile[0].linkedin_link,
        phone: profile[0].phone,
        contact_email: profile[0].contact_email
      })
    }
  }, [profile, formMethods])

  return (
    <SuperadminLayout title="Profile">
      <div className="col-lg-8">
        <div className="white_card card_height_100 mb_30">
          <div className="white_card_header">
            <div className="box_header m-0">
              <div className="main-title">
                <h3 className="m-0">Profile Form</h3>
              </div>
            </div>
          </div>
          <div className="white_card_body">
            <CreateOrUpdateProfileForm
              profile={profile}
              loading={loading}
              formMethods={formMethods}
              submitHandler={updateProfileHandler}
            />
          </div>
        </div>
      </div>
    </SuperadminLayout>
  )
}

export default Profile