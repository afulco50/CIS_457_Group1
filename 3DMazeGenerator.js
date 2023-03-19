//function to check the given maze for at least one successful path
ThreeDMaze.checkMaze = function(maze)
{
    //declare variables to represent locations of start and endpoint
    var startX = 1, startY = 1, endX = maze.length - 2, endY = maze[0].length - 2;

    //base case
    //if()
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
        if(mazeComplete())
            doneGenerating = true;

    } while (!doneGenerating)
   
    //return the populated maze
    return maze;
}