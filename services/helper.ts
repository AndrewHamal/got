import { toast } from "react-toastify";
import Crypto from "crypto-js";

export function responseErrorHandler(res: any, setError?: any) {
  if (res && res?.data && res?.data?.errors) {
    // set error in field
    if (setError) {
      Object.keys(res.data.errors).map((key) =>
        setError(key, { message: res.data.errors[key][0] })
      );
    }

    // fire alert
    const firstErrorKey = Object.keys(res.data.errors)[0];
    throw toast.error(res.data.errors[firstErrorKey][0]);
  }

  if (res && res?.data && res?.data?.message) {
    throw toast.error(res.data.message);
  }

  if (res && res?.message) {
    throw toast.error(res.message);
  }

  throw toast.error("Something went wrong. Please try again later!");
}

export function appEncrypt(data: string) {
  return Crypto.enc.Base64.stringify(Crypto.enc.Utf8.parse(data));
}

export function appDecrypt(data: string) {
  return Crypto.enc.Base64.parse(data)?.toString(Crypto.enc.Utf8);
}

export function objectToFormData(
  obj: any,
  rootName?: any,
  ignoreList?: any
): FormData {
  const formData = new FormData();

  function appendFormData(data: any, root: any) {
    if (!ignore(root)) {
      root = root || "";
      if (data instanceof File) {
        formData.append(root, data);
      } else if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
          appendFormData(data[i], root + "[" + i + "]");
        }
      } else if (typeof data === "object" && data) {
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            if (root === "") {
              appendFormData(data[key], key);
            } else {
              appendFormData(data[key], root + "[" + key + "]");
            }
          }
        }
      } else {
        if (data !== null && typeof data !== "undefined") {
          formData.append(root, data);
        }
      }
    }
  }

  function ignore(root: any) {
    return (
      Array.isArray(ignoreList) &&
      ignoreList.some(function (x) {
        return x === root;
      })
    );
  }

  appendFormData(obj, rootName);

  return formData;
}

export function isValidEmail(email: string) {
  const expression = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);

  return expression.test(email);
}

// export function isValidMobile(number: string) {
//   const expression = new RegExp(/^(?:(?+977)?)?[9][6-9]d{8}|01[-]?[0-9]{7}/);
//   return expression.test(number);
// }

export function isValidUrl(url: string) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );

  return !!pattern.test(url);
}

export function isValidPassword(password: string) {
  const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

  return re.test(password);
}
