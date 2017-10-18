/*
  Title: MeltstoneJS
  Web: meltstone.com
  License: MIT

  Author: Amir Honarpour
  Web: honarpour.com/code
*/

import Promise from 'bluebird';

const state = {
  blocks: [],
  contentFolder: ''
};

const melt = stone => {
  let output = '';
  if (typeof stone !== 'undefined') {
    if (stone.startsWith('text:')) {
      output = `<p>${stone.substring(5, stone.length)}</p>`;
    } else if (stone.startsWith('image:')) {
      let src = stone.substring(6, stone.length);
      if (src.startsWith('http')) {
        output = `<img src="${src}" alt="" />`;
      } else {
        output = `<img src="${state.contentFolder}/${src}" alt="" />`;
      }
    } else if (stone.startsWith('link:')) {
      const url = stone.substring(5, stone.length);
      output = `<p><a href="${url}" target="_blank" />${url}</a></p>`;
    } else if (stone.indexOf('&copy;') !== -1 || stone.indexOf('©') !== -1) {
      output = `<p small>${stone}</p>`;
    } else {
      // Default to text
      output = `<p>${stone}</p>`;
    }
  }
  return output;
};

const getBlockContent = blockName => {
  return fetch(`${state.contentFolder}/${blockName}`, {
    method: 'get',
    headers: {
      'Content-Type': 'plain/text'
    }
  })
    .then(response => response.text())
    .catch(error => {
      console.log(error);
      return { error };
    });
};

const Meltstone = (contentFolder, limit) => {
  state.contentFolder = contentFolder;
  const totalBlocks = limit || 10;
  const blockNames = [];

  for (let i = 1; i <= totalBlocks; i += 1) {
    blockNames.push(`block${i}.txt`);
  }

  return Promise.mapSeries(blockNames, blockName =>
    getBlockContent(blockName).then(data => {
      state.blocks.push(melt(data));
    })
  )
    .then(() => state.blocks)
    .catch(error => {
      console.log('-- error', error);
      return [];
    });
};

export default Meltstone;
