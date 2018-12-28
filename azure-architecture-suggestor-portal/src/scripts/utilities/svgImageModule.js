const svgImageModule = (() => {
  const defaultImagePercentage = 23/100;
  let imagePrototype = {
    'x' : 0,
    'y' : 0,
    'height': 0,
    'width': 0,
    'translateX': 0,
    'url': '',
    setImageXcoord(groupBoxWidth) {
      this.x = groupBoxWidth/2;
    },
    setImageYcoord(yCoord) {
      this.y = yCoord;
    },
    setImageUrl(url) {
      this.url = url;
    },
    setImageDimensions(groupBoxWidth) {
      this.height = truncateToTwoDecimal(groupBoxWidth*defaultImagePercentage);
      this.width = truncateToTwoDecimal(groupBoxWidth*defaultImagePercentage);
    },
    setImageTranslateX() {
      this.translateX = (this.width/2)*(-1)
    }
  }

  // Truncate values to decimal places
  const truncateToTwoDecimal = (value) => {
      return parseInt(value*100)/100;
  }

  const setImageAttributes = (url, groupBoxWidth, yCoord) => {
    let image = Object.create(imagePrototype);
    image.setImageXcoord(groupBoxWidth);
    image.setImageYcoord(yCoord);
    image.setImageUrl(url);
    image.setImageDimensions(groupBoxWidth);
    image.setImageTranslateX();
    return image;
  }

  // Calculate image height
  const calcImageHeight = (groupBoxWidth) => { 
    return truncateToTwoDecimal(groupBoxWidth*defaultImagePercentage);
  }

  return {
    setImageAttributes,
    calcImageHeight
  }
})()

export default svgImageModule;
