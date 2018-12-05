const svgTextModule = (() => {
    const defaultTextHeight = 20;
    let textPrototype = {
      'x' : 0,
      'y' : 0,
      'height': defaultTextHeight,
      calcTextXcoord(groupBoxWidth) {
        this.x = groupBoxWidth/2;
      },
      calcTextYcoord(yCoord) {
        this.y = yCoord;
      }
    }
  
    const setTextAttributes = (groupBoxWidth, yCoord) => {
      let text = Object.create(textPrototype);
      text.calcTextXcoord(groupBoxWidth);
      text.calcTextYcoord(yCoord);
      return text;
    }
  
    return {
      defaultTextHeight,
      setTextAttributes
    }
  })()

  export default svgTextModule;