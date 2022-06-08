import Cache from './cache.js';
import Logger from './logger.js';

export abstract class Platform {
  abstract cache(): Cache;

  abstract logger(): Logger;
}

let thePlatform: Platform | null = null;

export const platform = (): Platform => {
  if (thePlatform == null) {
    throw Error('Please call setPlatform() before use');
  }
  return thePlatform;
};

export const setPlatform = (newPlatform: Platform) => {
  thePlatform = newPlatform;
};
