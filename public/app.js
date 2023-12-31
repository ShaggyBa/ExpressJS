const toCurrency = (price) => {
	return new Intl.NumberFormat("ru-RU", {
		currency: "rub",
		style: "currency"
	}).format(price)
}

const coursesPrice = document.querySelectorAll('.price').forEach(price => {
	price.textContent = toCurrency(price.textContent)
})

const $card = document.querySelector('#card')

if ($card) {
	$card.addEventListener('click', (event) => {
		if (event.target.classList.contains('js-remove')) {
			const id = event.target.dataset.id

			fetch('/card/remove/' + id, {
				method: 'delete'
			}).then(res => res.json())
				.then(card => {
					if (card.courses.length) {
						const html = card.courses.map(c => {
							console.log(c.count)
							return `
							<tr>
								<td>${c.title}</td>
								<td>${c.count}</td>
								<td><button class="btn btn-small js-remove" data-id="${c.id}">Delete</button></td>
							</tr>
							`
						}).join('')
						$card.querySelector('tbody').innerHTML = html
						$card.querySelector('.price').textContent = toCurrency(card.price)
					}
					else {
						$card.innerHTML = `<p>Card is empty.</p>`
					}
				})
		}

	})
}