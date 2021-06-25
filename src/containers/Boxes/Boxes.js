import React from 'react';
import './Boxes.css';
import Box from './Box/Box';
import Button from '../../containers/Button/Button';

class BoxesGroup extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         boxes: [
            { id: 1, name: "User 1" },
            { id: 2, name: "User 2" },
            { id: 3, name: "User 3" },
            { id: 4, name: "User 4" }

         ],
         className: 'box'
      };
   }

   addBoxHandler = () => {

      var counter, boxes;
      boxes = this.state.boxes;
      const currentData = [...this.state.boxes];
      counter = currentData.length + 1;
      boxes.push({ id: counter, name: 'User ' + counter });
      var resultClass = `box` + counter;
      this.setState({ boxes: boxes, className: resultClass });

   }

   removeItem(index) {
      const currentData = [...this.state.boxes];
      var reduceCounter = currentData.length;
      let boxes = currentData.filter((box, boxIndex) => {
         return boxIndex !== index
      });
      var resultClass = `box` + reduceCounter;
      this.setState({ boxes: boxes, className: resultClass });
   }

   swapBoxes = (fromBox, toBox) => {
      let boxes = this.state.boxes.slice();
      let fromIndex = -1;
      let toIndex = -1;

      for (let i = 0; i < boxes.length; i++) {
         if (boxes[i].id === fromBox.id) {
            fromIndex = i;
         }
         if (boxes[i].id === toBox.id) {
            toIndex = i;
         }
      }

      if (fromIndex !== -1 && toIndex !== -1) {
         let { fromId, ...fromRest } = boxes[fromIndex];
         let { toId, ...toRest } = boxes[toIndex];
         boxes[fromIndex] = { id: fromBox.id, ...toRest };
         boxes[toIndex] = { id: toBox.id, ...fromRest };

         this.setState({ boxes: boxes });
      }
   };

   /* The dragstart event is fired when the user starts dragging an element or text selection */
   /* event.target is the source element : that is dragged */
   handleDragStart = data => event => {
      let fromBox = JSON.stringify({ id: data.id });
      event.dataTransfer.setData("dragContent", fromBox);
   };

   /* The dragover event is fired when an element or text selection is being dragged */
   /* over a valid drop target (every few hundred milliseconds) */
   /* The event is fired on the drop target(s) */
   handleDragOver = data => event => {
      event.preventDefault(); // Necessary. Allows us to drop.
      return false;
   };

   /* Fired when an element or text selection is dropped on a valid drop target */
   /* The event is fired on the drop target(s) */
   handleDrop = data => event => {
      event.preventDefault();

      let fromBox = JSON.parse(event.dataTransfer.getData("dragContent"));
      let toBox = { id: data.id };

      this.swapBoxes(fromBox, toBox);
      return false;
   };

   makeBoxes = () => {
      return this.state.boxes.map((box, index) => (
         <Box
            box={box}
            key={index}
            draggable="true"
            onDragStart={this.handleDragStart}
            onDragOver={this.handleDragOver}
            onDrop={this.handleDrop}
            onRemove={() => { this.removeItem(index) }}
            classStyle={this.state.className}
         />
      ));
   };

   render() {
      const len = this.state.boxes.length;
      const disableBtn = len === 12;
      return (
         <div>
            <div className="boxes">
               {this.makeBoxes()}
            </div>
            <Button
               addmoreBox={this.addBoxHandler}
               disabled={disableBtn}
            />
         </div>

      );

   }
}

export default BoxesGroup;