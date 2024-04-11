import {atom} from "recoil"

export const recieverInfoAtom = atom({
  key : "RecieverInfo",
  default : {
    name : "",
    id : ""
  }
})