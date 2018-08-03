import axios from 'axios';

export const getPlayer = async (character) => {

  const player = await axios.get(`/api/player/${character}`)
  
  return player.data;
}