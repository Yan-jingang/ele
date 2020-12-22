import http from "@/request/config.js";

export const getData = params => http.get("/api/home/getData", params);
export const getList = params => http.get("/api/user/getUser", params);
export const deleteUser = params => http.get("/api/user/del", params);
export const editUser = params => http.post("/api/user/edit", params);
export const addUser = params => http.post("/api/user/add", params);
export const findUser = params => http.put("/api/user/findUser", params);
export const login = params => http.post("api/permission/getMenu", params);

