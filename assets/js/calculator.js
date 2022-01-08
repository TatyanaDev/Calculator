const buttonReset = document.querySelector('.reset')
const buttonCalc = document.querySelector('.calc')
const display = document.querySelector('.display')
const buttons = document.querySelectorAll('button')
const date = document.querySelector('.date')

display.addEventListener('keydown', event => event.preventDefault())

buttonReset.addEventListener('click', () => (display.value = ''))

buttonCalc.addEventListener('click', event => {
  if (event && display.value === '') {
    return
  }
  display.value = eval(display.value)
})

buttons.forEach(button => {
  if (button.innerHTML === 'C' || button.innerHTML === '=') {
    return
  }
  button.addEventListener('click', () => {
    display.value += button.innerHTML
    display.scrollTop = display.scrollHeight
  })
})

setInterval(
  () =>
    (date.innerHTML = new Date().toLocaleString('ru', {
      hour: 'numeric',
      minute: 'numeric'
    })),
  1000
)
