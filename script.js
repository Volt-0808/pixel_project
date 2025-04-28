//массовое обозначение путей

const header = document.querySelector("header")
const undo_redo_download = document.getElementById('undo-redo-download')
const undo = document.getElementById('undo')
const redo = document.getElementById('redo')
const dowmload = document.getElementById('dowmload')
const gridContainer = document.getElementById('grid-container')
const main_color = document.getElementById('color')
const fill_output = document.getElementById('fill-output')
const fill_output_in = document.getElementById('fill-output-in')
const choose_color = document.getElementById('choose-color')
const bod = document.querySelector("body")
const back = document.getElementById("back")
const main = document.getElementById('main')
const bl = document.getElementById('black')
const re = document.getElementById('red')
const or = document.getElementById('orange')
const ye = document.getElementById('yellow')
const gr = document.getElementById('green')
const bu = document.getElementById('blue')
const db = document.getElementById('dark-blue')
const pu = document.getElementById('purple')
const pi = document.getElementById('pink')
const cl = document.getElementById('clear')
const fi = document.getElementById('fill')
const r_slider = document.getElementById('r-slider')
const g_slider = document.getElementById('g-slider')
const b_slider = document.getElementById('b-slider')
const rgb_column = document.querySelectorAll('.rgb-column')
const p_red_output = document.querySelector("#p-red-output")
const p_green_output = document.querySelector("#p-green-output")
const p_blue_output = document.querySelector("#p-blue-output")
const button_header = document.querySelector("#button-header")


//обозначения переменных

const rows = 16
const cols = 16
var cookies = []
var color = "#000000"
var fill = 0
const scale = 5
var mouseDown = false
var dick = {
  1:"#000000",
  2:"#FF0000",
  3:"#FFA500",
  4:"#FFFF00",
  5:"#008000",
  6:"#0000FF",
  7:"#1446a3",
  8:"#800080",
  9:"#FFC0CB",
  0:"#FFFFFF",
  c:"c",
  f:"fill",
  d:"d"
}
var dick_rus = {
  "а":"fill",
  "с":"c",
  "в":"d",
}
var undos = []
var redos = []
fill_output_in.removeChild(fill_output)
choose_color.style.display='none'
fi.style.backgroundImage = 'url("https://avatars.mds.yandex.net/i?id=433f83e9c830f0e3c254f25a89b0fb6b0862d4df-10151263-images-thumbs&n=13")'
change_page(0)

//слежка за мышью


document.body.onmousedown = function() {
  mouseDown = true
}
document.body.onmouseup = function() {
  mouseDown = false
}
gridContainer.addEventListener('mouseleave', () => {
  mouseDown = false
})

//функции 

