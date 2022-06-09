document.addEventListener('DOMContentLoaded', () =>{
const grid = document.querySelector('.grid')
let width = 10
let lettuceAmount = 20
let squares = []
let isGameOver = false
let flags = 0


//create board
function createBoard(){
    //gets shuffled game array with random lettuce
    const lettuceArray = Array(lettuceAmount).fill('lettuce')
    const emptyArray = Array(width*width - lettuceAmount).fill('valid')
    const gameArray = emptyArray.concat ( lettuceArray );
    const shuffledArray = gameArray.sort(() => Math.random() -0.5)   
 
    for(let i = 0; i < width*width; i++){
        const square = document.createElement('div')
        square.setAttribute('id', i ) //creates and gives each square and id
       square.classList.add(shuffledArray[i])
        grid.appendChild(square) //puts in the grid
        squares.push(square)

        //normal clicks
        square.addEventListener('click', function(e){
         click(square)
        })
        square.oncontextmenu = function(e){
            e.preventDefault()
            addFlag(square)
        }
    }
    
//add numbers
for(let i = 0; i < squares.length; i++){
    let total = 0 
    const isLeftEdge = (i % width === 0 )
    const isRightEdge = (i % width === width - 1)

    if (squares[i].classList.contains('valid')){
        if(i > 0 && !isLeftEdge && squares[i - 1].classList.contains('lettuce')) total ++
        if(i > 9 && !isRightEdge && squares[i +1 -width].classList.contains('lettuce')) total ++
        if(i > 10 && squares[i-width].classList.contains('lettuce')) total ++
        if(i > 11 && !isLeftEdge && squares[i - 1 -width].classList.contains('lettuce')) total ++
        if(i < 98 && !isRightEdge && squares[i + 1].classList.contains('lettuce')) total ++
        if(i < 90 && !isLeftEdge && squares[i- 1 + width].classList.contains('lettuce')) total ++
        if(i < 88 && !isRightEdge && squares[i +1 +width].classList.contains('lettuce')) total ++
        if(i < 89 && squares[i +width].classList.contains('lettuce')) total ++
        squares[i].setAttribute('data', total)
        console.log(squares[i])
   
    }
  }
}

createBoard()
function addFlag(square){
    if(isGameOver) return 
    if(!square.classList.contains('checked') && (flags < lettuceAmount)){
    if(!square.classList.contains('flag')){
        square.classList.add('flag')
        square.innerHTML = '🧁'
        flags ++
        checkForWin()
    }else{
        square.classList.remove('flag')
        square.innerHTML = ''
        flags --
     }
  }
}
//click on square action
function click(square){
    let currentId = square.id
    if (isGameOver) return
    if(square.classList.contains('checked')|| square.classList.contains('flag')) return
    if(square.classList.contains('lettuce')){
       GameOver(square)
    }else{
        let total = square.getAttribute('data')
        if(total !=0){
            square.classList.add('checked')
            square.innerHTML = '🍫'
            return
        }
        checkSquare(square, currentId)
      }
      square.classList.add('checked')   
    }

    //check neighbouring squares once square is clicked
    function checkSquare(square, currentId){
        const isLeftEdge = (currentId % width === 0 )
        const isRightEdge = (currentId % width === width -1)
    
    setTimeout(() => {
      if (currentId > 0 && !isLeftEdge){
          const newId = squares[parseInt(currentId)-1].id
          const newSquare = document.getElementById(newId)
          click(newSquare)
      }
      if (currentId > 9 && !isRightEdge){
        const newId = squares[parseInt(currentId) +1 -width].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId > 10){
        const newId = squares[parseInt(currentId)-width].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId > 11 && !isLeftEdge){
        const newId = squares[parseInt(currentId)-1 -width].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId < 98 && !isRightEdge){
        const newId = squares[parseInt(currentId) +1].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId < 90 && !isLeftEdge){
        const newId = squares[parseInt(currentId)-1 +width].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId < 88 && !isRightEdge){
        const newId = squares[parseInt(currentId) +1 +width].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      if (currentId < 89){
        const newId = squares[parseInt(currentId) +width].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
    }, 10)
  }

//game over
   function GameOver(square){
    console.log('BOOM! Game Over!')
    isGameOver = true 
//show all the bombs
    squares.forEach(square =>{
     if (square.classList.contains('lettuce')){
    square.innerHTML = '🥬'
       
   }
 })
}
//check for win
function checkForWin(){
let matches = 0 

for(let i = 0; i < squares.length; i ++){
     if(squares[i].classList.contains('flag')&& squares[i].classList.contains('lettuce')){
    matches ++
     }
     if(matches === lettuceAmount){
         console.log('YOU WIN!')
         GameOver = true
     }
  }
}

})