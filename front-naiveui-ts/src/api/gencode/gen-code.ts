import $http from "@/api/alova.ts"


export const list = () => {
  return $http.Post('/user/list')
}
