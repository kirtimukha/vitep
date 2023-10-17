import axios from 'axios';
import { IListProps,IDetail } from '../type/allTypes';

export const getList = () => {
  return axios.get<IListProps>('https://pokeapi.co/api/v2/pokemon?limit=1292')
  .then((res) => res.data)
  .catch(function (error) {
    // 오류 처리
    console.log(error);
    throw error; // 오류를 다시 던져서 React Query에서 오류 처리할 수 있게 함
  });
};


export const getDetail = (num: string) => {

  return axios.get<IDetail>(`https://pokeapi.co/api/v2/pokemon/${num}`)
    .then(res => res.data)
    .catch(function (error) {
      console.log(error);
      throw error
  })
}