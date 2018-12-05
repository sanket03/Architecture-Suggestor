const svgImageModule = (() => {
    const defaultImageHeight = 35;
    const defaultImageWidth = 35;
    let imagePrototype = {
      'x' : 0,
      'y' : 0,
      'height': defaultImageHeight,
      'width': defaultImageWidth,
      'translateX': (defaultImageWidth/2)*(-1),
      'url': '',
      calcImageXcoord(groupBoxWidth) {
        this.x = groupBoxWidth/2;
      },
      calcImageYcoord(yCoord) {
        this.y = yCoord;
      },
      setImageUrl(url) {
        this.url = url;
      }
    }
  
    const setImageAttributes = (url, groupBoxWidth, yCoord) => {
      let image = Object.create(imagePrototype);
      image.calcImageXcoord(groupBoxWidth);
      image.calcImageYcoord(yCoord);
      image.setImageUrl(url); 
      return image;
    }
  
    return {
      defaultImageWidth,
      defaultImageHeight,
      setImageAttributes
    }
  })()

  export default svgImageModule;
  