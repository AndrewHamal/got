import Password from "@/components/common/Password";
import ClientLayout from "@/components/layout/client/ClientLayout";
import { isValidEmail, isValidPassword } from "@/services/helper";
import { Button } from "antd";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      mobile: "",
      password: "",
    },
  });

  const submitRegister = (data: any) => {
    console.log(data);
  };

  return (
    <ClientLayout>
      <>
        <section id="common_banner">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="common_bannner_text">
                  <h2>Register</h2>
                  <ul>
                    <li>
                      <a href="index.html">Home</a>
                    </li>
                    <li>
                      <span>
                        <i className="fas fa-circle"></i>
                      </span>{" "}
                      Register
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="common_author_area" className="section_padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <div className="common_author_boxed">
                  <div className="common_author_heading">
                    <h3>Register account</h3>
                    <h2>Register your account</h2>
                  </div>
                  <div className="common_author_form">
                    <form
                      onSubmit={handleSubmit(submitRegister)}
                      id="main_author_form"
                    >
                      <div className="form-group">
                        <input
                          placeholder="Full Name *"
                          className="mb-0 form-control"
                          aria-invalid={!!errors?.email?.message}
                          {...register("fullName", {
                            required: "Full Name is Required",
                          })}
                        />
                        {errors?.fullName?.message && (
                          <div className="text-danger">
                            {errors?.fullName?.message + ""}
                          </div>
                        )}
                      </div>

                      <div className="form-group">
                        <input
                          placeholder="Enter Email *"
                          className="mb-0 form-control"
                          aria-invalid={!!errors?.email?.message}
                          {...register("email", {
                            required: "Email is Required",
                            validate: (email) =>
                              isValidEmail(email) || "Email format is invalid!",
                          })}
                        />
                        {errors?.email?.message && (
                          <div className="text-danger">
                            {errors?.email?.message + ""}
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <input
                          type="number"
                          placeholder="Mobile Number *"
                          className="mb-0 form-control"
                          aria-invalid={!!errors?.email?.message}
                          {...register("mobile", {
                            required: "Mobile is Required",
                            // validate: (number) =>
                            //   isValidMobile(number) ||
                            //   "Mobile format is invalid",
                          })}
                        />
                        {errors?.mobile?.message && (
                          <div className="text-danger">
                            {errors?.mobile?.message + ""}
                          </div>
                        )}
                      </div>

                      <div className="form-group">
                        <Controller
                          control={control}
                          name="password"
                          rules={{
                            required: "Password is required!",
                            validate: (pw) =>
                              isValidPassword(pw) ||
                              "Password must contain - 6 characters, a symbol, an uppercase and a lowercase",
                          }}
                          render={({ field: { onChange, value } }) => (
                            <>
                              <Password
                                value={value}
                                onChange={onChange}
                                aria-invalid={!!errors?.password?.message}
                                placeholder="Enter Password"
                              />
                              {errors?.password?.message && (
                                <div className="text-danger">
                                  {errors?.password?.message + ""}
                                </div>
                              )}
                            </>
                          )}
                        />
                      </div>
                      <div className="common_form_submit">
                        <Button
                          loading={loading}
                          htmlType="submit"
                          className="btn btn-admin-primary btn_theme btn_md"
                        >
                          Register
                        </Button>
                      </div>
                      <div className="have_acount_area other_author_option">
                        <div className="line_or">
                          <span>or</span>
                        </div>
                        <ul>
                          <li>
                            <a href="#!">
                              <img
                                src="/client/assets/img/icon/google.png"
                                alt="icon"
                              />
                            </a>
                          </li>
                        </ul>
                        <p>
                          Already have an account?
                          <a href="/login">Log in now</a>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </ClientLayout>
  );
};

export default Register;
