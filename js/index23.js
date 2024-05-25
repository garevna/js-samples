const messages = [
  [
    'Получение визы',
    'Ваша виза готова',
    'В получении визы отказано'
  ],
  [
    'Покупка билетов',
    'Билеты забронированы. Вы можете получить их в кассе аэропорта',
    'Билетов в этом направлении нет'
  ],
  [
    'Бронирование номера в отеле',
    'Номер в отеле забронирован',
    'В отеле нет свободных номеров'
  ]
]

const genBoolean = () => Math.random() > 0.5

const writeHTML = html => document.body.insertAdjacentHTML('beforeEnd', html)

const showOperation = message => writeHTML(`<h3>${message}</h3>`)

const showAnswer = message => writeHTML(`<p style="color:#090">${message}</p>`)

const showError = message => writeHTML(`<p style="color:#f50">${message}</p>`)

const getPromise = (operation, result, fail) => new Promise((resolve, reject) => {
  showOperation(operation)
  setTimeout(() => genBoolean() ? resolve(result) : reject(fail), Math.round(Math.random() * 3000))
})

messages.iterator = (async function * () {
  const step = async item => await getPromise(...item)
    .catch(err => showError(err))
  for (const item of this) {
    const res = await step(item)
    if (res) {
      showAnswer(res)
      yield res
    } else break
  }
}).call(messages)

async function voyage () {
  let result = await messages.iterator.next()
  result = result ? await messages.iterator.next() : null
  result && await messages.iterator.next()
}

voyage()
