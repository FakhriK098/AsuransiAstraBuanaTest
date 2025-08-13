import Constant from '../constants';
import { PokemonResult } from '../types/pokemon';

export const createImgLink = (id: number, url?: string): string => {
  let imgUrl: string = '';
  if (id > 0) {
    imgUrl = `${Constant.BaseUrlImg}${id}.png`;
  } else {
    const urlSplit = url?.split('/');
    if (urlSplit) {
      const idUrl = urlSplit[urlSplit?.length - 2];
      imgUrl = `${Constant.BaseUrlImg}${idUrl}.png`;
    }
  }

  return imgUrl;
};

export const getId = (poke: PokemonResult): string => {
  const idMatch = poke.name.match(/\/(\d+)\/$/);
  return idMatch ? idMatch[1] : poke.name;
};
