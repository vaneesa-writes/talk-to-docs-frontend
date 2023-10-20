import axios from "axios";
import FormData from "form-data";


async function doctrain(filename, file) {
  console.log("file name",filename)
  let data = new FormData();
  let auth_tok = localStorage.getItem("jwt_token");
  data.append("token",auth_tok)
  data.append("email", "hello@gmail.com");
  data.append("projectId", filename.split('.')[0]);
  data.append("projDate", "1-2-3");
  data.append(
    "file",
    file
  );

  let config = {
    method: "post",
    url: "https://talktodocs.blendapis.com/doctrain",
    headers: {
      "Content-Type": "multipart/form-data",
      // "Access-Control-Allow-Origin" : "*"
    },
    data: data,
  };

  return axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      if (response.data.message === "Doctrain success") {
        alert("Training Success");
        return true;
      } else {
        alert("Please Try Again");
        return false;
      }
    })
    .catch((error) => {
      console.log(error);
      alert("ERROR !!! Please Try Again");
      return false;
    });
}

async function docChat(filename, query) {
  console.log("chat filename",filename)
  let data = new FormData();
  let auth_tok = localStorage.getItem("jwt_token");
  data.append("token",auth_tok)
  data.append("email", "hello@gmail.com");
  data.append("projectId", filename.split('.')[0]);
  data.append("query", query);
  data.append("chatHistory", "");

  let config = {
    method: "post",
    url: "https://talktodocs.blendapis.com/docChat",
    headers: {
      // "Content-Type": "multipart/form-data",
    },
    data: data,
  };

  return axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      return response.data.result;
    })
    .catch((error) => {
      console.log(error);
      //   alert("Please Try Again");
      return "Please Try Again";
    });
}

async function deleteDoc(filename) {
  let data = new FormData();
  let auth_tok = localStorage.getItem("jwt_token");
  data.append("token",auth_tok)
  data.append("email", "hello@gmail.com");
  data.append("projectId", filename);

  let config = {
    method: "post",
    url: "https://talktodocs.blendapis.com/deleteUserProj",
    headers: {
      // ...data.getHeaders(),
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
}

export default {
  docChat,
  doctrain,
  deleteDoc,
};
