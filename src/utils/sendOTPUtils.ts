import { setOTP } from "../redis/OTPCache";

const sendOTPUtils = async (email: string, phone: number) => {
  //create an OTP and send it to the user
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
  console.log("Generated OTP:", otp); // For debugging purposes
  const expiresIn = 300;

  // store it in redis
  await setOTP(otp, email !== "" ? email : phone.toString(), expiresIn);
  return otp;
};

export default sendOTPUtils;
