
  export const YoutubeURL_Id_getIdUrl = (url) => {
    const regex = /(?:\?v=|\/embed\/|\.be\/)([\w\d-_]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
};
