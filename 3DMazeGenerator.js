// Define a recursive helper function to check for a valid path
ThreeDMaze.checkAgain = function(row, col) 
{
  // If the current cell is outside the bounds of the matrix or is a 1 on the edge of the matrix (border), ignore and return false before checking anything else
  if 
  (
        row < 0 || //less than 0 index, impossible
        row >= rows || //greater than length of maze
        col < 0 || //less than zero index, impossible
        col >= cols || //greater than height of maze (length of subarray)
        (row === 0 || col === 0 || row === rows - 1 || col === cols - 1) && //spot being checked is on any of the borders of the maze
        matrix[row][col] === 1 //spot being checked is marked as a wall
  ) 
    return false;

  //cell being checked has a value of true in checkedSpaces or is a 1 in the maze
  if (checkedSpaces[row][col] || matrix[row][col] === 1) 
    return false;

  //cell being checked is the endpoint of the maze (bottom right corner excluding the edges)
  if (row === rows - 1 && col === cols - 1)
    return true;

  //mark the cell as checked for future iterations
  checkedSpaces[row][col] = true;

  //recursively call checkAgain() to check all adjacent cells, return true if any of the recursive calls return true
  if (checkAgain(row + 1, col) || checkAgain(row - 1, col) || checkAgain(row, col + 1) || checkAgain(row, col - 1))
    return true;

  //if none of the adjecent cells lead to the endpoint, mark the current cell as false and return false since no valid paths were found
  checkedSpaces[row][col] = false;
  return false;
}

//function to check if there is at least one valid path from start to finish in the maze
ThreeDMaze.hasValidPath = function(maze) 
{
    //declares needed variables
    var rows = maze.length;
    var cols = maze[0].length;

    //create a placeholder array to mark which spaces have already been checked
    var checkedSpaces = [rows][cols]

    //populate the entire array with false except for the edges
    for(var i = 1; i < 6; i++)
    {
        for(var j = 1; j < 6; j++)
        {
            checkedSpaces[i][j] = false;
        }
    }

    //populates the edges with true so they are ignored when searching for a valid path
    for(var a = 0; a < 8; a++)
    {
        checkedSpaces[a][0] = true;
        checkedSpaces[a][7] = true;
        checkedSpaces[0][a] = true;
        checkedSpaces[7][a] = true;
    }
  
    //begin recursive path check function at the top left of the maze (since it accounts for ignoring the edge spaces on its own)
    return checkAgain(0, 0);
}

//function to populate the maze with 1's and 0's, representing walls and spaces
ThreeDMaze.createMaze = function(sideLength)
{
    //declares variables needed for maze generation
    var marker_x = 0, marker_y = 0;
    var maze = [];
    var doneGenerating = false;

    //initializes maze var into grid to represent presence of walls
    for(var xcoord = 0; xcoord <= (sideLength - 1); xcoord++)
    {
        maze[xcoord] = []; //initializes second array

        //populates grid row with "empty" values (except for borders of maze)
        for(var ycoord = 0; ycoord <= (sideLength - 1); y++)
        {
            //checks if the markers point to an edge piece of the maze
            if(xcoord == 0 || ycoord == 0 || xcoord == (sideLength - 1) || ycoord == (sideLength - 1))
            {
                //checks to see if markers point to the start or end blocks of the maze
                if(!(xcoord == 1 && ycoord == 1) && !((xcoord == (sideLength - 2)) && (ycoord == (sideLength - 2))))
                    maze[xcoord][ycoord] = 1;
            }
            else
                maze[xcoord][ycoord] = 0;
        }        
    }

    //iterate through the rest of the maze to randomly populate maze blocks with walls
    do
    {
        //zeroes out marker_x in case maze in not traversable
        marker_x = 0;

        //randomizes maze creation block by block
        do
        {
            //populate each column with blocks or blanks
            for(marker_y = 0; marker_y <= (sideLength - 1); marker_y++)
            {
                var fillBlock = Math.round((Math.random() * 1));
                if(fillBlock == 1)
                    maze[marker_x][marker_y] = 1
                else
                    maze[marker_x][marker_y] = 0
            }
            marker_x++;
        } while (marker_x <= (sideLength - 1))

        //checks to see if resulting maze is traversable, if it is, break generation loop
        if(this.hasValidPath())
            doneGenerating = true;

    } while (!doneGenerating)
   
    //return the populated maze
    return maze;
}
