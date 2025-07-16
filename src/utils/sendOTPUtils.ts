import { setOTP } from "../redis/OTPCache";

const sendOTPUtils = async (email: string, phone: number) => {
  //crete an OTP and send it to the user
  const otp = 123;
  const expiresIn = 300;

  // store it in redis
  await setOTP(otp, email !== "" ? email : phone.toString(), expiresIn);
  return otp;
};

export default sendOTPUtils;
