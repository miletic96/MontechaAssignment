import React, { useState } from "react";
import Navigation from "./components/navigation";

const Assignment = () => {
  const [sequence, setSequence] = useState("");

  const sequenceChangeHandler = (e) => {
    setSequence(e.target.value);
  };
  const nextChar = (c) => {
    if (c === "z") {
      return "a";
    }
    return String.fromCharCode(c.charCodeAt(0) + 1); // increment char code by 1
  };
  const submitHandler = () => {
    var arrayOfLines = sequence.toLowerCase().split("\n");
    let maxCharsX = 0; // max chars in a line
    for (let array in arrayOfLines) {
      // loop through each line to find the max chars
      if (arrayOfLines[array].length > maxCharsX) {
        maxCharsX = arrayOfLines[array].length;
      }
    }
    for (let array in arrayOfLines) {
      // loop through each line to add spaces to the end of each line so that they are all the same length
      if (arrayOfLines[array].length < maxCharsX) {
        let difference = maxCharsX - arrayOfLines[array].length;
        arrayOfLines[array] = arrayOfLines[array].concat(
          " ".repeat(difference)
        );
      }
    }
    let matrixInput = [];
    let matrixOutput = [];
    for (let i = 0; i < arrayOfLines.length; i++) {
      matrixInput[i] = [];
      matrixOutput[i] = [];

      let temp = arrayOfLines[i].split("");
      for (let j = 0; j < maxCharsX; j++) {
        matrixInput[i][j] = temp[j];
        matrixOutput[i][j] = temp[j];
      }
    }
    console.table(matrixInput);

    const charMap = new Map();
    let charArray = [];
    let allchars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    let charToFind = "a"; 
    for (let i = 0; i < arrayOfLines.length; i++) {
      for (let j = 0; j < maxCharsX; j++) {
        if (allchars.includes(matrixInput[i][j])) {
          charMap.set(matrixInput[i][j], [i, j]);
          charArray.push(matrixInput[i][j]);
        }
      }
    }
    console.log("Mapa");
    charArray = charArray.sort();
    const iterator1 = charMap.keys();
    console.log(charArray);

    
    for ( let k = 0; k<charArray.length; k++) {

      let charToFindCoordinates = charMap.get(charArray[k]);
      if (typeof charToFindCoordinates != "undefined") { // proveri da li postoji taj karaker mapiran
        let charToFindLine = charToFindCoordinates[0];
        let charToFindColumn = charToFindCoordinates[1];
        let startPosition = [charToFindLine, charToFindColumn]; //koordinate karaktera od koga idemo na sledeci
        let nextCharCoordinates = charMap.get(charArray[k+1]);
        if (typeof nextCharCoordinates != "undefined") {  // proveri da li postoji sledeci karaker mapiran
          let nextCharLine = nextCharCoordinates[0];
          let nextCharColumn = nextCharCoordinates[1];
          let endPosition = [nextCharLine, nextCharColumn]; // koordinate karaktera gde stajemo i krecemo sledeci put

          let columnDifference = charToFindColumn - nextCharColumn;
          let lineDifference = charToFindLine - nextCharLine;
          if (
            columnDifference == lineDifference ||
            columnDifference == lineDifference * -1
          ) { //Proveravamo da li je distanca po x i y osi jednaka
            if (startPosition[0] < endPosition[0]) {
              if (startPosition[1] < endPosition[1]) {
                let i = startPosition[0];
                let j = startPosition[1];
                while (i <= endPosition[0]) {
                  while (j <= endPosition[1]) {
                    matrixOutput[i][j] = "*";
                    j++;
                    i++;
                  }
                }
              } else {
                let i = startPosition[0];
                let j = startPosition[1];
                while (i <= endPosition[0]) {
                  while (j >= endPosition[1]) {
                    matrixOutput[i][j] = "*";
                    j--;
                    i++;
                  }
                }
              }
            } else {
              if (startPosition[1] < endPosition[1]) {
                let i = startPosition[0];
                let j = startPosition[1];
                while (i >= endPosition[0]) {
                  while (j <= endPosition[1]) {
                    matrixOutput[i][j] = "*";
                    j++;
                    i--;
                  }
                }
              } else {
                let i = startPosition[0];
                let j = startPosition[1];
                while (i >= endPosition[0]) {
                  while (j >= endPosition[1]) {
                    matrixOutput[i][j] = "*";
                    j--;
                    i--;
                  }
                }
              }
            }
          } else {
            let i = startPosition[0];
            let j = startPosition[1];
            if (startPosition[1] < endPosition[1]) {
              while (j <= endPosition[1]) {
                matrixOutput[i][j] = "*";
                j++;
              }
            } else {
              while (j >= endPosition[1]) {
                matrixOutput[i][j] = "*";
                j--;
              }
            }
            j = endPosition[1];
            if (startPosition[0] < endPosition[0]) {
              while (i <= endPosition[0]) {
                matrixOutput[i][j] = "*";
                i++;
              }
            } else {
              while (i >= endPosition[0]) {
                matrixOutput[i][j] = "*";
                i--;
              }
            }
          }
        }
        charToFind = nextChar(charToFind);
        console.log(charToFind);
      }
}
    console.table(matrixOutput);
  };
  return (
    <>        <Navigation />

      <div style={{ padding: 20 }}>
        <div className="ui ">
          <div className="ui input">
            <textarea
              className="prompt"
              placeholder="Enter sequence"
              type="textarea"
              value={sequence}
              onChange={sequenceChangeHandler}
            >
              {" "}
            </textarea>
          </div>

          <button
            className="ui primary button"
            type="submit"
            onClick={submitHandler}
          >
            <i className="github icon"></i>
            Connect
          </button>
        </div>
      </div>
    </>
  );
};
export default Assignment;
