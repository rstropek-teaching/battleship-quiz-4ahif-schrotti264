var ships = [5,4,3,3,2];

const NORTH = 0;
const EAST = 1;
const SOUTH = 2;
const WEST = 3;

$(() => {
  // Select table containing the battleground
  const battleground = $('#battleground');

  // Build 10 x 10 grid for battleground
  for (let row = 0; row < 10; row++) {
    // Create table row
    const tr = $('<tr>');
    for (let column = 0; column < 10; column++) {
      // Create table cell with CSS class `water`. Note that we use
      // HTML data attributes  to store the coordinates of each cell
      // (see https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes). 
      // That makes it much easier to find cells based on coordinates later.
      $('<td>').addClass('water').attr('data-r', row).attr('data-c', column).appendTo(tr);
    }

    // Add table row to battleground table
    tr.appendTo(battleground);
  }

  $('#generate').click(() => {
    console.log(0);
    for(var i = 0; i < 10;i++){
      console.log(8);
      for(var j = 0; j < 10; j++){
        console.log(9);
        removeSquare(i,j);
      }
    }
    console.log('x');
    for(var i = 0; i < ships.length; i++){
      console.log(1);
      while(true){
        console.log(2);
        x = Math.floor(Math.random()*10);
        y = Math.floor(Math.random()*10);
        r = Math.floor(Math.random()*4);
        if(putShip(ships[i],x,y,r)){
          break;
        }
      }
    }

  });
});

function putShip(shipLength=1,x=0,y=0,r=NORTH,firstCall=true){
  if(isOccupied(x,y) || neighbourCount(x,y) > 1){
    return false;
  }
  if(firstCall && neighbourCount(x,y) === 1){
    return false;
  }
  if(x < 0 || x > 9 || y < 0 || y > 9){
    return false
  }
  putSquare(x,y);
  if(shipLength === 1){
    // Last square of ship has been placed successfully (found spot for ship)
    return true;
  }
  switch(r){
    case NORTH:
      var success = putShip(shipLength-1,x,y-1,r,false);
      break;
    case EAST:
      var success = putShip(shipLength-1,x+1,y,r,false);
      break;
    case SOUTH:
      var success = putShip(shipLength-1,x,y+1,r,false);
      break;
    case WEST:
      var success = putShip(shipLength-1,x-1,y,r,false);
      break;
    default:
      var success = false;
  }
  if(success){
    return true;
  }
  removeSquare(x,y);
  return false;
}
function isOccupied(x,y) {
  return $('td[data-r="'+ y +'"][data-c="'+ x +'"]').hasClass('ship');
}
function neighbourCount(x,y) {
  var result = 0;
  if(isOccupied(x,y-1)){
    result++;
  }
  if(isOccupied(x+1,y)){
    result++;
  }
  if(isOccupied(x,y+1)){
    result++;
  }
  if(isOccupied(x-1,y)){
    result++;
  }
  return result;
}
function putSquare(x,y){
  $('td[data-r="'+ y +'"][data-c="'+ x +'"]').removeClass('water').addClass('ship');
}
function removeSquare(x,y){
  $('td[data-r="'+ y +'"][data-c="'+ x +'"]').removeClass('ship').addClass('water');
}