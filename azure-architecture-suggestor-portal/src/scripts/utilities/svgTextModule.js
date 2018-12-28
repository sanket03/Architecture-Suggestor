const svgTextModule = (() => {
    const defaultTextHeight = 20;
    const defaultTextPercentage = 13/100;
    const defaultTextFontSizePercentage = 8/100;
    let textPrototype = {
      'x' : 0,
      'y' : 0,
      'height': 0,
      'fontSize': 0,
      setTextXcoord(groupBoxWidth) {
        this.x = groupBoxWidth/2;
      },
      setTextYcoord(yCoord) {
        this.y = yCoord;
      },
      setTextDimension(groupBoxWidth) {
        this.height = truncateToTwoDecimal(groupBoxWidth*defaultTextPercentage);
      },
      setTextFontSize(groupBoxWidth) {
        this.fontSize = truncateToTwoDecimal(groupBoxWidth*defaultTextFontSizePercentage);
      }
    }
  
    // Truncate values to decimal places
    const truncateToTwoDecimal = (value) => {
        return parseInt(value*100)/100;
    }

    // Set text attributes
    const setTextAttributes = (groupBoxWidth, yCoord) => {
      let text = Object.create(textPrototype);
      text.setTextXcoord(groupBoxWidth);
      text.setTextYcoord(yCoord);
      text.setTextDimension(groupBoxWidth);
      text.setTextFontSize(groupBoxWidth)
      return text;
    }

    // Calculate text height
    const calcTextHeight = (groupBoxWidth) => { 
      return truncateToTwoDecimal(groupBoxWidth*defaultTextPercentage);
    }
  
    return {
      setTextAttributes,
      calcTextHeight,
    }
  })()

  export default svgTextModule;