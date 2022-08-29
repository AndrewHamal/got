import Password from "@/components/common/Password";
import ClientLayout from "@/components/layout/client/ClientLayout";
import { isValidEmail, isValidPassword } from "@/services/helper";
import { Button } from "antd";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const ClientLogin = () => {
  const [loading, setLoading] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function submitLogin(data: any) {
    setLoading(true);
  }

  return (
    <ClientLayout>
      <>
        <section id="common_banner">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="common_bannner_text">
                  <h2>Login</h2>
                  <ul>
                    <li>
                      <a href="index.html">Home</a>
                    </li>
                    <li>
                      <span>
                        <i className="fas fa-circle"></i>
                      </span>{" "}
                      Login
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
                    <h3>Login your account</h3>
                    <h2>Logged in to stay in touch</h2>
                  </div>
                  <div className="common_author_form">
                    <form
                      onSubmit={handleSubmit(submitLogin)}
                      id="main_author_form"
                    >
                      <div className="form-group">
                        {/* <label style={{ float: "left" }} className="form-label">
                          Email
                        </label> */}
                        <input
                          placeholder="Enter Email"
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
                        <a href="#" style={{ float: "right" }}>
                          Forgot password?
                        </a>
                      </div>
                      <div className="common_form_submit">
                        <Button
                          loading={loading}
                          htmlType="submit"
                          className="btn btn-admin-primary"
                        >
                          Login
                        </Button>
                        {/* <button className="btn btn_theme btn_md">Log in</button> */}
                      </div>
                      <div className="have_acount_area">
                        <p>
                          Dont have an account?{" "}
                          <a href="/register">Register now</a>
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

export default ClientLogin;
