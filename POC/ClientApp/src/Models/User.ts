import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit/react";
import * as Yup from "yup";
import axios from "axios";
import { baseURL } from "../Api/agent.ts";
import { addToken } from "../Redux/Reducer/Features/Auth/AuthSlice.tsx";
import * as yup from 'yup';

export interface User {
  id: number;
  name: string;
  userId: String;
  email: string;
  role: Role;
}

enum Role {
  Admin,
  User,
}

export interface AuthState {
  userData?: User;
  isLoggedIn: boolean;
  token?: string;
}

export interface LoginFormValues {
  userId: string;
  password: string;
}
export const LoginInitialValues: LoginFormValues = {
  userId: "",
  password:""
};

export const LoginSchema = Yup.object<any>().shape<any>({
  userId: Yup.string().required("User ID is required"),
  password: Yup.string().required("Password is required"),
});

export const AdminLoginApi =
  (values: LoginFormValues, onComplete: any, onError: any) =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    await axios
      .post(
        `${baseURL}api/User`,
        {
          ...values,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res?.data?.status === 200) {
          dispatch(
            addToken({
              token: res.data.entity.token,
              isLoggedIn: true,
              userData: res.data.entity.userData,
            })
          );
          onComplete();
        } else {
          onError();
        }
      })
      .catch((error) => {
        onError();
      });
  };


  //Register User 
//Define the Register Model
//Purpose: Match the backend User model.

 export interface RegisterFormValues{
  name: string;
  email:string;
  password:string;
  confirmPassword:string;
  phoneNumber:string;
  role:number;
  longitude?:string;
  latitude?:string;


 }
 export const RegisterInitialValues: RegisterFormValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  role: 0, // Default to a valid UserRole
  longitude: undefined,
  latitude: undefined,
};

//    Add Validation:

export const RegisterSchema=yup.object<any>().shape<any>({
  name:yup.string().required("Name is Required"),
  email:yup.string().email("Invalid email").required('Email is required'),
  password:yup.string().min(6,"Password must be atleast 6 characters").required("Password is required"),
  confirmPassword: yup.string()
  .equals([Yup.ref("password")], "Passwords must match")
  .required("Confirm Password is required"),
  phoneNumber: yup.string().matches(/^[0-9]{11}$/, "Phone number must be 11 digits").required("Phone number is required"),
  role:yup.number().required("Role is required"),
  longitude:yup.number().optional(),
  latitude:yup.number().optional(),
});