function fill_check(){
  if (fill!="fill"){
    fill_output_in.appendChild(fill_output)
    fill = "fill"
  } else {
    fill_output_in.removeChild(fill_output)
    fill = 0
  }
}
function keyboard(e){
  key = e.key.toLowerCase()
  if (dick[key]=="fill" || dick_rus[key]=="fill"){
    fill_check()
  } else if (dick[key]=="c" || dick_rus[key]=="c"){
    changeOnClick()
  } else if (dick[key]=="d" || dick_rus[key]=="d"){
    let pixelAll = document.querySelectorAll(".pixel")
    redos=[]
    pixelAll.forEach((ela)=>{redos.push(ela.style.backgroundColor)})
    undos.push(["fill", redos])
    redos=[]
    anime({
      targets: '.pixel',
      backgroundColor: "#FFFFFF",
      })
  } else if (dick.hasOwnProperty(e.key)){
    color = dick[key]
    main_color.style.backgroundColor = dick[key]
  }
}
function onpress(el){
  if (fill == "fill"){
    fill_output_in.removeChild(fill_output)
    let pixelAll = document.querySelectorAll(".pixel")
    redos=[]
    pixelAll.forEach((ela)=>{redos.push(ela.style.backgroundColor)})
    undos.push(["fill", redos])
    redos=[]
    anime({
      targets: '.pixel',
      backgroundColor: color,
      })
    fill = 0
    } else{
      if (el.style.backgroundColor != color){
        undos.push([el, el.style.backgroundColor])
        redos=[]
        el.style.backgroundColor = color
      }
    }
}
function str_rgb(){
  return `rgb(${r_slider.value}, ${g_slider.value}, ${b_slider.value})`
}
function listen_color(elem, color_f){
  elem.addEventListener('click', () => {color = color_f; main_color.style.backgroundColor = color_f})
}
function updateColor(){
  color = str_rgb()
  main_color.style.backgroundColor = color
  p_red_output.innerHTML = r_slider.value
  p_green_output.innerHTML = g_slider.value
  p_blue_output.innerHTML = b_slider.value
}
function changeOnClick(){
  (choose_color.style.display=="")?choose_color.style.display='none':choose_color.style.display=""
  rgb_column.forEach((elem) => {
    (elem.style.display!='')?elem.style.display='':elem.style.display='none'
  })
}
function change_page(e){
  if (e){
    header.style.display='none' //убираем
    main.style.display='flex'
    back.style.display=''
  } else{
    header.style.display='' //добовляем header
    main.style.display='none'
    back.style.display='none'
  }
}
function createGrid() {
  for (let i = 0; i < rows * cols; i++) {
      const pixel = document.createElement('div')
      pixel.classList.add('pixel')
      pixel.style.backgroundColor = "white"
      pixel.addEventListener('mouseover', () => {mouseDown?onpress(pixel):0})
      pixel.addEventListener('mousedown', () => {onpress(pixel)})
      gridContainer.appendChild(pixel)
  }
}
function undo_fun(){
  if (undos[0]){
    let num = undos[undos.length - 1]
    if (num[0]=="fill"){
      let i = 0
      redos.push(["fill", document.querySelector(".pixel").style.backgroundColor])
      undos.pop()
      document.querySelectorAll(".pixel").forEach((el)=>{el.style.backgroundColor=num[1][i];i++})
    } else{
      redos.push([num[0], num[0].style.backgroundColor])
      undos.pop()
      num[0].style.backgroundColor=num[1]
    }
  }
}
function redo_fun(){
  if (redos[0]){
    let num = redos[redos.length - 1]
    if (num[0] == "fill"){
      let pixelAll = document.querySelectorAll(".pixel")
      let t = []
      pixelAll.forEach((ela)=>{t.push(ela.style.backgroundColor)})
      undos.push(["fill", t])
      redos.pop()
      anime({
        targets: '.pixel',
        backgroundColor: num[1],
        })
    } else{
      undos.push([num[0], num[0].style.backgroundColor])
      redos.pop()
      num[0].style.backgroundColor=num[1]
    }
  }
}


//слежка
undo.addEventListener("click", () =>{undo_fun()})
redo.addEventListener("click", () =>{redo_fun()})
button_header.addEventListener("click", () =>{change_page(1)})
back.addEventListener('click', () =>{change_page(0)})
button_header.addEventListener("mouseover", () => {button_header.innerText = "Поехали"})
button_header.addEventListener("mouseleave", () => {button_header.innerText = "Перейти к созданию"})
fill_output.addEventListener('click', () => {fill = 0; fill_output_in.removeChild(fill_output)})
document.addEventListener('keydown', function(e){keyboard(e)})
main_color.addEventListener('click', changeOnClick)
r_slider.addEventListener('click', updateColor)
g_slider.addEventListener('click', updateColor)
b_slider.addEventListener('click', updateColor)
r_slider.addEventListener('input', updateColor)
g_slider.addEventListener('input', updateColor)
b_slider.addEventListener('input', updateColor)
choose_color.addEventListener('click', () => {main_color.style.backgroundColor = choose_color.value; color = choose_color.value})
choose_color.addEventListener('input', () => {main_color.style.backgroundColor = choose_color.value; color = choose_color.value})
listen_color(bl, "#000000")
listen_color(re, "#FF0000")
listen_color(or, "#FFA500")
listen_color(ye, "#FFFF00")
listen_color(gr, "#008000")
listen_color(bu, "#0000FF")
listen_color(db, "#1446a3")
listen_color(pu, "#800080")
listen_color(pi, "#FFC0CB")
listen_color(cl, "#FFFFFF")
fi.addEventListener('click', () => {fill_check()})


download.addEventListener('click', function() {
  html2canvas(gridContainer).then(canvas => {
    const link = document.createElement('a')
    link.href = canvas.toDataURL('image/png')
    link.download = 'image.png'
    link.click()
  })
})

//создаём сетку


createGrid()



