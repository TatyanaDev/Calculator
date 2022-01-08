const buttonReset = document.querySelector('.reset')
const buttonCalc = document.querySelector('.calc')
const display = document.querySelector('.display')
const buttons = document.querySelectorAll('button')
const date = document.querySelector('.date')

const reset = () => (display.value = '')

const press = x => (display.value += x)

const calc = () => (display.value = eval(display.value))

buttonReset.addEventListener('click', () => reset())

buttonCalc.addEventListener('click', () => calc())

display.addEventListener('keydown', event => event.preventDefault())

buttons.forEach(button => {
  if (button.innerHTML === 'C' || button.innerHTML === '=') {
    return
  }
  button.addEventListener('click', () => press(button.innerHTML))
})

setInterval(
  () =>
    (date.innerHTML = new Date().toLocaleString('ru', {
      hour: 'numeric',
      minute: 'numeric'
    })),
  1000
)
