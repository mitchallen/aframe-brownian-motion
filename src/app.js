AFRAME.registerComponent('log-position', {
    schema: {
        interval: { type: 'number', default: 100 }  // Log interval in milliseconds
    },

    init: function () {
        this.interval = setInterval(() => {
            const position = this.el.object3D.position;
            console.log(`Position: ${position.x.toFixed(2)}, ${position.y.toFixed(2)}, ${position.z.toFixed(2)}`);
        }, this.data.interval);
    },

    remove: function () {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
});

// Assuming you're using a script tag to include A-Frame in your HTML
// You might want to adjust the scaling factor based on your specific needs

AFRAME.registerComponent('position-to-color', {
    schema: {
      scale: {type: 'number', default: 1.0} // Scale factor to adjust position values to color range
    },
  
    init: function() {
        // ...
    },

    tick: function() {
        // console.log("tick")  
        this.updateColor(this.el.object3D.position);
    },
  
    updateColor: function(position) {
      // Scaling position to fit within RGB range
    //   const r = Math.abs(position.x) * this.data.scale % 255;
    //   const g = Math.abs(position.y) * this.data.scale % 255;
    //   const b = Math.abs(position.z) * this.data.scale % 255;

    function mapValue(value) {
        // Apply the direct linear transformation
        let newValue = ((value + 1.0) / 2.0) * 255;
    
        // Clamp the result to ensure it stays within the 0 to 255 range and round it
        return Math.round(Math.max(0, Math.min(255, newValue)));
    }

    const r = mapValue(position.x);
    const g = mapValue(position.y);
    const b = mapValue(position.z);
  
      // Update entity's material color
      this.el.setAttribute('material', 'color', `rgb(${r}, ${g}, ${b})`);
    }
  });
  