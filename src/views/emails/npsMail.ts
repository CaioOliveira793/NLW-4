export default `
<style>
	.container {
		width: 800px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		align-content: center;
	}

	.value {
		padding: 10px;
		background: #ab28df;
		color: #fff;
		border-radius: 6px;
		width: 15px;
		text-align: center;
		text-decoration: none;
	}

	.level {
		display: flex;
		justify-content: space-between;
		margin: 10px;
		width: 350px;
	}

	.answer {
		display: flex;
		justify-content: space-between;
		width: 350px;
	}
</style>

<div>
	<label for="">Olá <strong>{{name}}</strong>! Tudo bem?</label>

	<h3>{{title}}</h3>
	<br/>
	<strong>{{description}}</strong>

	<div class="level">
		<span>Pouco provável</span>
		<span>Muito provável</span>
	</div>

	<div class="answers">
		<a href="{{link}}/{{survey_user_id}}?v=1&tk={{token}}" class="value">1</a>
		<a href="{{link}}/{{survey_user_id}}?v=2&tk={{token}}" class="value">2</a>
		<a href="{{link}}/{{survey_user_id}}?v=3&tk={{token}}" class="value">3</a>
		<a href="{{link}}/{{survey_user_id}}?v=4&tk={{token}}" class="value">4</a>
		<a href="{{link}}/{{survey_user_id}}?v=5&tk={{token}}" class="value">5</a>
		<a href="{{link}}/{{survey_user_id}}?v=6&tk={{token}}" class="value">6</a>
		<a href="{{link}}/{{survey_user_id}}?v=7&tk={{token}}" class="value">7</a>
		<a href="{{link}}/{{survey_user_id}}?v=8&tk={{token}}" class="value">8</a>
		<a href="{{link}}/{{survey_user_id}}?v=9&tk={{token}}" class="value">9</a>
		<a href="{{link}}/{{survey_user_id}}?v=10&tk={{token}}" class="value">10</a>
	</div>

	<br/>
	<br/>

	<strong>Sua opnião é muito importante para nós</strong>
	<h3>Equipe | <strong>NLW</strong></h3>
</div>
`